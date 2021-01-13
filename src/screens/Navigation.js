
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import LoginScreen from './Login';

import { withRedux } from '../utils/hoc';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

//-- Add all your auth screens under this stack.
function AuthNavigation() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

//-- Add all your after login screens under this stack.
function MainNavigation() {
    return (
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  }

const NavigationSwitcher = (props) => {

    //-- make this bool dynamic to switch the navigation after login. 
    //-- we can connect this to redux store. so it will automatically switch after login
    const isLoggedIn = (props.user.userDetails !== null);

    if(isLoggedIn){
        return <MainNavigation/>
    }

    return <AuthNavigation/>
}

const AppNavigation = withRedux(NavigationSwitcher);

export default AppNavigation;