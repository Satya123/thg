import React, { Component } from 'react';
import { Text, View, ImageBackground, Platform, TouchableOpacity,Alert } from 'react-native';
import CustomFooter from './CustomFooter';
import UserData from './UserData';
import AccountSubCard from './AccountSubCard';
import CustomHeader from './CustomHeader';
import { Actions } from 'react-native-router-flux';
import Router from './Router';



class Profile extends Component {

  constructor(props) {
      super(props);
      this.state = {
            isProfile: true,
            isHome: false,
            isMenu: false,
            isNotification: false,
            isAccountInfo: this.props.isAccountInfo,
            arrData: [],
            isLogOut: false
          };
    }
    componentDidMount() {

      console.log(this.props.dataArray);
  }

  clickToLogOut = () => {

      UserData.saveData('token', '');
      this.setState({ isLogOut: true });
      Actions.RouterComponent();

  }

    render() {
      const{
        dataArray,
        isLogOut
      } = this.props;
      return (
        <View style={styles.MainContainer}>


        <ImageBackground
          style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../assets/backgroundBlue.png')} >
          <View style={{ height: '95%', width: '100%' }}>
          <View style={{ margin: 10, backgroundColor: '#ffffff' }}>
          <AccountSubCard arrayDescription={dataArray} />
          </View>


          <TouchableOpacity
          onPress={this.clickToLogOut}>
          <View style={{margin:10, backgroundColor:'white', height:50, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color:'red',textAlign:'center'}}>Log out</Text>
          </View>

          </TouchableOpacity>

          </View>





          </ImageBackground>



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



   },
   footerView: {
     width: '100%',
      height: 45,


      position: 'absolute',
      bottom: 0

   },
   imgBackground: {
           width: '100%',
           height: '100%',


   },
   textStyle:{

      color: '#fff',
      fontSize:22
    }
};


    export default Profile;
