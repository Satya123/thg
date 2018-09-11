import React, { Component } from 'react';
import { Text, View, Alert,ImageBackground, ActivityIndicator } from 'react-native';
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
            loaded: false,
          };
    }

componentWillMount() {
  Alert.alert('componentWillMountCall');
}

    componentDidMount() {
      Alert.alert('componentDidMountCall');
      UserData.retriveData('token').then((resToken) => {
        UserData.retriveData('memberId').then((res) => {
            this.getDependant(resToken, res);
            });
      })

  }


        getDependant = (token, memberID) => {

            console.log(token);
              this.setState({ loaded: true });
                ServiceClass.appDetails(token, `dependents/${ memberID}`).then((reData) => {

                  if (reData.data.status === '1') {
                    console.log(reData.data.data);
                    this.setState({ dataArray: reData.data.data });
                    this.setState({ loaded: false });
                  }
                  else {
                      this.setState({ loaded: false });
                    Alert.alert(reData.data.message);
                  }

                }).catch((error) => {
                    //console.log(error);
                    Alert.alert(error);
                });
      }

    render() {
      const {
        dataArray,
        loaded
      } = this.state;
      console.log(dataArray);
      return (
           <View style={styles.MainContainer}>

          <View style={{ height: '70%', width: '100%'}}>

          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '95%', width: '100%' }}>
            <View style={{ margin: 10, width: '95%' }}>

            <DependentSubData arrayDescription={dataArray} />
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
              {
                (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
              }
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
   containerActivety: {

       backgroundColor: 'transparent',
       height: '100%',
       width: '100%',
       zIndex: 10000000,
       position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
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
