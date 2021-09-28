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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Moment from 'moment';
import {getComplain} from '../../backend/logic';
import Loader from '../../components/Loader/loader';
import {connect} from 'react-redux'
class Complain extends Component { 
  constructor(props) {
    super(props);
    this.fetchComplains = this.fetchComplains.bind(this);
  }
  state = {visModal: false, complains: [], loader: true};
  fetchComplains = () => {
    const { complains } = this.props;
 
      this.setState({complains: complains.complains, loader: false});
   
  };
  componentDidMount() {
    this.fetchComplains();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchComplains();
        });
  }
  componentWillUnmount() {
    this.focusListener;
  }
  render() {
    const {listName} = this.props.route.params;

    return (
      <View style={styles.container}>
        {this.state.loader ? (
          <Loader />
        ) : (
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.left}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}>
                    <AntDesign name="arrowleft" color={'black'} size={28} />
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{color: 'grey', fontSize: 15, lineHeight: 17}}>
                    {listName}
                  </Text>
                  <Text
                    style={{fontWeight: '700', fontSize: 18, lineHeight: 18}}>
                    Complains
                  </Text>
                </View>
              </View>

              <View>
                <Image
                  source={require('./assets/images/logo.png')}
                  style={styles.dp}
                />
              </View>
            </View>
            <View style={styles.ticket}>
              <Text style={{fontWeight: '700', fontSize: 22}}>My Tickets</Text>
            </View>
            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={styles.listScroll}
              showsVerticalScrollIndicator={false}>
              {this.state.complains.length == 0 ? (
                <View>
                  <Text>There is no ticket available</Text>
                </View>
              ) : (
                <View
                  style={{alignItems: 'center', height: '100%', width: '96%'}}>
                  {this.state.complains.map((com, i) => {
                    if(com.userCompany===listName){
                    return (
                      <View style={styles.complainTouch}>
                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              color: '#6B3590',
                              fontSize: 16,
                            }}>
                            Ticket ID: {com.id}
                          </Text>
                          <Text>Issue: {com.titleLable}</Text>
                          <Text>
                            Created On:{' '}
                            {Moment(new Date(com.createdOn)).format(
                              'DD-MMMM-YYYY',
                            )}
                          </Text>
                          <Text>
                            Time:{' '}
                            {Moment(new Date(com.createdOn)).format('hh:mm a')}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '30%',
                            height: '100%',
                            justifyContent: 'space-around',
                          }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#FFF9FF',
                              height: 30,
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: '#6B3590',
                              borderRadius: 10,
                              borderWidth: 1,
                            }}>
                            <Text style={{fontWeight: '500'}}>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#FFF9FF',
                              height: 30,
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: '#6B3590',
                              borderRadius: 10,
                              borderWidth: 1,
                            }}>
                            <Text
                              style={{fontWeight: '500'}}
                              onPress={() => {
                                this.props.navigation.navigate('viewDetails', {
                                  com: com,cotX:this
                                });
                              }}>
                              View Details
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );}
                  })}
                </View>
              )}
            </ScrollView>
                     </SafeAreaView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    // height:Dimensions.get('window').height
  },
  dp: {height: 45, width: 45, borderRadius: 8},
  header: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticket: {width: '100%', height: 30, paddingHorizontal: 10},
  listScroll: {width: '100%'},
  createBtnView: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtn: {
    width: 120,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#6B3590',
    alignItems: 'center',
    justifyContent: 'center',
  },
  complainTouch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 120,
    width: '100%',
    marginVertical: 5,
    padding: 20,
    elevation: 5,
    borderRadius: 7,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
});

const mapStateToProps = (state) => ({
 
  complains: state.complains,
});

export default connect(mapStateToProps)(Complain);
