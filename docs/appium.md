# Instalación y Configuración de Appium

## Instalación de Appium y Drivers
```sh
npm install -g appium

# Para pruebas en Android
appium driver install uiautomator2

# Para pruebas en iOS
appium driver install xcuitest

# Para pruebas en Windows
appium driver install windows
```

## Verificar Instalación de Appium
```sh
npm install -g appium-doctor
appium-doctor --android
appium-doctor --ios
```

## Iniciar el Servidor de Appium
```sh
appium

# Para chromedriver mobile
appium --allow-insecure chromedriver_autodownload
```
