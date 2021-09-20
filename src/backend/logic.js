import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import firebase from './config';
import Toast from 'react-native-simple-toast';
import {AsyncStorage} from 'react-native';

export var uid = null;
export var email = null;

// const randomName = require('uuid/v4');

// const UploadImage = async ({Files, name}) => {
//   return new Promise(async (resolve, reject) => {
//     let Task = [];
//     let allImages = [];
//     let imgName = ['profileImage', 'businessImage'];

//     for (let i = 0; i < Files.length; i++) {
//     //   var responsee = await fetch(Files[i]);
//     //   var blob = await responsee.blob();
//       if (typeof blob === 'string') {
//         allImages.push(item);
//       } else {
//         Task.push(
//           new Promise((resolve, reject) => {
//             const fileName = imgName[i];
//             let folderName = `Users/${name}`;

//             //-------------------Create the file metadata---------------------------------------------
//             const metadata = {
//               contentType: 'image/png',
//             };

//             //-------------------Upload file and metadata to the object 'images/mountains.jpg'--------
//             const storageRef = firebase
//               .storage()
//               .ref(`${folderName}/` + fileName);
//             const uploadTask = storageRef.put(blob, metadata);

//             //-------------------Listen for state changes, errors, and completion of the upload-------
//             uploadTask.on(
//               'state_changed',
//               function (snapshot) {
//                 //-------------------Upload Progress------------------------------------------------------
//                 //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 //     console.log('Upload is '   progress   '% done');
//               },
//               function (error) {
//                 reject(error);
//               },
//               function () {
//                 //-------------------Upload completed successfully-----------------------------------------
//                 uploadTask.snapshot.ref.getDownloadURL().then(url => {
//                   allImages.push(url);
//                   resolve(url);
//                 });
//               },
//             );
//           }),
//         );
//       }
//     }
//     Promise.all(Task).then(() => resolve(allImages));
//   });
// };

// // ------------------------ Google SignIn -------------------

// export const googleConfig = async () => {
//   GoogleSignin.configure({
//     scopes: ['Email'], // what API you want to access on behalf of the user, default is email and F
//     webClientId:
//       '605722696383-lsf933h04r2psq5156vldrd01rqruct3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//     offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   });
// };

// export let googleSignIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const {idToken, accessToken} = await GoogleSignin.signIn();
//     // console.log(user);
//     const credential = firebase.auth.GoogleAuthProvider.credential(
//       idToken,
//       accessToken,
//     );
//     await firebase.auth().signInWithCredential(credential);
//   } catch (error) {
//     Toast.show(error.code, Toast.LONG);
//     console.log(error);
//   }
// };

// // ----------------------------- Manual Registration -------------------------------

