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
                                'EffectiveDate': '12/Jan/2017',
                                'CancellationDate': '21/Dec/2018',
                                'Network': 'Airtel',
                                'Benifits': ['Lorem Ipsum is simply dummy the printing and typesetting industry','When an unknown printer took a galley make.',
                                'Leap electronic typesetting, remaining essentially unchanged.']},
                                { 'Type': 'Dentiest',
                                  'Status': 'Value',
                                  'EffectiveDate': '12/Jan/2017',
                                  'CancellationDate': '21/Dec/2018',
                                  'Network': 'BSNL',
                                  'Benifits': ['Lorem Ipsum is simply dummy the printing and typesetting industry','When an unknown printer took a galley make.',
                                                          'Leap electronic typesetting, remaining essentially unchanged.']} ];


  return (

        <View style={styles.MainContainer}>
        <View style={{ height: '70%', width: '100%' }}>

        <ImageBackground
          style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../assets/backgroundBlue.png')} >
          <View style={{ height: '95%', width: '100%' }}>
          <View style={{ margin: 10, width: '95%' }}>
          <PoliciesCard arrayDescription={SampleNameArray} />
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


    export default Policies;
