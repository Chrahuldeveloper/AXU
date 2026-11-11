
import { Text, View, Pressable } from 'react-native';
import * as Battery from 'expo-battery';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';
import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const BACKGROUND_TASK_NAME = 'SAVE_BATTERY_INFO';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    const widgetId = AsyncStorage.getItem("widget-id")

    if (!widgetId) {
      console.log('No widget ID found');
      return BackgroundTask.BackgroundTaskResult.Failed;

    }

    const batteryLevel = await Battery.getBatteryLevelAsync();

    if (batteryLevel < 0) {
      return BackgroundTask.BackgroundTaskResult.Failed;
    }

    const batteryPercentage = Math.round(batteryLevel * 100);

    const { data: existingRow, error: selectError } = await supabase
      .from('info')
      .select('id')
      .eq('widget-id', widgetId)
      .maybeSingle();

    if (existingRow) {
      const { error } = await supabase
        .from('info')
        .update({
          battery: batteryPercentage,
        })
        .eq('id', existingRow.id);

      if (error) throw error;

    } else {
      const { error } = await supabase
        .from('info')
        .insert({
          'widget-id': widgetId,
          battery: batteryPercentage,
        });

      if (error) throw error;
    }

    console.log('Battery saved:', batteryPercentage);

    return BackgroundTask.BackgroundTaskResult.Success;

  } catch (error) {
    console.error('Failed to execute the background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

async function registerBackgroundTaskAsync() {
  console.log('Background task registered!');
  return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_NAME, {
    minimumInterval: 15
  });

}

export const Home = () => {


  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const [permission, requestPermission] = useCameraPermissions();
  const scannedRef = useRef(false);

  const battery = Battery.usePowerState();

  const isLowBattery =
    battery.batteryLevel != null &&
    battery.batteryLevel * 100 < 20;

  const neonColor = isLowBattery ? '#ff3030' : '#28b4e9';
  const borderColor = isLowBattery ? '#ff3030' : '#159acb';

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const scanned = await AsyncStorage.getItem('scanned');

        if (scanned === 'true') {
          setIsSetupComplete(true);
        }
      } catch (error) {
        console.log('Storage error:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkSetup();
  }, []);

  useEffect(() => {
    registerBackgroundTaskAsync()
  }, [])



  const handleBarcodeScanned = async ({ data }: any) => {
    if (scannedRef.current) return;

    scannedRef.current = true;

    console.log('QR Content:', data);

    try {
      await AsyncStorage.setItem('widget-id', data);
      await AsyncStorage.setItem('scanned', 'true');

      const currentBattery = Math.round(battery.batteryLevel * 100)
      
      const { error } = await supabase
        .from('info')
        .upsert(
          {
            'widget-id': data,
            battery: currentBattery,
          },
          {
            onConflict: 'widget-id',
          }
        );

      if (error) throw error;

      setIsSetupComplete(true);
    } catch (error) {
      scannedRef.current = false;
      console.log('Failed to save scan:', error);
    }
  };

  if (isChecking) {
    return <View className="flex-1 bg-[#05070a]" />;
  }

  if (!isSetupComplete) {
    if (!permission?.granted) {
      return (
        <View className="flex-1 items-center justify-center bg-[#05070a] px-8">
          <Text className="mb-4 text-xl font-bold text-white">
            Camera Permission
          </Text>

          <Text className="mb-6 text-center text-sm text-[#8293a8]">
            Allow camera access to scan your desktop QR code.
          </Text>

          <Pressable
            onPress={requestPermission}
            className="rounded-2xl px-8 py-4"
            style={{ backgroundColor: neonColor }}
          >
            <Text className="font-bold text-[#05070a]">
              Allow Camera
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-[#05070a]">
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        />

        <View className="absolute inset-0 items-center justify-center">
          <Text className="mb-3 text-2xl font-bold text-white">
            ChargeSync
          </Text>

          <Text className="mb-10 text-sm text-[#dce5f1]">
            Scan your desktop QR code
          </Text>

          <View
            className="h-[250px] w-[250px] rounded-3xl border-[3px]"
            style={{ borderColor: neonColor }}
          />

          <Text className="mt-8 text-sm text-white">
            Position the QR code inside the frame
          </Text>
        </View>
      </View>
    );
  }

  const isCharging =
    battery.batteryState === Battery.BatteryState.CHARGING;

  return (
    <View className="flex-1 bg-[#05070a] px-6 pt-7 pb-6">

      <View className="flex-row items-center justify-between border-b border-[#1c222b] pb-5">
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-[#101e28]">
            <Text className="text-xl" style={{ color: neonColor }}>
              ▣
            </Text>
          </View>

          <Text className="text-base font-bold text-white">
            ChargeSync
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full bg-[#22c995]" />
          <Text className="text-xs text-[#8293a8]">
            Sync active
          </Text>
        </View>
      </View>

      <View className="flex-1 items-center mt-7 justify-center">

        <View className="relative items-center justify-center">

          <View
            className="absolute h-[280px] w-[280px] rounded-full"
            style={{
              backgroundColor: neonColor,
              opacity: 0.10,
              shadowColor: neonColor,
              shadowOpacity: 1,
              shadowRadius: 100,
              shadowOffset: { width: 0, height: 0 },
            }}
          />

          <View
            className="absolute h-[210px] w-[210px] rounded-full"
            style={{
              backgroundColor: neonColor,
              opacity: 0.12,
              shadowColor: neonColor,
              shadowOpacity: 1,
              shadowRadius: 65,
              shadowOffset: { width: 0, height: 0 },
            }}
          />

          <View
            className="absolute h-[150px] w-[150px] rounded-full"
            style={{
              backgroundColor: neonColor,
              opacity: 0.12,
              shadowColor: neonColor,
              shadowOpacity: 1,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 0 },
            }}
          />

          <View
            className="h-[174px] w-[112px] items-center justify-center rounded-[25px] border-2 bg-[#101820]"
            style={{
              borderColor,
              shadowColor: neonColor,
              shadowOpacity: 0.75,
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 0 },
              elevation: 15,
            }}
          >
            <View
              className="absolute -top-[2px] h-[3px] w-9 rounded-full"
              style={{ backgroundColor: neonColor }}
            />

            <View
              className="absolute bottom-[6px] left-[6px] right-[6px] h-[84%] overflow-hidden rounded-[17px]"
              style={{ backgroundColor: neonColor }}
            >
              <View className="absolute inset-0 bg-white/10" />
              <View className="absolute left-0 top-0 h-full w-2 bg-white/10" />
            </View>
          </View>
        </View>

        <View className="mt-9 items-center">
          <Text className="text-sm text-[#899bb0]">
            Phone battery
          </Text>

          <View className="mt-1 flex-row items-start">
            <Text className="text-[56px] font-semibold leading-[64px] text-[#f0f3f8]">
              {battery.batteryLevel != null
                ? Math.round(battery.batteryLevel * 100)
                : '--'}
            </Text>

            <Text
              className="mt-3 text-2xl font-medium"
              style={{ color: neonColor }}
            >
              %
            </Text>
          </View>

          <View className="mt-3 flex-row items-center gap-2 rounded-full border border-[#202832] bg-[#0b1016] px-4 py-2">
            <View
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: neonColor }}
            />

            <Text className="text-xs font-medium text-[#d5deeb]">
              {isCharging ? 'Charging' : 'Discharging'}
            </Text>
          </View>
        </View>
      </View>

      <View className="border-t border-[#1c222b] pt-6">

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#111820]">
              <Text className="text-2xl text-[#cbd5e1]">▣</Text>
            </View>

            <View>
              <Text className="text-sm font-semibold text-white">
                Linux desktop
              </Text>

              <Text className="mt-1 text-xs text-[#8192a8]">
                Connected and sharing
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-[#25bdf4]">
              ✓
            </Text>

            <Text className="text-xs text-[#8293a8]">
              Connected
            </Text>
          </View>
        </View>

        <View className="mt-6 h-12 flex-row items-center justify-center gap-3 rounded-2xl bg-[#11161e]">
          <Text className="text-lg text-[#cbd5e1]">
            ⌁
          </Text>

          <Text className="text-sm font-semibold text-[#dce5f1]">
            Disconnect desktop
          </Text>
        </View>

      </View>
    </View>
  );
};
