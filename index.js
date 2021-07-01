/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import login from './src/screens/login/login';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';

AppRegistry.registerComponent(appName, () => App);
