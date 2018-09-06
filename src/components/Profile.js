import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CustomFooter from './CustomFooter';

class Profile extends Component {

  constructor(props) {
      super(props);
        this.state = {
            isProfile: true,
            isHome: false,
            isMenu: false,
            isNotification: false,
            isAccountInfo: this.props.isAccountInfo,
          };
    }

    render() {
      return (

        <View style={styles.MainContainer}>
          <View><Text>Profile Call</Text></View>
          <View style={{ height:'62.5%' }} />

          <View style={styles.footerView}>
                  <CustomFooter
                  isProfile={this.state.isProfile}
                  isHome={this.state.isHome}
                  isMenu={this.state.isMenu}
                  isNotification={this.state.isNotification}
                  />
            </View>
      </View>


      );
    }


}

const styles = {
  MainContainer:
   {
       flex: 1,
       alignItems: 'center',
       backgroundColor: 'yellow'
   },
   footerView: {

     height: 40,
      marginBottom: 0,
      padding: 0,
      width: '100%',
      backgroundColor: 'red',

   }
};


    export default Profile;
