import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import CustomHeader from './CustomHeader';
import UserData from './UserData';
import ServiceClass from './ServiceClass';

class Dependents extends Component {

  constructor(props) {
      super(props);
        this.state = {
            isProfile: false,
            isDependents: true,

            isPolicies: false,

          };
    }

    componentDidMount() {
      UserData.retriveData('token').then((res) => {
          console.log(res);

          this.getDependant(res, '82503220');
      });
  }


        getDependant = (token, memberID) => {
          //  debugger;
            console.log(token);
              this.setState({ loaded: true });
                ServiceClass.appDetails(token, `dependents/${ memberID}`).then((reData) => {
                  debugger;
                  console.log(reData);
                  //console.log(reData.status);
                  console.log(reData.data.status);
                  if (reData.data.status === 1) {
                    console.log(reData.data.data);
                    this.setState({ dataUser: reData.data.data.users });


                  } else {
                      this.setState({ loaded: false });
                    Alert.alert(reData.data.message);
                  }

                }).catch((error) => {
                    //console.log(error);
                    Alert.alert(error);
                });
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