export let handleLogin = async (email,password, ctx) => {
  //alert(data.email + ',' + data.password);
  // Toast.show(' state')
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re.test(String(email).toLowerCase());
  if (email == '' || password == '') {
    Toast.show('All Fields Are Required.', Toast.LONG);
  } else if (!re) {
    Toast.show('Invalid Email Address.', Toast.LONG);
  } else {
  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async success => {
       
        uid = success.user.uid;
        await AsyncStorage.setItem('uid', uid);

        Promise.all([
          Toast.show('Sign In Successful', Toast.LONG),
          ctx.navigate('Dashboard'),
        ])
      }).catch((error)=>{
        
        Toast.show(error.message, Toast.LONG);
        console.log(error.message);
      })}
      
};
export const getProfile = async () => {
  const uid = await AsyncStorage.getItem('uid');

  return new Promise((resolve, reject) => {
    console.log(uid);
    let arr = [];

    firebase
      .database()
      .ref(`admins/${uid}`)
      .on('value', (snapShot) => {
        resolve(snapShot.val());
      });
  });
};
// export const handleSignUp = (data, ctx, password, c_password) => {
//   if (
//     data.email == '' ||
//     data.password == '' ||
//     data.c_password == '' ||
//     data.name == '' ||
//     data.companyName == ''
//   ) {
//     Toast.show('All Fields Are Required.', Toast.LONG);
//   } else if (password !== c_password) {
//     Toast.show('Password Should be same.', Toast.LONG);
//   } else {
//     // Toast.show(firebase.auth().currentUser.uid)
//     let temp;
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(data.email, password)
//       .then(success => {
//         console.log('signupkkkk', data);
//         uid = success.user.uid;
//         email = success.user.email;
//         Promise.all([Toast.show('Created Account Successfully', Toast.LONG)])
//           .then(() => {
//             if (data.memberType === 'Owner') {
//               temp = 'approved';
//               data.approval = temp;
//               data.createdOn = new Date();
//               firebase.database().ref(`users/${uid}`).set(data);
//               firebase.database().ref(`companies/`).push({
//                 companyName: data.companyName,
//                 companyLogo: data.logos[1],
//                 active: true,
//               });
//             } else {
//               temp = 'disapproved';
//               data.approval = temp;
//               firebase.database().ref(`users/${uid}`).set(data);
//             }
//           })
//           .then(() => ctx.navigate('Login'));
//       })
//       .catch(error => Toast.show(error.message, Toast.LONG));
//   }
// };

export const getAllCompanies = () => {
  return new Promise((resolve, reject) => {
    let arr = [];
    let temp;
    firebase
      .database() 
      .ref('users/')
      .on('value', snapShot => {
        snapShot.forEach(e => {
          if (e.val().memberType == 'Owner') {
            temp = e.val();
            temp.uid = e.key;
            arr.push(temp);
          }
        });
      });
    resolve(arr);
  });

  //   const val = firebase
  //     .database()
  //     .ref('users')
  //     .once('value')
  //     .then(data => console.log(data));
  //   console.log(val);
  //   return val;
};
// ------------------------ Update Approval -------------------------

export const updateApproval = (state, uid, ctx) => {
  ctx.setState({visLoad: true});
  firebase
    .database()
    .ref(`users/${uid}`)
    .update({approval: state})
    .then(() => {
      Toast.show('User Has been ' + state);

      ctx.setState({visLoad: false});
      // ctx.props.navigation.navigate('ApproveAndReject');
    });
};
// export const signOutHandler = async () => {
//   await AsyncStorage.clear();
//   // firebase
//   //   .auth()
//   //   .signOut()
//   //   .then(async () => await AsyncStorage.clear());
//   // // .then(() => navigation.navigate('Root'));
// };

// // ------------------------- Auth Check ------------------------------------
// export const authCheck = ctx => {
//   firebase.auth().onAuthStateChanged(user => {
//     user
//       ? ctx.setState({checkUser: user, uid: user.uid})
//       : ctx.setState({checkUser: null, uid: null});
//     console.log(user);
//   });
// };

// // ------------------------- Community chat --------------------------------

// export const sendCommunityMessage = message => {
//   firebase
//     .database()
//     .ref(`communityChats/${firebase.auth().currentUser.uid}/`)
//     .set(message);
// };
// ------------------------- Community chat --------------------------------

export const sendCommunityMessage = (message) => {
  message.forEach((item) => {
    const messages = {
      pin:'-',
      text: item.text,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: item.user,
    };
    const ref = firebase.database().ref('communityChats').push(messages);
    const key = ref.key;
    firebase.database().ref(`communityChats/${key}`).update({id: key});
  });
};

parse = (messages) => {
  const {user, text, timestamp} = messages.val();
  const {key: _id} = messages;
  const createdAt = new Date(timestamp);
  return {
    _id,
    createdAt,
    text,
    user,
  };
};
export const getCommunityMessages = (callback) => {
  firebase
    .database()
    .ref('communityChats')
    .on('child_added', (snapshot) => callback(parse(snapshot)));
};
export const offRef = () => {
  firebase.database().ref('communityChats').off();
};
// // -------------------- Meeting Functions ---------------------------------

