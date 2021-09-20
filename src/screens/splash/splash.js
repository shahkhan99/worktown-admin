import React, {Component} from 'react';
import {View, StyleSheet, Animated, Text, TouchableOpacity,AsyncStorage} from 'react-native';
import {withNavigation} from 'react-navigation';

class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
  async componentDidMount() {

    setTimeout(async () => {
      const user = await AsyncStorage.getItem('uid');

      user
      
        ? this.props.navigation.navigate('Dashboard')
        : this.props.navigation.navigate('Login')

    }, 2000);
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          onLoad={this.onLoad}
          // {...this.props}
          source={require('./assets/images/logo.png')}
          style={[
            styles.image,
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    );
  }
}

const Splash = () => (
  <View style={styles.container}>
    <ImageLoader
      style={styles.image}
      source={require('./assets/images/logo.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default withNavigation(ImageLoader);
