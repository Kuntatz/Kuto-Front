import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Text, Image, TouchableOpacity, View, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { styles } from './styles';
import { CommonStyles } from '../../themes';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: undefined,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      this.setState({ hasPermission: isAuthorised });

      if (!isAuthorised) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
        }
      };
    });
  }

  _finishRecording = (didSucceed, filePath, fileSize) => {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  onStart = async () => {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ recording: true, paused: false });

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  onStop = async () => {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false, paused: false });

    try {
      const filePath = await AudioRecorder.stopRecording();
      console.info(AudioUtils.DocumentDirectoryPath + '/test.aac');
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  onUpload = () => {
    this.props.navigation.navigate('ConfirmScreen');
  }

  render() {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            {`Hello\nUsername.`}
          </Text>
          <Image source={require('../../assets/icon_microphone.png')} style={styles.iconMicrophone} />
          <View style={styles.buttonsContainer}>
            <View style={styles.subBtnsContainer}>
              <View style={styles.smallBtnContainer}>
                <TouchableOpacity style={styles.smallBtnSubContainer} onPress={this.onStart}>
                  <Text style={styles.primaryText}>
                    Start
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.smallBtnContainer}>
                <TouchableOpacity style={styles.smallBtnSubContainer} onPress={this.onStop}>
                  <Text style={styles.primaryText}>
                    Stop
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.smallBtnSubContainer} onPress={this.onUpload}>
                <Text style={styles.primaryText}>
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;