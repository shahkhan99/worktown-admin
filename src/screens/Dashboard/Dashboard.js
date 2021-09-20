import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.contain}>
        <View style={styles.header}>
          <View>
            <Text>Admin</Text>
            <Text style={styles.headertext}>Dashboard </Text>
          </View>
        </View>
        <View style={styles.boxView}>
          <TouchableOpacity
            style={styles.blueBox}
            onPress={() => {
              this.props.navigation.navigate('Meeting');
            }}>
            <Text style={styles.boxText}> Meeting Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.redBox}
            onPress={() => {
              this.props.navigation.navigate('complainCompany');
            }}>
            <Text style={styles.boxText}>Complain Portal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.purpleBox}
            onPress={() => {
              this.props.navigation.navigate('Chat');
            }}>
            <Text style={styles.boxText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.yellowBox}
            onPress={() => {
              this.props.navigation.navigate('Profile');
            }}>
            <Text style={styles.boxText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.greenBox}
            onPress={() => {
              this.props.navigation.navigate('ApproveAndReject');
            }}>
            <Text style={styles.boxText}>Approve / Disapprove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headertext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    // backgroundColor: '#378EC5',
    height: 70,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    // alignItems: 'center=',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contain: {
    flex: 1,
    // backgroundColor: '#E5E5E5',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // height: '',
  },
  boxs: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 4,
    // borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
  },
  boxView: {
    width: '100%',
    // height: 450,
    // backgroundColor: 'red',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  blueBox: {
    backgroundColor: '#6B3590',
    height: 100,
    width: 153,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  purpleBox: {
    backgroundColor: '#C21D6D',
    height: 100,
    width: 153,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  redBox: {
    backgroundColor: '#ED393B',
    height: 100,
    width: 153,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  yellowBox: {
    backgroundColor: '#FAA52D',
    height: 100,
    width: 153,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  greenBox: {
    backgroundColor: '#28CF5F',
    height: 100,
    width: 153,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
