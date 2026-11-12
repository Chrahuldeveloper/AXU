# AXU

### Your phone and desktop, connected.

AXU (Android × Ubuntu) is a cross-device synchronization application that connects your Android smartphone with your Ubuntu Linux desktop.

The goal is simple: bring your phone and computer closer together by allowing them to communicate, share information, and stay synchronized through a single ecosystem.

From monitoring your phone's battery on your desktop to receiving notifications and call alerts, AXU aims to make the interaction between your devices seamless.

<p align="center">
  <img src="app/assets/icon.png" alt="AXU Logo" width="160" />
</p>

<p align="center">
  <strong>Android × Ubuntu</strong>
  <br/>
</p>

---

## Screenshots

<p align="center">
  <img src="app/assets/screenshots/pic1.png" width="100%" alt="Ubuntu Desktop Widget" />
</p>

<p align="center">
  <em>Ubuntu Desktop Widget · Android Application</em>
</p>

---

## Features

### Currently implemented

- **Device Pairing:** Connect your Android device with your Ubuntu desktop using QR code scanning.
- **Battery Monitoring:** View your Android phone's battery percentage directly on your Ubuntu desktop.
- **Desktop Widget:** A minimal, dark-themed Ubuntu desktop widget for displaying device information.

---

## Architecture

AXU consists of two primary applications:

```text
             AXU Ecosystem
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

Responsible for device setup, QR scanning, and collecting device information.

### Ubuntu Desktop Application

Built using:
- Electron

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
git clone https://github.com/Chrahuldeveloper/AXU.git

cd AXU
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

*Adjust the directory names and commands according to your actual project structure.*

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