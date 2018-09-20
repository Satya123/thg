import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import CustomFooter from './CustomFooter';
import PoliciesCard from './PoliciesCard';

class Policies extends Component {

  constructor(props) {
      super(props);
        this.state = {
            isProfile: false,
            isDependents: false,

            isPolicies: true,

          };
    }

    render() {
      const SampleNameArray = [{ 'Type': 'Medical',
                                'Status': 'Active',
                                'EffectiveDate': '09/20/2017',
                                'CancellationDate': '09/19/2018',
                                'Network': 'Airtel',
                                'Benifits': ['Lorem Ipsum is simply dummy the printing and typesetting industry','When an unknown printer took a galley make.',
                                'Leap electronic typesetting, remaining essentially unchanged.','Lorem Ipsum is simply dummy the printing and typesetting industry','When an unknown printer took a galley make.',
                                'Leap electronic typesetting, remaining essentially unchanged.']},
                                { 'Type': 'Dentist',
                                  'Status': 'Active',
                                  'EffectiveDate': '09/20/2017',
                                  'CancellationDate': '09/19/2018',
                                  'Network': 'BSNL',
                                  'Benifits': ['Lorem Ipsum is simply dummy the printing and typesetting industry','When an unknown printer took a galley make.',
                                                          'Leap electronic typesetting, remaining essentially unchanged.']} ];


  return (

        <View style={styles.MainContainer}>


        <ImageBackground
          style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../assets/backgroundBlue.png')} >
          <View style={{ height: '95%', width: '100%' }}>
          <View style={{ margin: 10, width: '95%' }}>
          <PoliciesCard arrayDescription={SampleNameArray} />
          </View>
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
};


    export default Policies;
