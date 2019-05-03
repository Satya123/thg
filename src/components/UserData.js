import React from 'react';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { AsyncStorage } from 'react-native';


export default class UserData extends React.Component {
  static retriveData = (key) => RNSecureKeyStore.get(key)

  static saveData = (key, value) => {
    RNSecureKeyStore.set(key, value)
    .then((res) => {
        //console.log(res);
    }, (err) => {
        //console.log(err);
    });
  }
//token,memberId
  static removeKey =  async () => {
    RNSecureKeyStore.remove("token")
	.then((res) => {
		//console.log(res);
	}, (err) => {
		//console.log(err);
	});

  RNSecureKeyStore.remove("memberId")
	.then((res) => {
		//console.log(res);
	}, (err) => {
		//console.log(err);
	});
  await AsyncStorage.removeItem("isTelemedicineEnable");
  await AsyncStorage.removeItem("AppointmentType");
  await AsyncStorage.removeItem("profileArray");

  }

}
