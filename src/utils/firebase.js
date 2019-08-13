import firebase from 'react-native-firebase';
import { get } from 'lodash';
import { User } from '../utils';

export const signIn = async () => {
  try {
    const ret = await firebase.auth().signInWithEmailAndPassword('rati.kirvalidze10@gmail.com', 'Asdf!234');
    if (get(ret, 'user._user', null)) {
      User.setCurrentUser(get(ret, 'user._user', null));
    }
    return ({ success: true });
  } catch (e) {
    console.info('e', e);
    return ({ success: false });
  }
}

export const getIdToken = async() => {
  try {
    const idToken = await firebase.auth().currentUser.getIdToken();
    return idToken;
  } catch (e) {
    return null;
  }
};