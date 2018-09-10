import React, { Component } from 'react';
import { Text, View, ImageBackground, Animated } from 'react-native';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';



class IDCard extends Component {

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
      console.log(this.props.dataArray);
  }

  flipCardAnimation = () => {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start();
  }


    render() {
      return (

        <View style={styles.MainContainer}>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'ID Card'}

              />
        </View>

          <View style={{ height: '90%', width: '100%', backgroundColor: '#0f0'}}>

          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '95%', width: '100%' }}>
            <View style={{ margin: 10, backgroundColor: '#ffffff', width: '95%' }}>

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


    export default IDCard;
