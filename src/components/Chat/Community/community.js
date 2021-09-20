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
  AsyncStorage,
} from 'react-native';
import {
  sendCommunityMessage,
  uid,
  getProfileuser,
  getCommunityMessages,
  offRef,
} from '../../../backend/logic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import * as ImagePicker from 'react-native-image-picker';

export default class CommunityChat extends Component {
  state = {
    messages: [],
    userImage: '',
    userName: '',
    uid: '',
  };
  handleAddPicture = () => {
    const {user} = this.props; // wherever you user data is stored;
    const options = {
      title: 'Select Profile Pic',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a Photo',
      maxWidth: 256,
      maxHeight: 256,
      allowsEditing: true,
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        // do nothing
      } else if (response.error) {
        // alert error
      } else {
        const {uri} = response;
        const extensionIndex = uri.lastIndexOf('.');
        const extension = uri.slice(extensionIndex + 1);
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const correspondingMime = ['image/jpeg', 'image/jpeg', 'image/png'];
        const options = {
          keyPrefix: AwsConfig.keyPrefix,
          bucket: AwsConfig.bucket,
          region: AwsConfig.region,
          accessKey: AwsConfig.accessKey,
          secretKey: AwsConfig.secretKey,
        };
        const file = {
          uri,
          name: `${this.messageIdGenerator()}.${extension}`,
          type: correspondingMime[allowedExtensions.indexOf(extension)],
        };
        RNS3.put(file, options)
          .progress((event) => {
            console.log(`percent: ${event.percent}`);
          })
          .then((response) => {
            console.log(response, 'response from rns3');
            if (response.status !== 201) {
              alert(
                'Something went wrong, and the profile pic was     not uploaded.',
              );
              console.error(response.body);
              return;
            }
            const message = {};
            message._id = this.messageIdGenerator();
            message.createdAt = Date.now();
            message.user = {
              _id: user._id,
              name: `${user.firstName} ${user.lastName}`,
              avatar: user.avatar,
            };
            message.image = response.headers.Location;
            message.messageType = 'image';

            this.chatsFromFB.update({
              messages: [message, ...this.state.messages],
            });
          });
        if (!allowedExtensions.includes(extension)) {
          return alert('That file type is not allowed.');
        }
      }
    });
  };
  fetchProfile = async () => {
    let a = [];
    const uid = await AsyncStorage.getItem('uid');
    getProfileuser().then((data) => {
      a.push(data);
      a.forEach((element) => {
        this.setState({
          userName: element.name,
          userImage: element.logo,
          uid: uid,
        });
      });
    });
  };
  getMessages() {
    getCommunityMessages((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      })),
    );
  }
  componentDidMount() {
    this.fetchProfile();
    this.getMessages();
  }
  componentWillUnmount() {
    offRef();
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    sendCommunityMessage(this.state.messages);
  }
  renderName = (props) => {
    const {user: self} = this.props; // where your user data is stored;
    const {user = {}} = props.currentMessage;
    const {user: pUser = {}} = props.previousMessage;
    const isSameUser = pUser._id === user._id;
    const shouldNotRenderName = isSameUser;
    let firstName = user.name;
    return shouldNotRenderName ? (
      <View />
    ) : (
      <View>
        {this.state.uid == user._id ? (
          <View />
        ) : (
          <Text style={{color: 'grey', padding: 2, alignSelf: 'flex-start'}}>
            {`${firstName}`}
          </Text>
        )}
      </View>
    );
  };
  renderBubble = (props) => {
    return (
      <View style={{}}>
        {this.renderName(props)}
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'white',
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: 'white',
            },
            right: {
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
            },
          }}
        />
      </View>
    );
  };
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={sendCommunityMessage}
        user={{
          _id: this.state.uid,
          name: this.state.userName,
          avatar: this.state.userImage,
        }}
        renderBubble={this.renderBubble}
        renderAvatarOnTop={true}
      />
    );
  }
}
