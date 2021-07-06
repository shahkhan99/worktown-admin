import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import CommunityChat from '../../components/Chat/Community/community';
import DirectChat from '../../components/Chat/Direct/direct';

class Chat extends Component {
  state = {
    chatOption: 'community',
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <View style={styles.headingView}>
          <Text style={styles.Text}>Chat</Text>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={
              this.state.chatOption == 'community'
                ? styles.btnText
                : styles.btnText1
            }
            onPress={() => this.setState({chatOption: 'community'})}>
            <Text
              style={
                this.state.chatOption == 'community'
                  ? styles.btnText
                  : styles.btnText1
              }>
              Community
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.chatOption == 'direct'
                ? styles.btnText
                : styles.btnText1
            }
            onPress={() => this.setState({chatOption: 'direct'})}>
            <Text
              style={
                this.state.chatOption == 'direct'
                  ? styles.btnText
                  : styles.btnText1
              }>
              Direct
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chatView}>
          {this.state.chatOption == 'community' ? (
            <CommunityChat />
          ) : (
            <DirectChat />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    // position: 'absolute',
    // zIndex: 1,
    // position: 'relative',
  },
  headingView: {
    display: 'flex',
    width: Dimensions.get('window').width,
    textAlign: 'center',
    paddingVertical: 10,
    paddingLeft: 20,
  },
  Text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  chatView: {
    // flex: 1,
    // display: 'flex',
    height: '100%',
    width: '100%',
    paddingBottom: 120,
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 45,
  },
  btnText: {
    fontSize: 16,
    borderRadius: 50,
    backgroundColor: '#2F80ED',
    paddingHorizontal: 15,
    paddingVertical: 6,
    fontWeight: '700',
    color: 'white',
  },
  btnText1: {
    fontSize: 16,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 6,
    fontWeight: '700',
    color: 'black',
  },
});

export default Chat;
