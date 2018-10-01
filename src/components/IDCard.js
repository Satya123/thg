import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView , ImageBackground, AsyncStorage,Text} from 'react-native'
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import CardFlip from 'react-native-card-flip';
import FlipCard from 'react-native-flip-card'


const deviceWidth = Dimensions.get('window').width 
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 5

const images = [ ]

export default class IDCard extends Component {

   constructor(props) {
      super(props);

      this.state = {
            isProfile: false,
            isHome: false,
            isMenu: false,
            isNotification: false,
            isAccountInfo: this.props.isAccountInfo,
            arrayValue: [],
            loaded: false,
          };
    }
  
  
  numItems = images.length
  itemWidth = 5.0
  animVal = new Animated.Value(0)
  
  
     componentDidMount() {
      
      //console.log('IDCardDidMountcall');
       if (images.length > 0){
         
       }else{
                 images.push(this.props.cardData.front)
                  images.push(this.props.cardData.back)
       }
      
      //console.log(this.props.cardData.back);
        this.setState({ loaded: true });
    
        numItems = images.length
       // itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
        animVal = new Animated.Value(0)
       
        setTimeout(() => { this.setState({ loaded: false }); }, 1000);

        AsyncStorage.getItem('profileArray')
        .then((contacts) => {
        const value = contacts ? JSON.parse(contacts) : [];

        //console.log(value);
        this.setState({ arrayValue: value })
      });
  }
  

  render() {
     const {
        arrayValue,
        loaded
      } = this.state;
    
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      //console.log(image, i)
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          
          style={{ width: 320, 
                  height: 300, }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

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
        
      <View
        style={styles.container}
        flex={0.8}
        >
    
       
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >

          {imageArray}

        </ScrollView>
        <View style={{height: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
      
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
         
       
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
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
      
    
  },
     footerView: {
     width: '100%',
      height: 45,

      position: 'absolute',
      bottom: 0

   },
    MainContainer:
   {
       flex: 1,
       
   },
  barContainer: {
    marginTop: 30,
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
     imgBackground: {
           width: '100%',
           height: '100%',
         
           


   },
  bar: {
    backgroundColor: '#ff7417',
    height: 5,
    width: 5,
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})