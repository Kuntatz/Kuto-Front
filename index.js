/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Module AudioRecorderManager requires main queue',
  'Remote debugger is in a background tab which may'
]);
