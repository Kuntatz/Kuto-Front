import firebase from 'react-native-firebase';
import uuid from 'uuid/v1';
import { get } from 'lodash';
import { User } from '../utils';

const firestoreAudioRef = firebase.firestore().collection('audios');

export const getCurrentUser = () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    User.setCurrentUser(get(currentUser, '_user', null));
    return currentUser.toJSON();
  }
  return null;
}
export const signIn = async (email, password) => {
  try {
    const ret = await firebase.auth().signInWithEmailAndPassword(email, password);
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
  const name = User.getMe().displayName;
  const time = new Date();
  const filename = `${name}-${time.getTime()}.aac`;
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

export const getAudioInfo = async () => {
  try {
    const querySnapshot = await firestoreAudioRef.where('uid', '==', User.getMe().uid).get();
    console.info('querySnapshot', querySnapshot);
    if (querySnapshot.docs.length === 1) {
      return {
        data: querySnapshot.docs[0].data(), 
        ref: querySnapshot.docs[0].ref
      };
    } else {
      return null;
    }
  } catch (e) {
    console.info('e', e);
    return null;
  }
}

export const updateAudioInfo = async (audioRef, currentAudios, duration, restaurants, audioURL) => {
  const currentTime = new Date();
  const audio = {
    duration,
    audioURL,
    duration,
    restaurants,
    time: currentTime
  }
  const audios = [...currentAudios, audio];
  try {
    await audioRef.update({ audios, updatedTime: currentTime });
    return ({ success: true });
  } catch (e) {
    console.info('e updateAudioInfo', e);
    return ({ success: false });
  }
}

export const setAudioInfo = async (duration, restaurants, audioURL) => {
  const uid = User.getMe().uid;
  const userName = User.getMe().displayName;
  const userEmail = User.getMe().email;
  const currentTime = new Date();

  const audios = [{
    audioURL,
    duration,
    restaurants,
    time: currentTime
  }];

  try {
    const res = await firestoreAudioRef.doc(`${userName}-${currentTime.getTime()}`).set({
      uid,
      userName,
      userEmail,
      audios,
      updatedTime: currentTime
    });
    debugger;
    return { success: true };
  } catch (e) {
    console.info('e setAudioInfo', e);
    return { success: false };
  }
}