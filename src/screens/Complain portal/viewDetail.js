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
  Image,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {InputAccessoryView} from 'react-native';

export default class viewDetail extends Component {
  render() {
    const {com} = this.props.route.params;
    console.log(com.issue);
    return (
      <SafeAreaView styles={styles.container}>
        <View style={styles.navview}>
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
        </View>

        <View style={styles.detailboxmain}>
          <View style={styles.detailbox}>
            <View style={styles.ticket}>
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
                  {com.titleLable}
                </Text>
                <Text style={{color: '#6A6A6A'}}>
                  {com.issue} jajd njnbadk bdkna bdkab jbadkn ba jadkb{' '}
                </Text>
              </View>
            </View>
            <View style={styles.timeandmedia}>
              <View>
                <Text>
                  Time: {Moment(new Date(com.createdOn)).format('hh:mm a')}
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={styles.viewmediatext}>View Media</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
                  {com.issue} jajd njnbadk bdkna bdkab jbadkn ba jadkb{' '}
                </Text>
              </View>
            </View>
            <View style={styles.timeandmedia}>
              <View>
                <Text>
                  Time: {Moment(new Date(com.createdOn)).format('hh:mm a')}
                </Text>
              </View>
            </View>
          </View>
        </View>
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
    height: 250,
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
});
