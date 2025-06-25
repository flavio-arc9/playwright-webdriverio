# Consideraciones y Herramientas Adicionales

## Obtener `appPackage` y `appActivity`
```sh
# Android
adb shell dumpsys window | grep -E 'mCurrentFocus'

# iOS
xcrun instruments -s

# Windows
Get-StartApps
```

##  Obtener UDID de Dispositivos
```sh
# iOS
xcrun xctrace list devices

# Android
adb devices
```

## Instalar APP
Add if it is necessary to install the app and indicate the device for testing
```ts
// ***************Local Runner****************
{
  'appium:udid': '<device-id>',
  'appium:app': join(process.cwd(), 'app-release.apk | ipa | .zip')
}
```