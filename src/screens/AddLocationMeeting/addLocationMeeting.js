import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';

const addLocationMeeting = () => {
  const [modalOneActive, setmodalOneActive] = useState(false);
  const [modalTwoActive, setmodalTwoActive] = useState(false);
  const [location, setLocation] = useState('');
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
          <TouchableOpacity style={styles.text_button}>
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
  text_view: {
    backgroundColor: 'white',
    elevation: 1,
    width: '90%',
    height: 60,
    borderRadius: 10,
    paddingLeft: 10,
  },
  text_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 200,
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
});
export default addLocationMeeting;
