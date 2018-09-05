import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import CustomHeader from './CustomHeader';


class Dependents extends Component {

  constructor(props) {
      super(props);
        this.state = {
            isProfile: false,
            isDependents: true,

            isPolicies: false,

          };
    }

    render() {
      return (
        <View>


        <View style={styles.MainContainer}>
          <View><Text>Dependents Call</Text></View>
          <View style={styles.footerView}>
                  <CustomFooter
                  isProfile={this.state.isProfile}
                  isHome={this.state.isHome}
                  isMenu={this.state.isMenu}
                  isNotification={this.state.isNotification}
                  />
            </View>
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

       marginTop: 10,
      backgroundColor: 'yellow'
   },
   footerView: {
     height: 40,
      marginBottom: 0,
      padding: 0,
      width: '100%',
      backgroundColor: 'red'

   }
};


    export default Dependents;
