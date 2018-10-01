import React, { Component } from 'react';
import { Text, View, ImageBackground, Platform } from 'react-native';
import CustomFooter from './CustomFooter';
import UserData from './UserData';
import AccountSubCard from './AccountSubCard';
import CustomHeader from './CustomHeader';

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
      //console.log(this.props.dataArray);
  }



    render() {
      const{
        dataArray
      } = this.props;
      return (

        <View style = { styles.MainContainer }>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'AccountInfo'}

              />
        </View>

               <Text> This is Main Container View. </Text>


               <View style={ styles.footerView} >

                  <Text style={styles.textStyle}>This is Bottom View.</Text>

               </View>

            </View>





      );
    }


}

const styles = {
  MainContainer:
   {
     flex: 1,

      backgroundColor: 'red',
      paddingTop: ( Platform.OS === 'ios') ? 20 : 0
   },
   footerView: {
     width: '100%',
          height: 50,
          backgroundColor: '#0f0',
          justifyContent: 'center',
          alignItems: 'center',
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
