# ChargeSync

### Your phone and desktop, finally connected.

ChargeSync is a cross-device synchronization application that connects your Android smartphone with your Ubuntu Linux desktop.

The goal is simple: bring your phone and computer closer together by allowing them to communicate, share information, and stay synchronized through a single ecosystem.

From monitoring your phone's battery on your desktop to receiving notifications and call alerts, ChargeSync aims to make the interaction between your devices seamless.

<p align="center">
  <img src="assets/logo.png" alt="ChargeSync Logo" width="160" />
</p>

<p align="center">
  <strong>Android × Ubuntu</strong>
  <br/>
  <em>One ecosystem. Connected devices.</em>
</p>

---

## Screenshots

<p align="center">
  <img src="screenshots/desktop-widget.png" width="48%" alt="Ubuntu Desktop Widget" />
  <img src="screenshots/android-home.png" width="48%" alt="Android Application" />
</p>

<p align="center">
  <em>Ubuntu Desktop Widget · Android Application</em>
</p>

> Replace these image paths with your actual screenshots.

---

## Features

### Currently implemented

- **Device Pairing:** Connect your Android device with your Ubuntu desktop using QR code scanning.
- **Battery Monitoring:** View your Android phone's battery percentage directly on your Ubuntu desktop.
- **Device Synchronization:** Establish a connection between your Android application and desktop widget.
- **Desktop Widget:** A minimal, dark-themed Ubuntu desktop widget for displaying device information.

### Coming Soon

- **Call Notifications:** Get notified about incoming calls on your desktop.
- **Notification Sync:** Receive Android notifications directly on Ubuntu.
- **Clipboard Sharing:** Copy text on one device and paste it on another.
- **File Sharing:** Transfer files seamlessly between your phone and computer.
- **Device Status:** Access useful information about your connected devices.
- **More Integrations:** Expand the ecosystem with additional cross-device capabilities.

---

## Architecture

ChargeSync consists of two primary applications:

```text
             ChargeSync Ecosystem
                     |
          +----------+----------+
          |                     |
      Android App          Ubuntu Desktop
          |                     |
     React Native           Electron
          |                     |
     Expo APIs            Desktop Widget
          |                     |
          +----------+----------+
                     |
               Synchronization
```

### Android Application

Built using:
- React Native
- Expo
- Expo Camera
- Expo Battery
- AsyncStorage

Responsible for device setup, QR scanning, and collecting device information.

### Ubuntu Desktop Application

Built using:
- Electron
- HTML
- CSS
- JavaScript
- Electron IPC

Responsible for displaying synchronized device information through a lightweight desktop widget.

---

## Getting Started

### Prerequisites

- Android smartphone
- Ubuntu Linux desktop
- Node.js and npm
- Git

### Clone the repository

```bash
git clone https://github.com/Chrahuldeveloper/ChargeSync.git

cd ChargeSync
```

### Android Application

```bash
cd android-app

npm install

npx expo start
```

### Ubuntu Desktop Application

```bash
cd ubuntu-widget

npm install

npm start
```

> Adjust the directory names and commands according to your actual project structure.

---

## Project Structure

```text
ChargeSync/
│
├── android-app/
│   ├── app/
│   ├── components/
│   ├── assets/
│   └── package.json
│
├── ubuntu-widget/
│   ├── main.js
│   ├── preload.js
│   ├── index.html
│   ├── styles.css
│   └── package.json
│
├── assets/
│   └── logo.png
│
├── screenshots/
│   ├── android-home.png
│   └── desktop-widget.png
│
└── README.md
```

---

## Vision

ChargeSync is being developed with a bigger vision than battery monitoring.

We want to make Android and Linux work together as naturally as devices within a single ecosystem.

Your phone shouldn't feel disconnected from your computer.

**One connection. Multiple possibilities.**

---

## Contributing

Contributions, ideas, and suggestions are welcome!

If you have ideas for improving cross-device communication between Android and Linux, feel free to open an issue or submit a pull request.

---

## Developer

Created by [Rahul](https://github.com/Chrahuldeveloper).

---

<p align="center">
  Made with ❤️ for Android and Linux.
</p>