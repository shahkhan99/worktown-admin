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
class ComplainCompany extends Component { 
  constructor(props) {
    super(props);
    this.fetchComplains = this.fetchComplains.bind(this);
  }
  state = {complains: [], loader: true,companies:[]};

 

  fetchComplains = () => {
 const {complains}=this.props;
    let unique = [...new Set(complains.complains.map(item => item.userCompany))];
      this.setState({companies:unique,loader: false});
   
  };
  componentDidMount() {
    this.fetchComplains();
  }

  render() {
    console.log(this.props.complains.complains)
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
                 
                  <Text
                    style={{fontWeight: '700', fontSize: 18, lineHeight: 18}}>
                    Complain Portal
                  </Text>
                </View>
              </View>

             
            </View>
            
            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={styles.listScroll}
              showsVerticalScrollIndicator={false}>
              
                <View
                  style={{alignItems: 'center', height: '100%', width: '96%'}}>
                  {this.state.companies.map((com, i) => {
                    return (
                      <TouchableOpacity style={styles.complainTouch} onPress={()=>this.props.navigation.navigate('Complain',{listName:com})}>
                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              color: '#000',
                              fontSize: 16,
                            }}>
                           {com}
                          </Text>
                          
                        </View>
                        <View>
                        <AntDesign name="right" color={'black'} size={28} />

                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 50,
    width: '100%',
    marginVertical: 5,
    // padding: 20,
    paddingHorizontal:8,
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

export default connect(mapStateToProps)(ComplainCompany);
