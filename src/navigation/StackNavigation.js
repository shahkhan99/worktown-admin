import React, {useEffect, useContext} from 'react';
// import {NavigationContainer, TransitionConfig} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//screen
// import {createStackNavigator} from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation';
import ImageLoader from '../screens/splash/splash';
import Login from '../screens/login/login';
import Dashboard from '../screens/Dashboard/Dashboard';
import Meeting from '../screens/MeetingRoom/Meeting';
import Complain from '../screens/Complain portal/Complain';
import Chat from '../screens/Chat/Chat';
import Profile from '../screens/Profile/Profile';
import ApproveAndReject from '../screens/ApprovendReject/ApproveAndReject';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Intro'}>
      <Stack.Screen
        name="Intro"
        component={ImageLoader}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Meeting"
        component={Meeting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Complain"
        component={Complain}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ApproveAndReject"
        component={ApproveAndReject}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default RootNavigator;
