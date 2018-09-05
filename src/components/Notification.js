import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CustomFooter from './CustomFooter';
class Notification extends Component {

  constructor(props) {
      super(props);
      this.state = {

              isProfile: false,
              isHome: false,
              isMenu: false,
              isNotification: true,
            };
    }

    render() {
      return (
        <View >

              <Text>Notification Call</Text>
              <CustomFooter
              isProfile={this.state.isProfile}
              isHome={this.state.isHome}
              isMenu={this.state.isMenu}
              isNotification={this.state.isNotification}
              />
              </View>


      );
    }


}


    export default Notification;
