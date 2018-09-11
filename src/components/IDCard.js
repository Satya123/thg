import React, { Component } from 'react';
import { Text, View, ImageBackground, Animated, Image, Button } from 'react-native';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';



class IDCard extends Component {

  constructor(props) {
      super(props);
      this.state = {
            isProfile: false,
            isHome: false,
            isMenu: false,
            isNotification: false,
            isAccountInfo: this.props.isAccountInfo,
            arrData: [],
          };
    }
    componentDidMount() {
      console.log('IDCardDidMountcall');
      console.log(this.props.cardData.front);
      console.log(this.props.cardData.back);
  }



clickToFlip() {

}

    render() {
      return (

        <View style={styles.MainContainer}>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'ID Card'}

              />
        </View>

          <View style={{ height: '90%', width: '100%'}}>

          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '95%', width: '100%' }}>
            <View style={{ margin: 10, backgroundColor: '#ffffff', width: '95%' }}>

            </View>
            <View style={{ margin: 10   }}>
            <Image
            style={styles.imageMain}
            source={{
              uri: this.props.cardData.front
            }}
            />
            </View>
            <Button title="Flip Me!" onPress={this.clickToFlip} color="#ffffff" />
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
   btnStyle: {
    backgroundColor: '#0f0',
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
   },
   imageMain: {
     height: 250,
   }
};


    export default IDCard;
