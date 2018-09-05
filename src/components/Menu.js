import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CustomFooter from './CustomFooter';

class Menu extends Component {

  constructor(props) {
      super(props);
      this.state = {

              isProfile: false,
              isHome: false,
              isMenu: true,
              isNotification: false,
            };
    }

    render() {
      return (
        <View >

              <Text>Menu Call</Text>
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


    export default Menu;
