import React, { Component } from 'react';
import { Text, View, ImageBackground, Animated, Image, Button, TouchableOpacity, ActivityIndicator,AsyncStorage,Platform } from 'react-native';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import CardFlip from 'react-native-card-flip';
import FlipCard from 'react-native-flip-card'

class IDCard extends Component {

  constructor(props) {
      super(props);
      this.state = {
            isProfile: false,
            isHome: false,
            isMenu: false,
            isNotification: false,
            isFlip: false,
            isAccountInfo: this.props.isAccountInfo,
            arrayValue: [],
             imageURL : '',
            loaded: false,
          };
    }
    componentDidMount() {
         this.setState({
 
      imageURL : this.props.cardData.front
 
    })
      console.log('IDCardDidMountcall');
      console.log(this.props.cardData.front);
      console.log(this.props.cardData.back);
        this.setState({ loaded: true });
        setTimeout(() => { this.setState({ loaded: false }); }, 1000);

        AsyncStorage.getItem('profileArray')
        .then((contacts) => {
        const value = contacts ? JSON.parse(contacts) : [];

        console.log(value);
        this.setState({ arrayValue: value })
        
      });
  }



Load_New_Image=()=>{
    if (this.state.isFlip === true){
      
      this.setState({
 
      imageURL : this.props.cardData.front
 
    })
       this.setState({
 
         isFlip: false
 
    })
      
    }else{
       this.setState({
 
      imageURL : this.props.cardData.back
 
    })
       this.setState({
 
         isFlip: true
 
    })
    }
   
  }



    render() {
      const {
        arrayValue,
        loaded
      } = this.state;
      return (

        <View style={styles.MainContainer}>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'ID Card'}

              />
        </View>





          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '95%', width: '100%' }}>
            {
              (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
            }
        <View style={{ margin: 10,  width: '95%' }}>
 
            <Image 
              source = {{ uri: this.state.imageURL }}
 
              style = {styles.imageMain} />
 
              <Button title="Click Here To Flip" onPress={this.Load_New_Image} />
                
        
              

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

     flex:1,
  

   },
   imageStyle:{
 
    width: 200, 
    height: 300, 
    resizeMode: 'center'
 
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
   containerActivety: {

       backgroundColor: 'transparent',
       height: '100%',
       width: '100%',
       zIndex: 10000000,
       position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
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
