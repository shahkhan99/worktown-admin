import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import Dialog, { DialogContent,DialogFooter,DialogButton,DialogTitle } from 'react-native-popup-dialog';
import Entypo from 'react-native-vector-icons/Entypo';
import {complainReply} from '../../backend/logic'
import ImageModal, {ImageDetail} from 'react-native-image-modal';


export default class viewDetail extends Component {
  state={
    visible: false,
    spinner: false,
    titleI: '',
    titleLable: '',
    complainImage: '-',
    titles: [
      {label: 'Resolved', value: 0},
      {label: 'In Progress', value: 1},
    ],
    reply:'',
    
  }
adminReply(){
  const {titleLable,reply}=this.state
  const {com} = this.props.route.params;
  let ticketID=com.key
  let rep={titleLable,reply,ticketID}
  complainReply(rep,this)

}
  
  handleInputChange = (inputName, inputValue) => {
    this.setState((state) => ({
      ...state,
      [inputName]: inputValue, // <-- Put square brackets
    }));
  };
  
componentDidMount(){
  const {com,getComplain} = this.props.route.params;
  console.log(getComplain);
  this.setState({reply:com.adminReply.reply,titleLable:com.adminReply.complainStatus})
}

  render() {
    const {com} = this.props.route.params;

    return (
      <SafeAreaView style={styles.container}>
       
        {/* <View style={styles.navview}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <AntDesign name="arrowleft" color={'black'} size={28} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 22,
                lineHeight: 28,
                color: 'grey',
                marginLeft: 100,
              }}>
              Complain Details
            </Text>
          </View>
        </View> */}
  <ScrollView>
        <View style={styles.detailboxmain}>
        <View style={styles.detailbox}>
        <View style={styles.ticket}>
          {com.adminReply.complainStatus == 'Resolved' ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="check-circle"
                color={'green'}
                size={22}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginLeft: 5,
                  color: 'green',
                }}>
                Resolved
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                color={'red'}
                size={22}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginLeft: 5,
                  color: 'red',
                }}>
                In Progress
              </Text>
            </View>
          )}
          <Text
            style={{
              fontWeight: '500',
              color: 'black',
              fontSize: 15,
            }}>
            Ticket ID: {com.id}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: '70%'}}>
            <View style={styles.titleview}>
              <View style={styles.titletext}>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontWeight: '700',
                    color: '#6B3590',
                    fontSize: 20,
                  }}>
                  {com.titleLable}
                </Text>
                <Text style={{color: '#6A6A6A'}}>{com.issue}</Text>
              </View>
            </View>
            <View style={styles.timeandmedia}>
              <View>
                <Text style={{color: '#b8b8b8'}}>
                  {Moment(new Date(com.createdOn)).format(
                    'DD MMM, YYYY hh:mm a',
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={{width: '25%'}}>
            {com.complainImage == '-' ? (
              <View />
            ) : (
              <ImageModal
                isTranslucent={false}
                resizeMode="contain"
                imageBackgroundColor="#000000"
                style={{
                  width: 80,
                  height: 80,
                }}
                source={{
                  uri: com.complainImage[0],
                }}
              />
            )}
          </View>
        </View>
      </View>
          {
            com.adminReply.reply=='-'?<View/>:
          
          <View style={styles.detailbox2}>
            <View style={styles.ticket}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="message-reply-text"
                  color={'green'}
                  size={22}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 5,
                    color: 'green',
                  }}>
                  Reply
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                  fontSize: 15,
                }}>
                Ticket ID: {com.id}
              </Text>
            </View>
            <View style={styles.titleview}>
              <View style={styles.titletext}>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontWeight: '700',
                    color: '#6B3590',
                    fontSize: 20,
                  }}>
                  Admin
                </Text>
                <Text style={{color: '#6A6A6A'}}>
                  {com.adminReply.reply}
                </Text>
              </View>
            </View>
            <View style={styles.timeandmedia}>
              <View>
                <Text>
                  {Moment(new Date(com.adminReply.replyOn)).format('DD MMM, YYYY hh:mm a')}
                </Text>
              </View>
            </View>
          </View>}
         
        </View>
        </ScrollView>
        {/* <View style={styles.container}> */}

        <View style={styles.btnview}>
        {this.state.spinner ? (
          <View style={styles.createTouce}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <TouchableOpacity
          style={styles.createBtnReply}
          onPress={() => this.setState({visible: true})}>
          <Text style={{fontSize: 14, color: '#fff', fontWeight: '700'}}>
            Admin Reply
          </Text>
        </TouchableOpacity>
        )}

        
        </View>
  <Dialog
    visible={this.state.visible}
    dialogTitle={<DialogTitle title="You Are?" />}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
    footer={
      <DialogFooter>
        <DialogButton
          textStyle={{color: '#6B3590'}}
          text="Reply"
          onPress={() => {
            this.adminReply()
          }}
        />
        </DialogFooter>
        }
  >
    <DialogContent style={{height:250}} >
    <ScrollView >
    <SafeAreaView >
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
          <View style={styles.AdminInput}>
        
          <TextInput
          KeyboardAvoidingView={true}
          ref={ref => (this.input = ref)}

              multiline={true}
              placeholder="Post your issue here..."
              placeholderTextColor="#d9d2d0"
              // keyboardType="visible-password"
              style={styles.inputAbout}
              autoCapitalize="sentences"
            value={ this.state.reply === '-'
            ? ''
            : this.state.reply}
              maxLength={150}
              onChangeText={(value) =>
                this.handleInputChange('reply', value)
              }
            />

             
          </View>
         
            
      
         
        </SafeAreaView>
        </ScrollView>
    </DialogContent>

  </Dialog>
{/* </View> */}

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailbox: {
    // marginLeft: 20,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: 'black',
    // height: 250,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
  },
  detailbox2: {
    // marginLeft: 20,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderColor: 'black',
   
    paddingVertical: 10,
    backgroundColor: '#FFF9FF',
    borderRadius: 20,
    width: '90%',
  },
  inputreply: {
    fontSize: 20,
    height: 100,
    margin: 100,
    borderWidth: 1,
    backgroundColor: '#ECE8E1',
  },
  detailboxmain: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'blue',
    
  },
  ticket: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 5,
  },

  titleview: {
    width: '90%',
    flexDirection: 'row',
  },
  titletext: {
    width: '100%',
  },
  timeandmedia: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  navview: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    width: '100%',
  },
  viewmediatext: {
    color: 'blue',
    fontSize: 15,

    textDecorationLine: 'underline',
  },
  createBtnReply: {
    width: 120,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#6B3590',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  btnview:{
    position: 'absolute',
    bottom: 20,
    // top:20,
    // height:'100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  crossBtn1: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10,
    // paddingRight:50,
    paddingHorizontal: 10,
  },
  AdminInput:{
    width:"100%",
    alignItems:'center',
    justifyContent:'space-between',
 

  },
  
  inputAbout: {
    width: 200,
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
 
});
