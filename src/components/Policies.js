import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
      const SampleNameArray = [ { 'PolicyName': 'Health Policy1', 'value': '$10,000', 'Benifits': ['Lorem Ipsum is simply dummy the printing and typesetting industry','When an unknown printer took a galley make.',
       'Leap electronic typesetting, remaining essentially unchanged.']},{ 'PolicyName': 'Health Policy2', 'value': '$120000', 'Benifits': ['Lorem Ipsum is simply dummy the printing and typesetting industry','When an unknown printer took a galley make.',
        'Leap electronic typesetting, remaining essentially unchanged.']} ];


      return (
        <View>
        <View style={styles.MainContainer}>
            <PoliciesCard arrayDescription={SampleNameArray} />

           </View>
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
       height: '78%',
       width: '100%',
       alignItems: 'center',
       marginTop: 0,
       backgroundColor: 'yellow'
   },
   footerView: {

      height: 40,
      marginBottom: 0,
      padding: 0,
      width: '100%',
      backgroundColor: 'red',
      borderTopWidth: 2,
      borderColor: '#f3f3f3'

   }
};


    export default Policies;
