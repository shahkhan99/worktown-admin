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
import {sendCommunityMessage, uid} from '../../../backend/logic';
import {GiftedChat} from 'react-native-gifted-chat';

export default class DirectChat extends Component {
  state = {
    messages: [],
  };
  linkSend = () => {
    let msg = {
      _id: 2,
      text: 'addas',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'umair',
      },
    };
    return msg;
  };
  componentDidMount() {
    this.onSend(this.linkSend());
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log(messages);
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
