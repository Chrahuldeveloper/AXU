
document.addEventListener("DOMContentLoaded", async () => {

  const qrContainer = document.getElementById("qrcode");

  const pairScreen = document.getElementById("pairScreen");
  const dashboard = document.getElementById("dashboard");
  const nextButton = document.getElementById("nextButton");

  const percentageText = document.querySelector(".percentage h1");
  const batteryFill = document.querySelector(".battery-fill");
  const chargingStatus = document.querySelector(".charging-status");

  window.desktop.onBatteryUpdate((battery) => {

    console.log("Phone battery:", battery);

    percentageText.textContent = battery;

    batteryFill.style.height = `${battery}%`;

    if (battery <= 20) {

      batteryFill.style.background =
        "linear-gradient(180deg, #ff8585, #ff3030 60%, #c90000)";

      batteryFill.style.boxShadow =
        "0 0 20px rgba(255, 40, 40, 0.5)";

    } else {

      batteryFill.style.background =
        "linear-gradient(180deg, #9beaff, #45c5f5 48%, #168bd4)";

      batteryFill.style.boxShadow =
        "0 0 20px rgba(52,190,255,0.38)";
    }

  });


  try {

    const uniqueId = await window.desktop.createWidget();

    console.log("Widget ID:", uniqueId);

    new QRCode(qrContainer, {
      text: uniqueId,
      width: 160,
      height: 160,
      colorDark: "#071421",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

  } catch (error) {

    console.error("Widget creation failed:", error);

    qrContainer.textContent = "Unable to generate QR";

  }


  nextButton.addEventListener("click", () => {

    pairScreen.classList.add("hidden");

    setTimeout(() => {

      pairScreen.style.display = "none";
      dashboard.classList.remove("hidden");

    }, 250);

  });

});
