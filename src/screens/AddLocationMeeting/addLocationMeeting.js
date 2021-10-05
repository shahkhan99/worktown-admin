import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Picker,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

import {addNewLocation} from '../../backend/logic';
import {addNewMeetingRoom} from '../../backend/logic';
import {connect} from 'react-redux';
const addLocationMeeting = () => {
  const [modalOneActive, setmodalOneActive] = useState(false);
  const [modalTwoActive, setmodalTwoActive] = useState(false);
  const [location, setLocation] = useState('');
  const locationList = useSelector(state => state.location.location);

  const [meetingRoom, setMeetingRoom] = useState({
    location: '',
    meetingNo: '',
    meetingName: '',
    meetingImage: '',
  });
  console.log(`${locationList} locationlist`);
  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setMeetingRoom({...meetingRoom, meetingImage: image});
    });
  };

  return (
    <View style={{alignItems: 'center', height: '100%', width: '96%'}}>
      <TouchableOpacity
        style={styles.complainTouch}
        onPress={() => {
          setmodalOneActive(true);
        }}>
        <View>
          <Text
            style={{
              fontWeight: '700',
              color: '#000',
              fontSize: 16,
            }}>
            Add Location
          </Text>
        </View>
        <View>
          <AntDesign name="right" color={'black'} size={28} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.complainTouch}
        onPress={() => {
          setmodalTwoActive(true);
        }}>
        <View>
          <Text
            style={[
              {
                fontWeight: '700',
                color: '#000',
                fontSize: 16,
              },
            ]}>
            Add Meeting Room
          </Text>
        </View>
        <View>
          <AntDesign name="right" color={'black'} size={28} />
        </View>
      </TouchableOpacity>
      {/* add location */}
      <Modal
        isVisible={modalOneActive}
        onBackdropPress={() => setmodalOneActive(false)}
        // backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        avoidKeyboard={true}>
        <View style={styles.text_container}>
          <TextInput
            style={styles.text_view}
            placeholder="Enter New Location"
            placeholderTextColor="#d9d2d0"
            keyboardType="visible-password"
            secureTextEntry={false}
            // style={styles.input}
            autoCapitalize="words"
            returnKeyType="done"
            onChangeText={value => setLocation(value)}
          />
          <TouchableOpacity
            style={styles.text_button}
            onPress={() => addNewLocation(location, setmodalOneActive)}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              Add Location
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* add meeting */}
      <Modal
        isVisible={modalTwoActive}
        onBackdropPress={() => setmodalTwoActive(false)}
        // backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        avoidKeyboard={true}>
        <View style={styles.text_container}>
          <View
            style={[
              {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <DropDownPicker
              items={[
                ...locationList.map((item, i) => {
                  return {label: item, value: item};
                }),
              ]}
              placeholder="Select Item"
              containerStyle={{
                height: 40,
                width: '90%',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              placeHolder="Location"
              dropDownDirection="auto"
              onChangeItem={item =>
                setMeetingRoom({...meetingRoom, location: item.value})
              }
            />
          </View>
          <View style={[{width: '100%', zIndex: -5}, styles.view_container]}>
            <TextInput
              style={[{marginTop: -13}, styles.text_view]}
              placeholder="Enter Meeting No"
              placeholderTextColor="#d9d2d0"
              keyboardType="visible-password"
              secureTextEntry={false}
              // style={styles.input}
              autoCapitalize="words"
              returnKeyType="done"
              onChangeText={value =>
                setMeetingRoom({...meetingRoom, meetingNo: value})
              }
            />

            <TextInput
              style={styles.text_view}
              placeholder="Enter Meeting Name"
              placeholderTextColor="#d9d2d0"
              keyboardType="visible-password"
              secureTextEntry={false}
              // style={styles.input}
              autoCapitalize="words"
              returnKeyType="done"
              onChangeText={value =>
                setMeetingRoom({...meetingRoom, meetingName: value})
              }
            />
            <TouchableOpacity onPress={selectImage} style={styles.view_icon}>
              <AntDesign name="picture" size={34} color={'grey'} />
              <Text>Select Image</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.text_button}
            onPress={e => {
              e.preventDefault;
              addNewMeetingRoom(meetingRoom, setmodalTwoActive);
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              Add Meeting
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  complainTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 50,
    width: '100%',
    marginVertical: 5,
    // padding: 20,
    paddingHorizontal: 8,
    elevation: 5,
    borderRadius: 7,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },

  view_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  text_view: {
    backgroundColor: 'white',
    elevation: 4,
    width: '90%',
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  text_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#d3d5e8',
    width: '100%',
    height: 400,
  },
  text_button: {
    borderRadius: 10,
    backgroundColor: '#841584',
    width: 150,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_icon: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: -25,
  },
});

export default addLocationMeeting;
