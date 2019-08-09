import { StyleSheet } from 'react-native';
import { Color, Font, Metrics } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Metrics.marginHorizontal
  },
  headerText: {
    color: Color.white,
    fontSize: Font.size.h4,
    fontWeight: 'bold',
    marginTop: Metrics.height / 30
  },
  iconMicrophone: {
    height: Metrics.height / 2.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: Metrics.height / 25
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  subBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallBtnContainer: {
    height: Metrics.buttonHeight,
    borderRadius: Metrics.buttonHeight / 2,
    width: Metrics.width / 2 - Metrics.marginHorizontal * 1.5,
    backgroundColor: Color.white,
  },
  btnContainer: {
    height: Metrics.buttonHeight,
    borderRadius: Metrics.buttonHeight / 2,
    backgroundColor: Color.white,
    marginTop: 15
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
  }
})
