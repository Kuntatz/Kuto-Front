import React from 'react';
import { 
  createAppContainer, 
  createSwitchNavigator, 
  createStackNavigator 
} from 'react-navigation';
import {
  LoginScreen,
  HomeScreen,
  ConfirmScreen
} from './containers';

const AuthStack = createStackNavigator({
  LoginScreen: LoginScreen
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
});

const MainStack = createStackNavigator({
  HomeScreen: HomeScreen,
  ConfirmScreen: ConfirmScreen
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