parseTime = (s) => {
  var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
  var hh = parseInt(part[1], 10);
  var mm = parseInt(part[2], 10);
  var ap = part[3] ? part[3].toUpperCase() : null;
  if (ap === 'AM') {
    if (hh == 12) {
      hh = 0;
    }
  }
  if (ap === 'PM') {
    if (hh != 12) {
      hh += 12;
    }
  }
  const time = hh + ':' + mm + ':' + '00';
  return time;
};
export const setMeetingSlot = (slot, ctx) => {
  return new Promise((resolve, reject) => {
    const {location, roomNumber, date, startTime, endTime} = slot;

    if (!location || !roomNumber || !date || !startTime || !endTime) {
      Toast.show('All field are required', Toast.SHORT);
    } else if (date || startTime || endTime) {
      let sTime = new Date(date + ' ' + parseTime(startTime)).getTime();
      let eTime = new Date(date + ' ' + parseTime(endTime)).getTime();
      let diff = sTime - eTime;
      if (startTime == endTime) {
        Toast.show('Start Time should be differ from End Time', Toast.LONG);
      } else if (sTime > eTime) {
        Toast.show(
          'End Time should be select after the Start Time',
          Toast.LONG,
        );
      } 
      else {
       
              firebase
                .database()
                .ref(`allMeetings/${new Date(date)}`)
                .push(slot)
                .then((success) => {
                  ctx.setState({fabHide: true});
                  ctx.onOpenBottomSheetHandler(2);
                  Toast.show('Your meeting has been book');
                })
                .catch((e) => Toast.show('Some Thing Went Wrong', e));
            
    
      }
    }
  });
};

export const getAllMeetings = () => {
  return new Promise((resolve, reject) => {
    let arr = [];
    let key = [];
    firebase
      .database()
      .ref('allMeetings/')
      .orderByKey()
      .on('value', (snapShot) => {
        resolve(snapShot.val());

        // arr.push(snapShot.val());
      });
    // console.log(arr, key, 'adsjfj');
  });
};



// // ------------------------------ Profile Functios ----------------------------


export const getProfileuser = async () => {
  const uid = await AsyncStorage.getItem('uid');

  return new Promise((resolve, reject) => {
    console.log(uid);
    let arr = [];

    firebase
      .database()
      .ref(`admins/${uid}`)
      .on('value', (snapShot) => {
        resolve(snapShot.val());
      });
  });
};
// export const getProfile = async () => {
//   const uid = await AsyncStorage.getItem('uid');

//   return new Promise((resolve, reject) => {
//     console.log(uid);
//     let arr = [];

//     firebase
//       .database()
//       .ref(`users/${uid}`)
//       .on('value', snapShot => {
//         resolve(snapShot.val());
//       });
//   });
// };

// export const editProfile = async (data, ctx) => {
//   const uid = await AsyncStorage.getItem('uid');
//   // console.log(data);
//   // ctx.navigate('Loader');
//   if (
//     data.bio == '' ||
//     data.designation == '-' ||
//     data.dateOfBirth == '-' ||
//     data.memberSince == '-' ||
//     data.logos[0] == '-' ||
//     data.logos[1] == '-' ||
//     data.companyName == '' ||
//     data.logos.displayImage == '-' ||
//     data.tag[0] == '-' ||
//     data.name == '' ||
//     data.email == '' ||
//     data.companyURL == '-'
//   ) {
//     Toast.show('All Fields are Required');
//   } else {
//     ctx.navigate('Loader');
//     UploadImage({Files: data.logos, name: data.email}).then(ImgURLs => {
//       if (data.memberType == 'Owner') {
//         firebase
//           .database()
//           .ref(`users/`)
//           .once('value', snapshot => {
//             snapshot.forEach(e => {
//               console.log('keyyyy', e.key);
//               console.log('e vall', e.val().companyName);
//               firebase
//                 .database()
//                 .ref(`users/${uid}`)
//                 .once('value', val => {
//                   console.log('vall', val.val().companyName);
//                   if (val.val().companyName == e.val().companyName) {
//                     firebase.database().ref(`users/${e.key}`).update({
//                       companyName: data.companyName,
//                     });
//                     firebase
//                       .database()
//                       .ref(`users/${e.key}/logos/`)
//                       .update({1: ImgURLs[1]});
//                   }
//                 });
//             });
//           });
//       }

