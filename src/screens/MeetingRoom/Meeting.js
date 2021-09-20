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
  FlatList,
  Dimensions,
  Alert,
  Modal
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  DialogFooter,
} from 'react-native-popup-dialog';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CalendarList} from "react-native-common-date-picker";


// Databse
import {setMeetingSlot,getAllMeetings,getProfile} from '../../backend/logic';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
import {FAB} from 'react-native-paper';
class Meeting extends Component {
  state = {
    snapPoints: ['300', '200', '0'],
    fabHide: true,
    location: '',
    startDate: '',
    endDate:'',
    startTime: '',
    endTime: '',
    roomNumber: null,
    visDate: false,
    visRoom: false,
    visSTime: false,
    visETime: false,
    meetings:[],
    currentDate: new Date(),
    meetingRoom: [
      {
        id: 1,
        loction: 'Metropole',
        name: 'Ground Floor - Large',
        imgUrl: require('./assets/images/MeetingRoom/1.jpg'),
      },
      {
        id: 2,
        location: 'Metropole',
        name: 'Ground Floor - Small',
        imgUrl: require('./assets/images/MeetingRoom/2.jpg'),
      },
      {
        id: 3,
        location: 'Metropole',
        name: 'First Floor - Custom',
        imgUrl: require('./assets/images/MeetingRoom/3.jpg'),
      },
    ],
    meetingSlot: [],
    meetingDate:[],
    companyImage:'-',
    userName:'-',
    userCompany:'-',
  };

  fetchProfile = () => {
      let a = [];
    getProfile().then((data) => {
      a.push(data);
      a.forEach((element) => {
        this.setState({
          userName: element.name,
          companyImage: element.logo,
          userCompany: element.companyName,
        });
      });
    });
  };

  fetchMeetings = () => {
    const date = [];
    getAllMeetings().then((data) => {
      Object.keys(data).forEach((d) => {
        date.push(d);
      });
      date.sort((a, b) => {
        var dateA = new Date(a);
        var dateB = new Date(b);
        return dateA - dateB;
      });
      this.setState({meetingDate: date, meetingSlot: data});
    });

  };

  bookSlot = () => {
    const {
      companyImage,
      userName,
      userCompany,
      location,
      roomNumber,
      startTime,
      endTime,
      startDate,
      endDate
  
    } = this.state;
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");
    for(let i=0;i<=diffDays;i++){
    const date= Moment(new Date(new Date(startDate).setDate(new Date(startDate).getDate() + i))).format('DD-MMM-YYYY')
  
    const slot = {
      companyImage,
      userName,
      userCompany,
      location,
      roomNumber,
      date,
      startTime,
      endTime,
    };
    setMeetingSlot(slot, this);}
  };

