# Requerimientos para Windows App

Antes de instalar Appium y ejecutar el proyecto, asegúrate de cumplir con los siguientes requisitos:

## **Requisitos del Sistema**
- **Sistema Operativo:** Windows 10
- **Java:** JDK 11 instalado y configurado en el `PATH`
- **Maven:** Instalado y configurado en el `PATH`

## **Instalación de Dependencias**

### 1. **Instalar Windows Application Driver**
Debes instalar la última versión de **Windows Application Driver** desde el siguiente enlace:
[Descargar WinAppDriver v1.2.1](https://github.com/microsoft/WinAppDriver/releases/tag/v1.2.1)

### 2. **Habilitar el Modo Desarrollador**
Para ejecutar Windows Application Driver, es necesario habilitar el **modo desarrollador** en Windows. 
Puedes seguir este tutorial detallado para hacerlo:
[Guía para habilitar el modo desarrollador](https://www.automatetheplanet.com/automate-windows-desktop-apps-winappdriver/#tab-con-2)

### 3. **Instalar Windows SDK**
También es necesario instalar el **Windows SDK**, el cual puedes descargar desde el siguiente enlace:
[Descargar Windows SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/)

## **Ejecutar Windows Application Driver**
Antes de correr el proyecto, asegúrate de iniciar **Windows Application Driver** ejecutando el siguiente comando en la terminal:
```sh
WinAppDriver
```