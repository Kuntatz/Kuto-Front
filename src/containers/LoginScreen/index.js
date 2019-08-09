import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { 
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { styles } from './styles';
import { CommonStyles, Color } from '../../themes';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }

  componentDidMount() {
    this.timeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 1000 * 1.5);
  }

  onChangeText = (stateName, value) => {
    this.setState({ [stateName]: value });
  };

  onSignIn = () => {
    Keyboard.dismiss();
  }

  onCreateAccount = () => {
    Keyboard.dismiss();
  }

  render() {
    const { userName, password } = this.state;

    return (
      <SafeAreaView style={CommonStyles.container}>
        <KeyboardAwareScrollView style={CommonStyles.container} contentContainerStyle={CommonStyles.container}>
          <ImageBackground
            source={require('../../assets/img_header.png')}
            style={styles.headerImg}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.headerText}>KUTO</Text>
          </ImageBackground>
          <View style={styles.container}>
            <View style={styles.mainContainer}>
              <Text style={styles.blackBoldText}>
                Login
              </Text>
              <Text style={styles.blackDescriptionText}>
                Hello driver! Remember to press record at the start of your shift. Happy driving!
              </Text>
              <View style={styles.inputContainer}>
                <Image source={require('../../assets/icon_user.png')} style={styles.iconUser} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={Color.gray}
                  underlineColorAndroid="transparent"
                  value={userName}
                  onChangeText={value => this.onChangeText('userName', value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Image source={require('../../assets/icon_password.png')} style={styles.iconUser} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={Color.gray}
                  underlineColorAndroid="transparent"
                  secureTextEntry
                  value={password}
                  onChangeText={value => this.onChangeText('password', value)}
                />
              </View>
              <TouchableOpacity style={styles.createBtnContainer} onPress={this.onCreateAccount}>
                <Text style={styles.primaryText}>
                  Need an account?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.space} />
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={this.onSignIn} style={styles.signInBtnContainer}>
                <Text style={styles.whiteText}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
