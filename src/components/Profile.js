import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import CustomFooter from './CustomFooter';
import UserData from './UserData';
import AccountSubCard from './AccountSubCard';


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
          };
    }
    componentDidMount() {
        this.setData();
  }

  setData() {
    var dict = {};
    var dict1 = {};
      var dict2 = {};
    console.log('ProfileDidMountcall');
    console.log(this.props.dataArray[0]);
    dict.left = 'ID';
    dict.right = this.props.dataArray[0].ID;

    this.state.arrData.push(dict);
    dict1.left = 'Name';
    dict1.right = this.props.dataArray[0].name;
    this.state.arrData.push(dict1);
    dict2.left = 'MemberNo';
    dict2.right = this.props.dataArray[0].memberNo;
    this.state.arrData.push(dict2);

    console.log('wiout join');
    console.log(this.state.arrData);
  }

    render() {
      const{
        dataArray
      } = this.props;
      return (

        <View style={styles.MainContainer}>

          <View style={{ height: '100%', width: '100%' }}>

          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >

            <View style={{ margin: 10, backgroundColor: '#ffffff', width: '95%' }}>
            <AccountSubCard arrayDescription={dataArray} />
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
       backgroundColor: 'transparent'
   },
   footerView: {

     height: 40,
      marginBottom: 0,
      paddingBottom: 0,
      width: '100%',
      backgroundColor: 'red',

   },
   imgBackground: {
           width: '100%',
           height: '100%',


   },
};


    export default Profile;
