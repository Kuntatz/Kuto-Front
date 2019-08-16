import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SplashScreen from 'react-native-splash-screen';
import _ from 'lodash';
import { styles } from './styles';
import { CommonStyles } from '../../themes';
import { FirebaseUtils, User, showAlert } from '../../utils';

class ConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedIndex: 1,
      inputFields: [
        { restaurantName: null, promoCode: null },
        { restaurantName: null, promoCode: null },
        { restaurantName: null, promoCode: null },
        { restaurantName: null, promoCode: null },
        { restaurantName: null, promoCode: null }
      ]
    }
  }

  onChangeText = (text, index, property) => {
    const { inputFields } = this.state;
    const updatedInputFields = _.cloneDeep(inputFields);

    updatedInputFields[index][property] = text;
    this.setState({ inputFields: updatedInputFields });
  }

  validateFields = () => {
    const { addedIndex, inputFields } = this.state;
    let isValid = true;
    const fields = [];
    for(let index = 0; index < addedIndex; index += 1) {
      if (!(inputFields[index].restaurantName && inputFields[index].restaurantName !== '' &&
        inputFields[index].promoCode && inputFields[index].promoCode !== '')) {
          isValid = false;
      } else {
        fields.push(inputFields[index]);
      }
    }
    if (isValid) {
      return ({ isValid, fields });
    }
    return ({ isValid });
  }

  onConfirm = async () => {
    const { inputFields } = this.state;
    const { navigation } = this.props;
    const res = this.validateFields();
    if (res.isValid) {
      if (User.getMe()) {
        const audioURL = await FirebaseUtils.uploadAudioFile(navigation.state.params.audioPath);
        const audioInfo = await FirebaseUtils.getAudioInfo();
        if (audioInfo) {
          const result = await FirebaseUtils.updateAudioInfo(
            audioInfo.ref,
            audioInfo.data.audios,
            navigation.state.params.duration,
            res.fields,
            audioURL
          );
          console.info('result', result);
          debugger;
          if (result.success) {
            showAlert('Kuto', 'Successfully uploaded.', () => {
              this.props.navigation.goBack();
            });
          } else {
            showAlert('Kuto', 'Failure to upload. please try again later.');
          }
        } else {
          const result = await FirebaseUtils.setAudioInfo(
            navigation.state.params.duration,
            res.fields,
            audioURL
          );
          console.info('result', result);
          debugger;
          if (result.success) {
            showAlert('Kuto', 'Successfully uploaded.', () => {
              this.props.navigation.goBack();
            });
          } else {
            showAlert('Kuto', 'Failure to upload. please try again later.');
          }
        }
      }
    } else {
      showAlert('Kuto', 'Please fill the empty fields.');
    }
  }

  onAddField = () => {
    this.setState({ addedIndex: this.state.addedIndex + 1 });
  }

  renderField = (index) => {
    return (
      <View
        style={styles.questionsContainer}
        key={`key-${index}`}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.whiteBoldText}>
            Restaurant Name
          </Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            onChangeText={text => this.onChangeText(text, index, 'restaurantName')}
          />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.whiteBoldText}>
            Promos Distributed
          </Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
            onChangeText={text => this.onChangeText(text, index, 'promoCode')}
          />
        </View>
      </View>
    );
  };

  render() {
    const { addedIndex } = this.state;
    return (
      <SafeAreaView style={CommonStyles.container}>
        <KeyboardAwareScrollView style={styles.container}>
          <Text style={styles.headerText}>
            {`Good Work\n${User.getMe().displayName || ''}.`}
          </Text>
          {_.map(_.range(0, addedIndex), (value, index) => {
            return this.renderField(index);
          })}
          {addedIndex < 5 && <TouchableOpacity style={styles.addBtnContainer} onPress={this.onAddField}>
            <Text style={styles.whiteBtnText}>
              Add Field
            </Text>
          </TouchableOpacity>}
        </KeyboardAwareScrollView>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.smallBtnSubContainer} onPress={this.onConfirm}>
            <Text style={styles.primaryText}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default ConfirmScreen;
