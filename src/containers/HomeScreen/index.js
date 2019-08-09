import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { styles } from './styles';
import { CommonStyles } from '../../themes';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onStart = () => {
    alert('start');
  }

  onStop = () => {
    alert('stop');
  }

  onUpload = () => {
    alert('upload');
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
