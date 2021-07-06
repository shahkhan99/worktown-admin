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
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {getProfile, setComplain} from '../../../backend/logic';
import {ComplainPick} from '../../ProfileImageUpload/imageUpload.js';
import Toast from 'react-native-simple-toast';
import {KeyboardAvoidingView} from 'react-native';

class ComplainPortalModal extends Component {
  constructor(props) {
    super();

    this.state = {
      spinner: false,
      issue: '',
      titleI: '',
      titleLable: '',
      complainImage: '-',
      titles: [
        {label: 'AC', value: 0},
        {label: 'Internet', value: 1},
        {label: 'Other', value: 2},
      ],
      adminReply: {
        reply: '-',
        status: 'sent',
        replyOn: '-',
        complainStatus: '-',
      },
      userImage: '',
      userName: '',
      userCompany: '',
      createdOn: new Date(),
    };
  }

  fetchProfile = () => {
    let a = [];
    getProfile().then((data) => {
      a.push(data);
      a.forEach((element) => {
        this.setState({
          userName: element.name,
          userImage: element.logos[1],
          userCompany: element.companyName,
        });
      });
    });
  };
  componentDidMount() {
    this.fetchProfile();
  }

  setComplain = (ctx) => {
    const {
      titleLable,
      issue,
      complainImage,
      userName,
      userCompany,
      userImage,
      adminReply,
      createdOn,
    } = this.state;
    const complain = {
      titleLable,
      issue,
      complainImage,
      userName,
      userCompany,
      userImage,
      adminReply,
      createdOn,
    };
    if (titleLable == '') {
      Toast.show('Please Select Issue');
    } else if (issue == '') {
      Toast.show('Please write Something about your issue');
    } else {
      this.setState({spinner: true});
      setComplain(complain).then(
        (ref) =>
          ctx.setState({
            visModal: false,
          }),
        this.setState({spinner: false, titleLable: '', titleI: ''}),
        ctx.fetchComplains(),
      );
    }
  };

  handleInputChange = (inputName, inputValue) => {
    this.setState((state) => ({
      ...state,
      [inputName]: inputValue, // <-- Put square brackets
    }));
  };
  render() {
    const {ctx} = this.props;
    return (
      <Modal
        isVisible={ctx.state.visModal}
        onBackdropPress={() => {
          ctx.setState({visModal: false});
        }}
        // backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        avoidKeyboard={true}>
        <SafeAreaView style={styles.modelContainer}>
          <TouchableOpacity
            style={styles.crossBtn}
            onPress={() => {
              ctx.setState({visModal: false});
            }}>
            <Entypo name="cross" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{width: '100%', alignItems: 'center', height: 50}}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>New Ticket</Text>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <RadioForm
              formHorizontal={true}
              animation={true}
              style={{
                width: '70%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
              }}>
              {this.state.titles.map((obj, i) => {
                let onPress = (label, index) => {
                  this.setState({
                    titleI: index,
                    titleLable: obj.label,
                  });
                };

                return (
                  <RadioButton labelHorizontal={false} key={i}>
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.titleI === i}
                      onPress={onPress}
                      buttonInnerColor={'#6B3590'}
                      buttonOuterColor={
                        this.state.titleI === i ? '#2196f3' : '#000'
                      }
                      buttonSize={15}
                      buttonStyle={{}}
                      buttonWrapStyle={{}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      onPress={onPress}
                      labelStyle={{
                        fontWeight: 'normal',
                        color: '#000',
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                );
              })}
            </RadioForm>
          </View>
          <View style={styles.postView}>
            <TextInput
              multiline={true}
              placeholder="Post your issue here..."
              placeholderTextColor="#d9d2d0"
              // keyboardType="visible-password"
              style={styles.inputAbout}
              autoCapitalize="sentences"
              onChangeText={(value) => this.handleInputChange('issue', value)}
              maxLength={150}
            />
            <TouchableOpacity
              style={styles.mediaBtn}
              onPress={() => ComplainPick(this)}>
              <Entypo name="link" size={24} color="#000" />
              <Text style={{paddingLeft: 10}}>
                Upload Video/Image(Optional)
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.createBtn}>
            {this.state.spinner ? (
              <View style={styles.createTouce}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.createTouce}
                onPress={() => this.setComplain(ctx)}>
                <Text style={{fontSize: 14, color: '#fff', fontWeight: '700'}}>
                  Create
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modelContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '80%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  crossBtn: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  postView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputAbout: {
    width: '80%',
    height: 150,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    alignItems: 'center',
    fontSize: 16,
    margin: 5,
    backgroundColor: 'white',
    elevation: 8,
    textAlignVertical: 'top',
    borderRadius: 15,
    shadowColor: '#a6a6a6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  mediaBtn: {
    marginVertical: 20,
    height: 50,
    width: '80%',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    shadowColor: '#a6a6a6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  createBtn: {
    // position: 'absolute',
    bottom: 10,
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
  createTouce: {
    width: 120,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#6B3590',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ComplainPortalModal;
