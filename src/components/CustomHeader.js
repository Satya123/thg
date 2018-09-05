import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
class CustomHeader extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = { count: 0 };
    }


    onPressButton = () => {

    }

    render() {
      return (
          <View style={styles.containerView}>
              <View style={{ width: 25, height: 25, margin: 5 }} >
              <TouchableOpacity
                onPress={() => Actions.HomeScreen()}
                title=""
              >
                                <Image

                                       source={require('../../assets/back-arrow25x25.png')}
                                />
                  </TouchableOpacity>
                    </View>
                    <View style={{ width: '85%', height: 40, marginTop: 5 }} >
                      <Text style={styles.textStyle}>{this.props.headerText}</Text>

                  </View>
            </View>


      );
    }


  // const CustomHeader = (props) => (
  //       <View style={styles.viewStyle}>
  //         <Text style={styles.textStyle}>{props.headerText}</Text>
  //         <TouchableHighlight onPress={this.onPressButton}>
  //         <Image
  //             style={styles.ImageStyle}
  //             source={require('./myButton.png')}
  //         />
  //         </TouchableHighlight>
  //       </View>
  //
  //   );
//{ flex: 0, flexDirection: 'row', paddingTop: 20, height: 60, backgroundColor: '#ff7417' }

  // <TouchableHighlight onPress={this.onPressButton}>
  // <Image
  //     style={styles.ImageStyle}
  //     source={require('../assets/previous.png')}
  //
  // />
  // </TouchableHighlight>


}


const styles = {

  containerView: {
    flex: 0,
      justifyContent: 'space-around',
      backgroundColor: '#ff7417',
      flexDirection: 'row',
      paddingTop: 20,
      height: 60,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
  },

  ImageStyle: {
      // padding: 0,
      // margin: 0,
      height: 25,
      width: 25,
    //  resizeMode: 'stretch',

  },

  textStyle: {
    fontSize: 20,
    color: 'white',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'

  }
};








//=====

// <View>
// <View style={{ backgroundColor: '#f3f3f3', marginTop: 1 }}>
// <View style={{ height: 40, marginTop: 10, padding: 10 }} >
//       <Text style={styles.textStyle}>Telemedicine Features</Text>
//
//   </View>
//
//   <View style={{ flexDirection: 'row', padding: 5 }}>
//       <View style={{ width: 35, height: 35, }} >
//           <Image source={require('../../assets/bullat-arrow25x25.png')} />
//       </View>
//       <View>
//           <Text style={styles.textSub}>Lorem Ipsum is simply dummy the </Text>
//       </View>
//     </View>
//     <View style={{ flexDirection: 'row', padding: 5 }}>
//         <View style={{ width: 35, height: 35, }} >
//             <Image source={require('../../assets/bullat-arrow25x25.png')} />
//         </View>
//         <View>
//             <Text style={styles.textSub}>Lorem Ipsum is simply dummy the </Text>
//         </View>
//       </View>
//       <View style={{ flexDirection: 'row', padding: 5 }}>
//           <View style={{ width: 35, height: 35, }} >
//               <Image source={require('../../assets/bullat-arrow25x25.png')} />
//           </View>
//           <View>
//               <Text style={styles.textSub}>Lorem Ipsum is simply dummy the </Text>
//           </View>
//         </View>
//
//   </View>
//   <View style={{ backgroundColor: '#f3f3f3', marginTop: 1 }}>
//   <View style={{ height: 40, marginTop: 10, padding: 10 }} >
//         <Text style={styles.textStyle}>How to Activate</Text>
//
//     </View>
//
//     <View style={{ flexDirection: 'row', padding: 5 }}>
//         <View style={{ width: 35, height: 35, }} >
//             <Image source={require('../../assets/bullat-arrow25x25.png')} />
//         </View>
//         <View>
//             <Text style={styles.textSub}>Lorem Ipsum is simply dummy the </Text>
//         </View>
//       </View>
//       <View style={{ flexDirection: 'row', padding: 5 }}>
//           <View style={{ width: 35, height: 35, }} >
//               <Image source={require('../../assets/bullat-arrow25x25.png')} />
//           </View>
//           <View>
//               <Text style={styles.textSub}>Lorem Ipsum is simply dummy the </Text>
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', padding: 5 }}>
//             <View style={{ width: 35, height: 35, }} >
//                 <Image source={require('../../assets/bullat-arrow25x25.png')} />
//             </View>
//             <View>
//                 <Text style={styles.textSub}>Lorem Ipsum is simply dummy the </Text>
//             </View>
//           </View>
//
//     </View>
//   </View>



export default CustomHeader;
