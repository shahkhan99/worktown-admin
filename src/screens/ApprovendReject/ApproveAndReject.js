import React, {Component} from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAllCompanies, updateApproval} from '../../backend/logic';
import Toast from 'react-native-simple-toast';
import Loader from '../../loader/loader';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ApproveAndReject extends Component {
  state = {
    visLoad: false,
    profile: [],
    refreshing: false,
  };
  onRefresh() {
    this.setState({refreshing: true});
    setInterval(() => {
      this.fetchUsers();
      this.setState({refreshing: false});
    }, 2000);
  }
  approveAlert = data =>
    Alert.alert(
      'Confirmation',
      'Are you sure you want to approve ' + data.name,
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.approveUser(data)},
      ],
    );
  disapproveAlert = data =>
    Alert.alert(
      'Confirmation',
      'Are you sure you want to disapprove ' + data.name,
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.disapproveUser(data)},
      ],
    );
  fetchUsers = () => {
    getAllCompanies().then(data => {
      console.log('in class', data);
      this.setState({profile: data});
    });
  };
  componentDidMount() {
    this.fetchUsers();
    // this.focusListner = this.props.navigation.addListener('focus', () => {
    //   this.fetchUsers();
    // });
  }
  componentWillUnmount() {
    // this.focusListner;
  }
  approveUser = data => {
    if (data.approval == 'approved') {
      Toast.show(data.name + ' has already been Approved');
    } else {
      updateApproval('approved', data.uid, this);
      this.fetchUsers();
    }
  };
  disapproveUser = data => {
    if (data.approval == 'disapproved') {
      Toast.show(data.name + 'has already been Disapproved');
    } else {
      updateApproval('disapproved', data.uid, this);
      this.fetchUsers();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backicon}>
            <Ionicons
              size={34}
              color={'black'}
              name="md-return-down-back-outline"
              onPress={() => {
                this.props.navigation.navigate('Dashboard');
              }}></Ionicons>
          </View>
          <View style={styles.textview}>
            <Text style={styles.headertext}>Approve & Reject </Text>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>
          {this.state.profile &&
            this.state.profile.map((data, i) => {
              return (
                <View key={i} style={styles.boxdata}>
                  <View style={styles.boxitems}>
                    <Text style={{fontWeight: 'bold'}}>
                      Company Name: {data.companyName}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      EmployeeName:{data.name}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>Email:{data.email}</Text>
                  </View>
                  <View style={styles.logoview}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 100,
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity>
                        <View style={styles.icons}>
                          <AntDesign
                            name="checkcircle"
                            size={34}
                            color={'green'}
                            // onPress={() => this.createTwoButtonAlert}
                            onPress={() => this.approveAlert(data)}
                          />
                          <Text style={{fontSize: 10}}>Approve</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={styles.icons}>
                          <AntDesign
                            name="closecircle"
                            size={34}
                            color={'red'}
                            onPress={() => this.disapproveAlert(data)}
                          />
                          <Text style={{fontSize: 10}}>Reject</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.status}>
                      {data.approval == 'approved' ? (
                        <Text style={{color: 'green'}}>
                          {data.approval.replace(/\b(\w)/g, s =>
                            s.toUpperCase(),
                          ) + '!'}
                        </Text>
                      ) : (
                        <Text style={{color: 'red'}}>
                          {data.approval.replace(/\b(\w)/g, s =>
                            s.toUpperCase(),
                          ) + '!'}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  status: {
    // position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    // height: '20%',
  },
  textview: {
    width: '90%',
  },
  backicon: {
    display: 'flex',
    width: '30%',
    // justifyContent: 'space-between',
  },
  headertext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#28CF5F',
    height: 50,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  logoview: {
    width: '30%',
    // display: 'flex',
    justifyContent: 'space-evenly',
    // flexDirection: 'column',
    // width: 100,
    height: '90%',
  },
  boxitems: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '65%',
    height: '55%',
  },
  icons: {
    width: '100%',
    // height: '80%',
    // flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companylogo: {
    width: 70,
    height: 50,
  },
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  boxdata: {
    flexDirection: 'row',
    backgroundColor: '#f8fcf7',
    height: 150,
    // width: Dimensions.get('window').width,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