//       data.logos = ImgURLs;
//       firebase
//         .database()
//         .ref(`users/${uid}`)
//         .update(data)
//         // .then(() => {
//         //   if (data.memberType == 'Owner') {
//         //     firebase
//         //       .database()
//         //       .ref(`users/${uid}`)
//         //       .once('value')
//         //       .then((snapshot) => {
//         //         firebase
//         //           .database()
//         //           .ref('companies')
//         //           .once('value', (snap) => {
//         //             snap.forEach((val) => {
//         //               if (snapshot.val().companyName == val.val().companyName) {
//         //                 firebase.database().ref(`companies/${val.key}`).update({
//         //                   companyLogo: ImgURLs[1],
//         //                   companyName: data.companyName,
//         //                 });
//         //               }
//         //             });
//         //           });
//         //       });
//         //   }
//         // })
//         .then(() => {
//           ctx.navigate('Profile');
//         });
//     });
//   }
// };
export const setComplain = async (complain) => {
  const uid = await AsyncStorage.getItem('uid');
  const id = getRandomString(7);
  return new Promise((resolve, reject) => {
    if (complain.complainImage == '-') {
      complain.createdOn = firebase.database.ServerValue.TIMESTAMP;
      complain.id = id;
      const ref = firebase.database().ref(`allComplain/${uid}`).push(complain);
      const key = ref.key;
      firebase.database().ref(`allComplain/${uid}/${key}`).update({key: key});
      resolve(ref);
    } else {
      complain.createdOn = firebase.database.ServerValue.TIMESTAMP;
      const imgArr = [];
      complain.id = id;
      imgArr.push(complain.complainImage);
      console.log(imgArr);
      UploadComplainImage({
        Files: imgArr,
        name: uid,
      }).then((ImgURLs) => {
        complain.complainImage = ImgURLs;
        const ref = firebase
          .database()
          .ref(`allComplain/${uid}`)
          .push(complain);
        const key = ref.key;
        firebase.database().ref(`allComplain/${uid}/${key}`).update({key: key});
        resolve(key);
      });
    }
  });
};
export const getComplain = async () => {
  const uid = await AsyncStorage.getItem('uid');

  return new Promise((resolve, reject) => {
    let arr = [];
    firebase
      .database()
      .ref(`allComplain/`)
      .orderByChild('createdOn')
      .on('value', (snapShot) => {
          snapShot.forEach((c) => {
          c.forEach((co)=>{   
            arr.push(co.val());
          }
)
          });
        
      });
    // console.log(arr);
    arr.reverse();
    resolve(arr);
  });
};

export const complainReply=(rep,ctx)=>{
  console.log(rep.ticketID);
if(rep.reply=='' || rep.reply=='-'){
  Toast.show('All field are reduired')
}
else{
  let time=new Date()
    firebase
      .database()
      .ref(`allComplain/`)
      .orderByChild('createdOn')
      .once('value', (snapShot) => {
          snapShot.forEach((c) => {
          c.forEach((co)=>{   
            if(co.val().key==rep.ticketID)
            {
              firebase.database().ref(`allComplain/${c.key}/${rep.ticketID}/adminReply`).update({reply:rep.reply,complainStatus:rep.titleLable,replyOn:time}).then(()=>
              {
                ctx.setState({spiner:false,visible:false,titleLable:''})
                ctx.props.navigation.navigate('Complain')
                ctx.props.route.params.getComplain()
              })
            }
          }
)
          });
        
      });}
   
}