import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Modal from 'react-native-modal';

export default class Loader extends React.Component {
  render() {
    const {ctx} = this.props;
    return (
      <Modal isVisible={ctx.state.visLoad}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <AnimatedLoader
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../assets/json/1.json')}
            animationStyle={styles.lottie}
            speed={1}>
            <Text style={{color: 'white'}}>Doing something...</Text>
          </AnimatedLoader>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
