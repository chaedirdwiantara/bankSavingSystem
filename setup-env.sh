#!/bin/bash

# Set JAVA_HOME (Konversi path Windows ke format Bash)
export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"

# Set ANDROID_HOME
export ANDROID_HOME="/c/Users/AndiChaedir/AppData/Local/Android/Sdk"

# Update PATH agar terminal mengenali command 'java', 'adb', dan 'emulator'
export PATH=$PATH:"$JAVA_HOME/bin":"$ANDROID_HOME/platform-tools":"$ANDROID_HOME/emulator":"$ANDROID_HOME/tools/bin"

echo "✅ Environment Variables Berhasil Di-set!"
echo "☕ Java: $JAVA_HOME"
echo "🤖 Android SDK: $ANDROID_HOME"
echo "---------------------------------------------------"
echo "Sekarang Anda bisa menjalankan 'npm run android'"
