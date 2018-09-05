import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
  import CustomHeader from './CustomHeader';

class Telemedicine extends Component {


    componentWillMount() {
      console.log('componentWillMount call Telemedicine');

    RNSecureKeyStore.get('key1')
    .then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
    });
    }

    render() {
      const SampleNameArray = ['Lorem Ipsum is simply dummy the printing and typesetting industry.',
      'When an unknown printer took a galley make.',
       'Leap electronic typesetting, remaining essentially unchanged.',
        'It was popularised in the of Letraset sheets.',
        'Containing Lorem Ipsum passages recently with desktop.'];



      return (
        <View>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'Telemedicine'}

              />
        </View>
        <View>

        <View style={{ width: '100%', height: '88%' }}>
          <View style={{ height: 60, backgroundColor: '#f3f3f3', flexDirection: 'row' }}>
            <View style={styles.ImageView} >
            <Image

                   source={require('../../assets/phone35x35.png')}
            />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.textStyle}>1800 000 0000</Text>
              </View>
          </View>
          <TelemedicineCard arrayDescription={SampleNameArray} />

        </View>
          <CustomFooter />
        </View>
        </View>
      );
    }


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

  ImageView: {
      margin: 5,
      marginTop: 15,
      height: 35,
      width: 35,
  alignItems: 'flex-start',

  },

  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'

  }
};


export default Telemedicine;
