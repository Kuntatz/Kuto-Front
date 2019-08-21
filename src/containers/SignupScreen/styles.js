import { StyleSheet } from 'react-native';
import { Color, Font } from '../../themes';

export const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: Color.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  closeIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  iconClose: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  webContainer: {
    flex: 1,
    backgroundColor: Color.purple
  },
  textContainer: {
    flex: 1,
    backgroundColor: Color.lightGrey,
    marginHorizontal: 20,
    height: 30,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center'
  },
  blackText: {
    color: 'black',
    fontSize: Font.size.regular,
    textAlign: 'center',
    fontWeight: '500'
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
