import firebase from 'react-native-firebase';
import uuid from 'uuid/v1';
import { get } from 'lodash';
import { User } from '../utils';

const firestoreAudioRef = firebase.firestore().collection('audios');
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

export const uploadAudioFile = async (audioUri) => {
  const filename = `${uuid()}.aac`;
  return new Promise((resolve, reject) => {
    firebase
    .storage()
    .ref(`audios/${filename}`)
    .putFile(audioUri)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.info('progress', (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.info('snapshot.downloadURL', snapshot.downloadURL);
          resolve(snapshot.downloadURL);
        }
      },
      error => {
        // alert('Sorry, Try again.');
        reject(error);
      }
    );
  });
}

export const setAudioInfo = async (uid, duration, restaurants, audioURL, userName, userEmail) => {
  debugger;
  try {
    const res = await firestoreAudioRef.add({
      uid,
      userName,
      userEmail,
      duration,
      audioURL,
      restaurants
    });
    debugger;
    return res;
  } catch (e) {
    console.info('e setAudioInfo', e);
    return null;
  }
}