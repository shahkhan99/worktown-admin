import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loader extends React.Component {
  render() {
    return (
        <LottieView
        
          source={require('./json/loader.json')}
          // colorFilters={[
          //   {
          //     keypath: 'button',
          //     color: '#F00000',
          //   },
          //   {
          //     keypath: 'Sending Loader',
          //     color: '#F00000',
          //   },
          // ]}
          autoPlay
          speed={1}
          loop
        />
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
