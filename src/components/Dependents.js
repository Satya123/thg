import React, { Component } from 'react';
import { Text, View, Alert,ImageBackground } from 'react-native';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import CustomHeader from './CustomHeader';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import DependentSubData from './DependentSubData';

class Dependents extends Component {

  constructor(props) {
      super(props);
        this.state = {
            isProfile: false,
            isDependents: true,
            dataArray:[],
            isPolicies: false,

          };
    }

    componentDidMount() {
      UserData.retriveData('token').then((res) => {

   // Alert.alert(res);
       //   console.log(res);
          this.getDependant(res, '82503220');






      });
  }


        getDependant = (token, memberID) => {
          //  debugger;
            console.log(token);
              this.setState({ loaded: true });
                ServiceClass.appDetails(token, `dependents/${ memberID}`).then((reData) => {
                 // debugger;
               //  Alert.alert(reData);
                 // Alert.alert(reData.data.status);
                  //console.log(reData.status);
                  console.log(reData.data.status);
                  if (reData.data.status === '1') {
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
       const SampleNameArray = [
{ 'name': 'Michal',
'gender': 'Male',
'birthdate': '12/Jan/2017',
'relationship': 'self',
'Network': 'Idea',
},
{ 'name': 'Dolly',
'gender': 'female',
'birthdate': '12/Jun/2018',
'relationship': 'emp',
'Network': 'Airtel',
},
{ 'name': 'Scott',
'gender': 'Male',
'birthdate': '13/May/2019',
'relationship': 'self',
'Network': 'Airtel',
},
{ 'name': 'Michal',
'gender': 'Active',
'birthdate': '12/July/2017',
'relationship': 'self',
'Network': 'Airtel',
},
{ 'name': 'Michal',
'gender': 'Active',
'birthdate': '12/Aug/2017',
'relationship': 'self',
'Network': 'Airtel',
} ];
       const{
        dataArray
      } = this.props;

      return (
           <View style={styles.MainContainer}>

          <View style={{ height: '70%', width: '100%'}}>

          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '95%', width: '100%' }}>
            <View style={{ margin: 10, width: '95%' }}>
            <DependentSubData arrayDescription={SampleNameArray} />
            </View>
            </View>
            <View style={styles.footerView}>
                    <CustomFooter
                    isProfile={this.state.isProfile}
                    isHome={this.state.isHome}
                    isMenu={this.state.isMenu}
                    isNotification={this.state.isNotification}
                    />
              </View>

            </ImageBackground>


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

       //marginTop: 10,
      //backgroundColor: 'yellow'
   },
   footerView: {
     height: 50,
      marginBottom: 0,
      padding: 0,
      width: '100%',
     // backgroundColor: 'red'

   },
   imgBackground: {
      height: '100%',
      width: '100%',
     }
};


    export default Dependents;
