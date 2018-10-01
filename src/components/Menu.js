import React, { Component } from 'react';
import { Text, View ,ImageBackground, AsyncStorage} from 'react-native';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';

class Menu extends Component {

  constructor(props) {
      super(props);
      this.state = {
          arrayValue: [],
              isProfile: false,
              isHome: false,
              isMenu: true,
              isNotification: false,
            };
    }


    componentWillMount() {
      //console.log('componentWillMount call Telemedicine');


    AsyncStorage.getItem('profileArray')
    .then((contacts) => {
    const value = contacts ? JSON.parse(contacts) : [];

    //console.log(value);
    this.setState({ arrayValue: value })
  });

    }

    render() {
      const{
        arrayValue
      } = this.state
      return (
        <View style={styles.MainContainer}>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'Menu'}

              />
        </View>

        <ImageBackground
          style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../assets/backgroundBlue.png')} >
          <View style={{ height: '95%', width: '100%' }}>
          <View style={{ margin: 10, backgroundColor: '#ffffff' }}>

          </View>




          </View>





          </ImageBackground>



          <View style={styles.footerView}>
                  <CustomFooter
                  isProfile={this.state.isProfile}
                  isHome={this.state.isHome}
                  isMenu={this.state.isMenu}
                  isNotification={this.state.isNotification}
                    profileData={arrayValue}
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


    export default Menu;
