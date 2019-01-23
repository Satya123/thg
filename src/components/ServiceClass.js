import React from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
const baseUrl = 'http://appdev.transparenthealth.co/api/';
//52.5.103.12
export default class ServiceClass extends React.Component {
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({isConnected});
        } else {
            this.setState({isConnected});
        }
    }
    ;
  static loginData = (member, dateOfBirth, deviceToken, lastUrl) => {

        return axios.post(baseUrl + lastUrl, {
            memberID: member,
            birthDate: dateOfBirth,
            deviceToken: deviceToken,
            os: '1'
        });
    }

    static appDetails = (token, lastUrl) => {

        return axios.get(baseUrl + lastUrl, {
            headers: {Token: token}
        });
    }
    static deleteDetails = (token, lastUrl) => {

        return axios.delete(baseUrl + lastUrl, {
            headers: {Token: token}
        });
    }

    static requestAppointment = (token,lastUrl,appointmentType, visitReason, appointmentSchedule, schedulingNote,providerOption,providerName,providerPhone,providerAddress,dependentID) => {




      let axiosConfig = {
        headers: {
            //'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            // mode:'cors',
            'Token': token
        }
      };

      var postData = {
        appointmentType: appointmentType,
        visitReason: visitReason,
        appointmentSchedule: appointmentSchedule,
        schedulingNote:schedulingNote,
        providerOption:providerOption,
        providerName: providerName,
        providerPhone:providerPhone,
        providerAddress: providerAddress,
        dependentID:dependentID,
};
//debugger;
//console.log(baseUrl + lastUrl);
//console.log(postData);
//console.log(axiosConfig);


          return axios.post(baseUrl + lastUrl, postData,axiosConfig);
      }


    static updateAppointment = (token,lastUrl,appointmentType, visitReason, appointmentSchedule, schedulingNote,providerOption,providerName,providerPhone,providerAddress,dependentID) => {




        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json',
              'Token': token
          }
        };

        var postData = {
          appointmentType: appointmentType,
          visitReason: visitReason,
          appointmentSchedule: appointmentSchedule,
          schedulingNote:schedulingNote,
          providerOption:providerOption,
          providerName: providerName,
          providerPhone:providerPhone,
          providerAddress: providerAddress,
          dependentID:dependentID,
  };

//  console.log(baseUrl + lastUrl);
//  console.log(postData);
//  console.log(axiosConfig);


            return axios.put(baseUrl + lastUrl, postData,axiosConfig);
        }
}
