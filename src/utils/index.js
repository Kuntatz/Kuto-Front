import * as firebase from './firebase';
import { Alert } from 'react-native';

let currentUser = null;

class User {
  static getMe = () => {
    return currentUser;
  }

  static setCurrentUser = (user) => {
    currentUser = { ...user };
  }
}

const showAlert = (title = 'KUTO', message, onPress = () => null) => {
  Alert.alert(
    title, 
    message,
    [
      { text: 'Ok', onPress }
    ]
  );
};

export {
  firebase,
  User,
  showAlert
}
