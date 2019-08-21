import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from './styles';
import { CommonStyles, Color } from '../../themes';

const injectedJavaScript = `
window.ReactNativeWebView.postMessage('pageLoaded');
true;
`;

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  webViewMessageHandler = (event) => {
    if (event.nativeEvent.data === 'pageLoaded') {
      this.setState({
        loaded: true
      });
    }
  }

  onClose = () => {
    this.props.navigation.goBack();
  }

  renderActivity = () => {
    const { loaded } = this.state;
    if (!loaded) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color={Color.white} />
        </View>
      );
    }
    return <View />;
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.closeIconContainer} onPress={this.onClose}>
            <Image source={require('../../assets/icon_close.png')} style={styles.iconClose}/>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.blackText}>
              Kuto.co
            </Text>
          </View>
        </View>
        <View style={styles.webContainer}>
          <WebView
            source={{uri: 'https://kuto.co/drivers/#join'}}
            style={this.state.loaded || { flex: 0, height: 0, opacity: 0 }}
            injectedJavaScript={injectedJavaScript}
            onMessage={this.webViewMessageHandler}
          />
        </View>
        {this.renderActivity()}
      </SafeAreaView>
    );
  }
}

export default SignupScreen;
