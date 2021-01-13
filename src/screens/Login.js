import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {showAlert, validateEmail, STORAGE, withRedux} from '../utils';
import {useTheme, useToggleTheme} from '../theme/themeContext';

const logoImage = require('../resources/images/logo.png');

const LoginScreen = (props) => {

  //-- This is how you use styling in FC
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const styles = createStyle(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    STORAGE.getUserData().then((userDetails) => {
      props.saveUserDetails(userDetails);
    });
  }, []);

  const submitAction = () => {
    if (email.length === 0) {
      showAlert('Please enter email.');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Please enter valid email.');
      return;
    }

    if (password.length === 0) {
      showAlert('Please enter password.');
      return;
    }

    let params = {email, password};

    props.login(params).then((userDetails) => {
      if (userDetails) {
        STORAGE.storeUserData(userDetails);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logoImg} source={logoImage} resizeMode="contain" />

        <Text style={styles.signinText}>Sign In</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            autoCapitalize={'none'}
            onChangeText={(email) => setEmail(email)}
            defaultValue={email}
            placeholderTextColor={theme.colors.placeholder}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            autoCapitalize={'none'}
            onChangeText={(password) => setPassword(password)}
            defaultValue={password}
            secureTextEntry={true}
            placeholderTextColor={theme.colors.placeholder}
          />

          <View style={styles.buttonOuter}>
            <TouchableOpacity
              onPress={submitAction}
              style={styles.loginButonContainer}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{margin: 16}}>
        <View style={styles.buttonOuter}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.loginButonContainer}>
            <Text style={styles.buttonText}>Toggle Theme</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const createStyle = (theme) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 36,
      backgroundColor: theme.colors.background,
    },
    logoImg: {
      width: '100%',
      height: 200,
    },
    signinText: {
      height: 50,
      fontSize: 25,
      color: theme.colors.text,
    },
    inputContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    textInput: {
      width: '80%',
      height: 50,
      fontSize: 18,
      borderRadius: 25,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      margin: 10,
      padding: 15,
      color: theme.colors.text,
    },
    loginButonContainer: {
      width: '50%',
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.primary,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    loginButon: {
      width: '100%',
      padding: 30,
      fontSize: 20,
      shadowColor: theme.colors.backdrop,
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset: {width: 1, height: 13},
    },
    item: {
      width: '100%',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      width: '100%',
      fontSize: 22,
    },
    buttonText: {
      color: theme.colors.onPrimary,
      fontSize: 18,
    },
    buttonOuter: {alignSelf: 'stretch'},
  });
};

export default withRedux(LoginScreen);
