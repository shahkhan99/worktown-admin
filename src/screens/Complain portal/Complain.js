import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  Alert,
  Pressable,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Complain extends Component {
  state = {
    isModalVisible: false,
    complaint: [
      {
        title: 'internet issue',
        message1:
          'afsfsakgasmlslgka;lgadg;la;glad;gld;akgangdanjdgngnjadngladnklgdamkadg',
      },
      {
        title: 'internet issue',
        message2:
          'afsfsakgasmlslgka;lgadg;la;glad;gld;akgangdanjdgngnjadngladnklgdamkadg',
      },
      {
        title: 'internet issue',
        message3:
          'afsfsakgasmlslgka;lgadg;la;glad;gld;akgangdanjdgngnjadngladnklgdamkadg',
      },
      {
        title: 'internet issue',
        message4:
          'afsfsakgasmlslgka;lgadg;la;glad;gld;akgangdanjdgngnjadngladnklgdamkadg',
      },
    ],
  };
  toggleModal = () => {
    this.setState({isModalVisible: true});
  };

  render() {
    return (
      <View style={styles.container}>
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
            <Text style={styles.headertext}>Complaint Portal </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 10}}>
          {this.state.complaint.map((data, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.toggleModal();
                }}>
                <View style={styles.comView}>
                  <View style={styles.comtextview}>
                    <Text style={styles.comtext}> {data.title}</Text>
                  </View>
                  <View style={styles.statusarea}>
                    <View>
                      <Text> Status</Text>
                    </View>
                    <View>
                      <Text style={{color: 'green'}}>pending</Text>
                    </View>
                  </View>
                  {<View style={styles.centeredView}></View>}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Modal style={{backgroundColor:"white"}}
          isVisible={this.state.isModalVisible}
          // hideModalContentWhileAnimating={true}
          backdropTransitionOutTiming={200}
          onBackdropPress={() => this.setState({isModalVisible: false})}>
          <View style={{flex: 1}}>
            
            <Button title="Ticket#4" />
            <View style={styles.Viewdetails}>
               <Text style={styles.Complaintext}>COMPLAIN DETAIL : </Text>
            </View>
            {this.state.complaint.map((data,i)=>{
              return(
                <View>
                  
                  <Text>{data.message1}</Text>
                </View>
              )
            })}
            
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textview: {
    width: '90%',
  },
  headertext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // display: 'flex',
    // width: '70%',
  },
  backicon: {
    display: 'flex',
    width: '30%',
    // justifyContent: 'space-between',
  },

  header: {
    backgroundColor: '#ED393B',
    height: 50,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    alignItems: 'center',
    // justifyContent: 'space-between',
    flexDirection: 'row',
  },
  comView: {
    alignItems: 'center',
    textAlign: 'center',
    height: 80,
    width: '100%',
    backgroundColor: '#f7dcdc',
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  comtext: {
    fontSize: 20,
  },
  comtextview: {
    width: '70%',
  },
  statusarea: {
    // width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // width: '80%',
    // height: '80%',
    backgroundColor: 'transparent',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containermodal: {
    zIndex: 1,
    margin: 25,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
  },
  outerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, 
    justifyContent: 'center',
  },
  Viewdetails:{

    textAlign:"center",
    alignItems:"center",
   justifyContent:"center",
   display:"flex",
   height:50
  },
  Complaintext:{
    fontWeight:"bold"
  }
});
