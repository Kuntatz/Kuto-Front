import { StyleSheet } from 'react-native';
import { Color, Font, Metrics } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.marginHorizontal
  },
  headerText: {
    color: Color.white,
    fontSize: Font.size.h4,
    fontWeight: 'bold',
    marginTop: Metrics.height / 30
  },
  btnContainer: {
    height: Metrics.buttonHeight,
    borderRadius: Metrics.buttonHeight / 2,
    backgroundColor: Color.white,
    marginTop: 15,
    margin: Metrics.marginHorizontal
  },
  smallBtnSubContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.buttonHeight / 2,
  },
  primaryText: {
    color: Color.primary,
    fontSize: Font.size.button,
    fontWeight: 'bold'
  },
  questionsContainer: {
    marginTop: Metrics.height / 25
  },
  whiteBoldText: {
    color: Color.white,
    fontSize: Font.size.large,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    backgroundColor: Color.white,
    fontSize: Font.size.input,
    color: Color.dark,
    paddingHorizontal: Metrics.marginHorizontal,
    borderRadius: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },
  questionContainer: {
    marginTop: Metrics.marginHorizontal / 2
  },
  whiteBtnText: {
    fontSize: Font.size.button,
    color: Color.white,
    fontWeight: 'bold'
  },
  addBtnContainer: {
    alignSelf: 'center',
    marginVertical: Metrics.height / 30
  },
  activityContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
