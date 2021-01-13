# react-native-base
 React Native ready to use base template with all basic npm ready to use
# After npm install, Some Required Steps are
    Go to node-modules->react-native->react.gradle & add this code. Its to solve the duplicate resource issue while we bundle android build.
    Find doFirst method and add these lines after that.
    
    doLast {
        def moveFunc = { resSuffix ->
            File originalDir = file("$buildDir/generated/res/react/release/${resSuffix}");
            if (originalDir.exists()) {
                File destDir = file("$buildDir/../src/main/res/${resSuffix}");
                ant.move(file: originalDir, tofile: destDir);
            }
        }
        moveFunc.curry("drawable-ldpi").call()
        moveFunc.curry("drawable-mdpi").call()
        moveFunc.curry("drawable-hdpi").call()
        moveFunc.curry("drawable-xhdpi").call()
        moveFunc.curry("drawable-xxhdpi").call()
        moveFunc.curry("drawable-xxxhdpi").call()
        moveFunc.curry("raw").call()
    }