 componentDidMount(){
   this.fetchmeeting()
 }
  onOpenBottomSheetHandler = index => {
    this.refs.bottomSheetRef.snapTo(index);
    this.setState({fabHide: false});
  };
  fabShow() {
    this.setState({fabHide: true});
  }
  renderHeader = () => (
    <View
      style={{
        backgroundColor: '#FAFFF9',
        padding: 26,
        height: 50,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        width: Screen.width,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 5,
          width: 40,
          backgroundColor: 'grey',
          borderRadius: 50,
          marginBottom: 8,
        }}></View>
      <Text style={{fontSize: 20, fontWeight: '700'}}>Book A Meeting Room</Text>
    </View>
  );
  renderContent = () => (
    <View style={styles.bottomContent}>
      <DropDownPicker
        items={[
          {label: 'Metropole', value: 'Metropole'},
          {label: 'PECHS', value: 'PECHS'},
        ]}
        placeholder="Location"
        defaultValue={this.state.location}
        style={styles.dropDown}
        containerStyle={{height: 40, width: '80%'}}
        onChangeItem={item => this.setState({location: item.value})}
      />
      <View style={styles.dayDateView}>
        {/* Room */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => {
            this.setState({visRoom: true});
          }}>
          <MaterialIcons name="location-pin" color="#000" size={30} />
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#c4c4c4'}}>Where</Text>
            <Text>ROOM ID {this.state.roomNumber}</Text>
          </View>
        </TouchableOpacity>
        {/* Date */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => {
            this.setState({
              visDate: true,
              
            });
          }}>
          <MaterialIcons name="date-range" color="#000" size={30} />
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#c4c4c4'}}>When</Text>
            {this.state.startDate && this.state.endDate ? (
              <Text>{this.state.startDate}-{this.state.endDate}</Text>
            ) : (
              <Text>Date</Text>
            )}
          </View>
        </TouchableOpacity>
        {/* Start Time */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => {
            this.setState({
              visSTime: true,
              startTime: Moment(new Date()).format('hh:mm a'),
            });
          }}>
          <MaterialIcons name="timer" color="#000" size={30} />
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#c4c4c4'}}>Start</Text>
            {this.state.startTime ? (
              <Text>{this.state.startTime}</Text>
            ) : (
              <Text>Time</Text>
            )}
          </View>
        </TouchableOpacity>
        {/* End Time */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => {
            this.setState({
              visETime: true,
              endTime: Moment(new Date()).format('hh:mm a'),
            });
          }}>
          <MaterialIcons name="timer-off" color="#000" size={30} />
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#c4c4c4'}}>End</Text>
            {this.state.endTime ? (
              <Text>{this.state.endTime}</Text>
            ) : (
              <Text>Time</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {/* Booking Confirm Button */}
      <TouchableOpacity
        style={{
          width: '50%',
          height: 35,
          backgroundColor: '#6B3590',
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 8,
        }}
        onPress={() =>this.bookSlot()}>
        <Text style={{color: '#fff', fontSize: 15}}>Book</Text>
      </TouchableOpacity>
    </View>
  );
  componentDidMount() {
    console.log(this.drawerCallbackNode);
    this.fetchMeetings()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backicon}>
            <Ionicons
              size={34}
              color={'white'}
              name="md-return-down-back-outline"
              onPress={() => {
                this.props.navigation.navigate('Dashboard');
              }}></Ionicons>
          </View>
          <View style={styles.textview}>
            <Text style={styles.headertext}>Meeting Room </Text>
          </View>
        </View>
        <View style={{height:'100%',width:'100%'}}> 
          {this.state.meetingSlot == null ? (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No meeting available</Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.user}>
                  {this.state.meetingDate.map((val, i) => {
                    for (let k = 0; k <= 30; k++) {
                      if (
                        Moment(val).format('MMM DD, YYYY') ===
                          Moment(
                            new Date(
                              new Date().setDate(new Date().getDate() + k),
                            ),
                          ).format('MMM DD, YYYY') ||
                        Moment(val).format('MMM DD, YYYY') ===
                          Moment(new Date()).format('MMM DD, YYYY')
                      ) {
                        return (
                          <View style={styles.completeView}>
                            <View style={styles.dateView}>
                              <View style={styles.line} />
                              <View>
                                {Moment(val).format('MMM DD, YYYY') ===
                                Moment(new Date()).format('MMM DD, YYYY') ? (
                                  <Text style={{color: '#d0d6d1'}}>Today</Text>
                                ) : (
                                  <Text style={{color: '#d0d6d1'}}>
                                    {Moment(val).format('MMM DD, YYYY')}
                                  </Text>
                                )}
                              </View> 
                              <View style={styles.line} />
                            </View>
                            <View>
                              {Object.keys(this.state.meetingSlot[val]).map(
                                (key, i) => {
                                  const item = this.state.meetingSlot[val][key];
                                  return (
                                    <View style={styles.slotCard}>
                                      <View>
                                        <Image
                                          source={{uri: item.companyImage}}
                                          style={styles.dp}
                                        />
                                      </View>
                                      <View style={styles.detailsView}>
                                        <Text style={styles.companyHead}>
                                          {item.userCompany}
                                        </Text>
                                        <View style={styles.roomTime}>
                                          <View>
                                            <Text>
                                              Meeting Room {item.roomNumber}
                                            </Text>
                                          </View>
                                          <Entypo
                                            name="dot-single"
                                            color={'#000'}
                                            size={18}
                                          />
                                          <View style={styles.timeView}>
                                            <Text>{item.startTime}</Text>
                                            <Text> - </Text>
                                            <Text>{item.endTime}</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  );
                                },
                              )}
                            </View>
                          </View>
                        );
                      }
                    }
                  })}
                </View>
              </ScrollView>)}
        </View>
        <FAB
          style={this.state.fabHide ? styles.fab : styles.fab1}
          large
          label="Book As an Admin"
          icon={() => (
            <Image
              source={require('./assets/images/logo.png')}
              style={styles.iconSize}
            />
          )}
          onPress={() => this.onOpenBottomSheetHandler(0)}
        />

        <BottomSheet
          // callBackNode={this.drawerCallbackNode}
          ref={'bottomSheetRef'}
          snapPoints={[450, '50%', 0]}
          initialSnap={2}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          onCloseEnd={() => this.fabShow()}
          enabledGestureInteraction={true}
          enabledBottomClamp={true}
          enabledInnerScrolling={false}
        />
        {/* RoomID Dialog */}
        <Dialog
          visible={this.state.visRoom}
          dialogTitle={<DialogTitle title="Pick Room" />}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onTouchOutside={() => {
            this.setState({visRoom: false});
          }}>
          <DialogContent style={{height: 250}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: 250}}>
              {this.state.meetingRoom.map((rooms, i) => {
                return (
                  <TouchableOpacity
                    style={
                      this.state.roomNumber == rooms.id
                        ? styles.roomListDialog
                        : styles.roomListDialog1
                    }
                    onPress={() => {
                      this.setState({roomNumber: rooms.id, visRoom: false});
                    }}>
                    <Image
                      source={rooms.imgUrl}
                      style={{height: 50, width: 50, borderRadius: 50}}
                    />
                    <View>
                      <Text>Room ID: {rooms.id}</Text>
                      <Text>{rooms.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </DialogContent>
        </Dialog>
        {/* Date Dialog */}
        <Dialog
          visible={this.state.visDate}
          dialogTitle={<DialogTitle title="Pick Date" />}
          animationDuration={400}
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0, // optional
              useNativeDriver: true,
            })
          }
          onTouchOutside={() => {
            this.setState({visDate: false, date: ''});
          }}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={{color: '#6B3590'}}
                text="CANCEL"
                onPress={() => {
                  this.setState({visDate: false, date: ''});
                }}
              />
              <DialogButton
                textStyle={{color: '#6B3590'}}
                text="OK"
                onPress={() => {
                  this.setState({
                    visDate: false,
                    date: Moment(this.state.currentDate).format('DD-MMMM-YYYY'),
                  });
                }}
              />
            </DialogFooter>
          }>
          <DialogContent>
            {/* <DatePicker
              style={{width: 250}}
              date={this.state.currentDate}
              mode="date"
              placeholder="Select Day"
              format="YYYY-MM-DD"
              minimumDate={new Date()}
              maximumDate={
                new Date(new Date().setDate(new Date().getDate() + 30))
              }
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({
                  currentDate: date,
                });
              }}
            /> */}
               <CalendarList
                        titleText={'Select Date'}
                        minDate={new Date()}
                        maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                        cancel={() => this.setState({visDate: false})}
                        selectedDateMarkType={'circle'}
                        selectedDateMarkColor={'red'}
                        selectedDateMarkRangeColor={'orange'}
                        headerTitleType={2}
                        confirm={data => {
                            this.setState({
                                startDate: data[0],
                                endDate:data[1],
                                visDate: false,
                            });
                            console.log(this.state.startDate,'dateeeee');
                        }}
                    />
          </DialogContent>
        </Dialog>
        {/* Start Time */}
        <Dialog
          visible={this.state.visSTime}
          dialogTitle={<DialogTitle title="Start Time" />}
          animationDuration={400}
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0, // optional
              useNativeDriver: true,
            })
          }
          onTouchOutside={() => {
            this.setState({visSTime: false});
          }}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={{color: '#6B3590'}}
                text="CANCEL"
                onPress={() => {
                  this.setState({visSTime: false, startTime: ''});
                }}
              />
              <DialogButton
                textStyle={{color: '#6B3590'}}
                text="CONFIRM"
                onPress={() => {
                  this.setState({visSTime: false});
                }}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <DatePicker
              androidVariant="iosClone"
              mode="time"
              date={this.state.currentDate}
              minuteInterval={15}
         
              onDateChange={date => {
                this.setState({
                  startTime: Moment(date).format('hh:mm a'),
                });
              }}
            />
          </DialogContent>
        </Dialog>
        {/* End Time */}
        <Dialog
          visible={this.state.visETime}
          dialogTitle={<DialogTitle title="End Time" />}
          animationDuration={400}
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0, // optional
              useNativeDriver: true,
            })
          }
          onTouchOutside={() => {
            this.setState({visETime: false});
          }}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={{color: '#6B3590'}}
                text="CANCEL"
                onPress={() => {
                  this.setState({
                    visETime: false,
                    endTime: '',
                  });
                }}
              />
              <DialogButton
                textStyle={{color: '#6B3590'}}
                text="CONFIRM"
                onPress={() => {
                  this.setState({visETime: false});
                }}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <DatePicker
              androidVariant="iosClone"
              mode="time"
              date={this.state.currentDate}
              minuteInterval={15}
            
              onDateChange={date => {
                this.setState({
                  endTime: Moment(date).format('hh:mm a'),
                });
              }}
            />
          </DialogContent>
        </Dialog>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headertext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textview: {
    width: '90%',
  },
  backicon: {
    display: 'flex',
    width: '30%',
    // justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#6B3590',
    height: 50,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
  },
  user: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  dateView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left: 20,
  },
  dp: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  completeView: {
    width: '100%',
  },

  roomTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  detailsView: {
    width: '70%',
  },
  slotCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '95%',
    margin: 5,
    backgroundColor: '#FFF9FF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderLeftWidth: 4,
    borderLeftColor: '#6B3590',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  timeView: {
    display: 'flex',
    flexDirection: 'row',
  },
  companyHead: {
    fontWeight: '700',
    fontSize: 20,
    color: '#6B3590',
  },
  iconSize: {
    height: 22,
    width: 22,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 70,
    right: 70,
    bottom: 10,
    backgroundColor: '#6B3590',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab1: {
    display: 'none',
  },
  box: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  boxWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomContent: {
    backgroundColor: '#FAFFF9',
    padding: 16,
    height: 560,
    alignItems: 'center',
  },
  dropDown: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderWidth: 0,
    elevation: 10,
    shadowOffset: {width: 0, height: 1},
    // shadowColor: 'red',
    shadowOpacity: 1,
    shadowRadius: 24,
  },
  dayDateView: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBox: {
    height: 50,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
  },
  roomListDialog: {
    height: 70,
    width: '100%',
    backgroundColor: '#FFF9FF',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  roomListDialog1: {
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  roomDetailsDialog: {
    width: '100%',
    justifyContent: 'flex-start',
  },
});


export default Meeting;
