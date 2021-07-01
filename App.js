import React, {useEffect, useContext} from 'react';
// import {NavigationContainer, TransitionConfig} from '@react-navigation/native';
// import {
//   DrawerAnimationContext,
//   DrawerAnimationProvider,
// } from './src/contexts/DrawerAnimationContext';
import {SafeAreaProvider} from 'react-native';
import Navigator from './src/navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';

// import AppDrawerNavigator from './src/navigation/AppDrawerNavigator/index';

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
