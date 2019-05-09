/*@ ServiceClass.js
  THG App
  This file use for  Web Api accses  .
  Created by Pulkit Arora
@*/


import React from 'react';
import axios from 'axios';
const baseUrl = 'https://appdev.transparenthealth.co/api/';
//const baseUrl = 'https://appdev-dev.transparenthealth.co/api/';

export default class ServiceClass extends React.Component {
/*
  @loginData: This static function use for get login response.
  @member: memberId use for user_name.
  @dateOfBirth: User password.
  @deviceToken: Current device id.
  @lastUrl: Subpath of Api.
*/

static loginData = (member, dateOfBirth, deviceToken, lastUrl) => {
//console.log(baseUrl + lastUrl);
//console.log(deviceToken);
        return axios.post(baseUrl + lastUrl, {
            memberID: member,
            birthDate: dateOfBirth,
            deviceToken: deviceToken,
            os: '1'
        });
    }
    /*
      @appDetails: This static function use for genrice Api response.
      @token: This token is get from login.
      @lastUrl: Subpath of Api.
    */

    static appDetails = (token, lastUrl) => {
    //  debugger;
      //console.log(baseUrl + lastUrl);
        return axios.get(baseUrl + lastUrl, {
            headers: {Token: token}
        });
    }
    /*
      @appDetails: This static function use  genrice Api response for delete method.
      @token: This token is get from login.
      @lastUrl: Subpath of Api.
    */
    static deleteDetails = (token, lastUrl) => {

        return axios.delete(baseUrl + lastUrl, {
            headers: {Token: token}
        });
    }
    /*
      @requestAppointment: This static function use for set Appointment.
      @token: This token is get from login.
      @lastUrl: Subpath of Api.
      @appointmentType: Type of Appointment.
      @visitReason: Reason of vist to Doctor.
      @appointmentSchedule: AppointmentSchedule is an Object type data which contains TimeZone,Date,Time.
      @schedulingNote: This Param contains Additional Information for Appointment.
      @providerOption: This Param use for set provider type.
      @providerName: Selected Provider Name.
      @providerPhone: Selected provider Phone Number.
      @providerAddress: Selected provider Address.
      @dependentID: Selected Patient Id .

    */


    static requestAppointment = (token,lastUrl,appointmentType, visitReason, appointmentSchedule, schedulingNote,providerOption,providerName,providerPhone,providerAddress,dependentID) => {

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
//debugger;
// //console.log(baseUrl + lastUrl);
// //console.log(postData);
// //console.log(axiosConfig);


          return axios.post(baseUrl + lastUrl, postData,axiosConfig);
      }

      /*
        @updateAppointment: This static function use for Update Appointment.
        @token: This token is get from login.
        @lastUrl: Subpath of Api.
        @appointmentType: Type of Appointment.
        @visitReason: Reason of vist to Doctor.
        @appointmentSchedule: AppointmentSchedule is an Object type data which contains TimeZone,Date,Time.
        @schedulingNote: This Param contains Additional Information for Appointment.
        @providerOption: This Param use for set provider type.
        @providerName: Selected Provider Name.
        @providerPhone: Selected provider Phone Number.
        @providerAddress: Selected provider Address.
        @dependentID: Selected Patient Id .

      */



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
debugger;
  //console.log(baseUrl + lastUrl);
  //console.log(postData);
  //console.log(axiosConfig);


            return axios.put(baseUrl + lastUrl, postData,axiosConfig);
        }
}
