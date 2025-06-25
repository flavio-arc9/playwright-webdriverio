# Requerimientos para Android

Antes de instalar Appium, asegúrate de tener los siguientes programas instalados:

## **Requisitos del Sistema**

- **Node.js**: Appium se ejecuta sobre Node.js. Descárgalo desde [aquí](https://nodejs.org/).
- **Java Development Kit (JDK)**: Necesario para la automatización en Android. Descárgalo desde [aquí](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
- **Android SDK**: Requerido para la automatización de dispositivos Android. Descarga e instala Android Studio desde [aquí](https://developer.android.com/studio) y asegúrate de configurar el SDK.

---

## **Instalación de Android Studio y SDK**

### **1. Descargar Android Studio**

- Visita el sitio oficial: [Descargar Android Studio](https://developer.android.com/studio)
- Selecciona la versión adecuada para tu sistema operativo.
- Acepta los términos y condiciones y descarga el instalador.

### **2. Instalar Android Studio**

#### **Windows:**
- Ejecuta el archivo `.exe` descargado.
- Sigue el asistente de instalación.
- Selecciona la instalación estándar para incluir Android SDK, Android Virtual Device (AVD) y herramientas adicionales.

#### **macOS:**
- Abre el archivo `.dmg` descargado.
- Arrastra Android Studio a la carpeta de **Aplicaciones**.

#### **Linux:**
- Extrae el archivo `.zip` descargado.
- Abre una terminal, navega hasta la carpeta extraída y ejecuta:
  ```sh
  ./studio.sh
  ```

### **3. Instalar Herramientas del SDK**

- Abre Android Studio y dirígete a **File > Settings (Preferences en macOS) > Appearance & Behavior > System Settings > Android SDK**.
- En la pestaña **SDK Tools**, asegúrate de marcar las siguientes opciones:
  - Android SDK Build-Tools
  - Android SDK Platform-Tools
  - Android SDK Tools
  - Android Emulator (si planeas usar el emulador)
  - Intel x86 Emulator Accelerator (HAXM) (para mejor rendimiento en procesadores Intel)
- Haz clic en **Apply** para instalar las herramientas seleccionadas.

---

## **Configuración de Variables de Entorno**

Para ejecutar herramientas del SDK desde la línea de comandos, debes agregarlas a las variables de entorno.

### **1. Localizar la Ruta del SDK**

- En Android Studio, ve a **File > Settings (Preferences en macOS) > Appearance & Behavior > System Settings > Android SDK**.
- Anota la ruta del Android SDK (ejemplo: `/Users/tuusuario/Library/Android/sdk`).

### **2. Configurar Variables de Entorno**

#### **Windows:**
1. Haz clic derecho en `Este PC` o `Equipo` y selecciona `Propiedades`.
2. Ve a `Configuración avanzada del sistema` y haz clic en `Variables de entorno`.
3. En `Variables del sistema`, haz clic en `Nueva` y añade:
   - **Nombre de la variable**: `ANDROID_HOME`
   - **Valor de la variable**: Ruta del Android SDK
4. Agrega las siguientes rutas a la variable `Path`:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`

#### **macOS/Linux:**
1. Abre una terminal y edita el archivo `~/.bash_profile`, `~/.zshrc` o `~/.bashrc`:
   ```sh
   export ANDROID_HOME=~/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```
2. Guarda y aplica los cambios ejecutando:
   ```sh
   source ~/.bash_profile
   ```

---