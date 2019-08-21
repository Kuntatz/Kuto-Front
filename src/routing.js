import React from 'react';
import { 
  createAppContainer, 
  createSwitchNavigator, 
  createStackNavigator 
} from 'react-navigation';
import { Platform } from 'react-native';
import {
  LoginScreen,
  HomeScreen,
  ConfirmScreen,
  SignupScreen
} from './containers';

const AuthStack = createStackNavigator({
  LoginScreen: LoginScreen,
  SignupScreen: SignupScreen
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
});

const MainStack = createStackNavigator({
  HomeScreen: HomeScreen,
  ConfirmScreen: {
    screen: ConfirmScreen,
    navigationOptions: {
      gesturesEnabled: Platform.OS !== 'ios'
    }
  }
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});

const routing = createSwitchNavigator({
  AuthStack: AuthStack,
  MainStack: MainStack
}, {
  initialRouteName: 'AuthStack',
  headerMode: ''
});

export default createAppContainer(routing);
