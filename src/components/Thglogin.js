import React, { Component } from 'react';
import { View } from 'react-native';
//import axios from 'axios';
import 'isomorphic-fetch';

class Thglogin extends Component {

  constructor() {
    super();
    this.state = {
         memberId: '',
         dateOfBirth: '',
    };
  }
componentWillMount() {


}

  // componentWillMount() {
  // fetch('http://appdev.transparenthealth.co/api/login', {
  //  method: 'POST',
  //  headers: {
  //    'Accept': 'application/json',
  //    'Content-Type': 'application/json',
  //  },
  //  body: JSON.stringify({
  //    memberID: '82503220',
  //    birthDate: '07/01/1997'
  //
  //  })
  //
  // }).then((response) => response.json())
  //      .then((responseJson) => {
  //
  //        // If server response message same as Data Matched
  //
  //      }).catch((error) => {
  //        console.error(error);
  //      });
  //
  //
  //  }


  // componentWillMount() {
  //   con
  //       memberID: '82503220',
  //       birthDate: '07/01/1997'
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }


  render() {
      return (
        <View style={{ backgroundColor: 'blue' }} />

      );
  }

}

export default Thglogin;
