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
import {handleLogin} from '../../backend/logic'
class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({
      ...state,
      [inputName]: inputValue, // <-- Put square brackets
    }));
  };
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }
  handleBackButton = () => {
    if (this.props.navigation.isFocused()) {
   
        BackHandler.exitApp()

    }
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* <StatusBar translucent backgroundColor="transparent" /> */}
            <View>
              <Text style={styles.heading}>Login</Text>
            </View>

            <View style={styles.form}>
              <TextInput

                placeholder="Admin Email"
                placeholderTextColor="#d9d2d0"
                keyboardType="visible-password"
                secureTextEntry={false}
                style={styles.input}
                autoCapitalize="none"
                onSubmitEditing={() => this.password.focus()}
                returnKeyType="next"
                onChangeText={value => this.handleInputChange('email', value)}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#d9d2d0"
                secureTextEntry={true}
                style={styles.input}
                ref={ref => (this.password = ref)}
                autoCapitalize="none"
                onChangeText={value =>
                  this.handleInputChange('password', value)
                }
              />
              <Text>{this.state.email}</Text>
            </View>

            <View style={styles.submitBtnView}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => {
                  handleLogin(this.state.email,this.state.password,this.props.navigation);
                }}>
                <Text style={styles.submitBtnText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    width: Dimensions.get('window').width,
  },
  heading: {
    fontSize: 35,
    fontWeight: '700',
  },
  googleBtnView: {
    width: '88%',
  },
  googleBtn: {
    backgroundColor: 'white',
    height: 58,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 24,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'red',
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 20,
  },
  googleText: {
    fontSize: 20,
    color: '#4285F4',
    fontWeight: '700',
  },
  googleIcon: {
    height: 40,
    width: 40,
  },
  form: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  orText: {
    marginTop: 10,
    fontSize: 15,
    color: 'grey',
    margin: 10,
  },
  inputForm: {},
  input: {
    color:'#000',
    width: '88%',
    height: 58,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowOffset: {width: 0, height: 0},
    // shadowColor: 'red',
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 15,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    margin: 5,
  },
  submitBtnView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    height: 58,
    width: '88%',
    backgroundColor: '#7041EE',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  signupTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 15,
    color: '#7041EE',
    fontWeight: '700',
  },
});

export default Login;
