
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import { withRedux } from '../utils/hoc';
import { Utils, Storage,  } from '../utils';

//-- import images are const. we don't need to refetch those under every render. 
const logoImage = require('../resources/images/logo.png');

const LoginScreen = (props) => {
  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  //-- Load Saved Credentials from local storage if saved
  useEffect(()=>{
    Storage.getUserData().then(userDetails=>{
      props.saveUserDetails(userDetails);  
    });
  },[]);

  const submitAction = () => {

    if(email.length === 0) {
      Utils.showAlert('Please enter email.');
      return
    }

    if(!Utils.validateEmail(email)) {
      Utils.showAlert('Please enter valid email.');
      return
    }

    if(password.length === 0) {
      Utils.showAlert('Please enter password.');
      return
    }

    let params = { email, password };

    props.login(params).then(userDetails=>{
      if(userDetails) {
        Storage.storeUserData(userDetails);
      }
    });
    
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Image
            style={styles.logoImg}
            source={logoImage}
          />

        <Text style={styles.signinText}>Sign In</Text>

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.textInput}
            placeholder="Email"
            autoCapitalize={"none"}
            onChangeText={email => setEmail(email)}
            defaultValue={email}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            autoCapitalize={"none"}
            onChangeText={password => setPassword(password)}
            defaultValue={password}
            secureTextEntry={true}
          />

        <View style={{alignSelf:'stretch'}}>
          <TouchableOpacity onPress={submitAction} style={styles.loginButonContainer}>
            <Text style={{color:'white', fontSize:18}}>Sign In</Text>
          </TouchableOpacity>
        </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex:1,
    alignItems:"center",
    marginTop: 0,
    backgroundColor: "white"
  },
  logoImg: {
    width: '100%',
    height: 200,
  },
  signinText: {
    height: 50,
    fontSize:25,
  },
  inputContainer: {
    flex:1,
    width: '100%',
    alignItems:"center",
    backgroundColor: "white",
  },
  textInput: {
    width: '80%',
    height:50,
    fontSize:18,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.themeColor,
    margin: 10,
    padding: 15,
  },
  loginButonContainer: {
    width: '50%',
    height:50,
    borderRadius: 25,
    backgroundColor: colors.themeColor,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  loginButon: {
    width: '100%',
    padding:30,
    fontSize:20,
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
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
});

const Screen = withRedux(LoginScreen);

export default Screen;