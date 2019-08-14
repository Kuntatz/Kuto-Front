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
import { FirebaseUtils, User, showAlert } from '../../utils';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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

  onSignIn = async () => {
    Keyboard.dismiss();
    const { email, password } = this.state;
    if (email === '') {
      return showAlert('KUTO', 'Please type the email address.');
    }
    if (password === '') {
      return showAlert('KUTO', 'Please type the password.');
    }
    const res = await FirebaseUtils.signIn(email, password);
    if (res.success) {
      this.props.navigation.navigate('MainStack');
    } else {
      showAlert('KUTO', 'Your credential does not match. please try again later.');
    }
    // console.info('User.getMe', User.getMe());
    // console.info('getIdToken', await FirebaseUtils.getIdToken());
  }

  onCreateAccount = () => {
    Keyboard.dismiss();
  }

  render() {
    const { email, password } = this.state;

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
                  placeholder="Email"
                  placeholderTextColor={Color.gray}
                  underlineColorAndroid="transparent"
                  value={email}
                  onChangeText={value => this.onChangeText('email', value)}
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
