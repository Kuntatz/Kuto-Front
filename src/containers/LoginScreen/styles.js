import { StyleSheet } from 'react-native';
import { Color, Metrics, Font } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  headerImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Metrics.height / 3.8,
    backgroundColor: Color.white,
    justifyContent: 'center',
    zIndex: 100
  },
  imageStyle: {
    overflow: 'visible',
    resizeMode: 'stretch',
    width: '100%', 
    height: '100%'
  },
  headerText: {
    color: Color.white,
    fontSize: Font.size.h1,
    fontWeight: 'bold',
    marginLeft: 30
  },
  bottomContainer: {
    height: Metrics.buttonHeight,
    backgroundColor: Color.primary,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100
  },
  whiteText: {
    color: Color.white,
    fontSize: Font.size.regular,
    fontWeight: 'bold',
  },
  blackBoldText: {
    color: Color.dark,
    fontWeight: 'bold',
    fontSize: Font.size.h6
  },
  mainContainer: {
    marginTop: Metrics.height / 3.3,
    marginHorizontal: Metrics.marginHorizontal * 2
  },
  blackDescriptionText: {
    color: Color.dark,
    fontSize: Font.size.small,
    marginTop: Metrics.height / 40
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: Metrics.height / 25,
    alignItems: 'center',
    height: 50,
  },
  iconUser: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  input: {
    flex: 1,
    marginLeft: 20,
    fontSize: Font.size.input,
    color: Color.dark,
    height: 50,
    textAlign: 'left',
  },
  primaryText: {
    color: Color.primary,
  },
  createBtnContainer: {
    marginTop: Metrics.height / 40,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    height: 30,
    justifyContent: 'center',
  },
  space: {
    flex: 1
  },
  signInBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});