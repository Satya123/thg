import React from 'react';

import axios from 'axios';

const baseUrl = 'https://appdev.transparenthealth.co/api/';


export default class ServiceClass extends React.Component {

    static loginData = (member, dateOfBirth, lastUrl) => {
      return axios.post(baseUrl + lastUrl, {
            memberID: member,
            birthDate: dateOfBirth
          });
      }

      static appDetails = (token, lastUrl) => {
        return axios.get(baseUrl + lastUrl, {
                headers: { Token: token }
            });
        }

}
