import React, { Component } from 'react';
import { Text, View,ImageBackground,TouchableHighlight,Animated,Image,ScrollView } from 'react-native';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
//import NotificationSubData from './NotificationSubData';
import Panel from './Panel';

class Notification extends Component {

  constructor(props) {
      super(props);
      this.state = {

              isProfile: false,
              isHome: false,
              isMenu: false,
              isNotification: true,
            };
            
            
         
            
            
    }
    toggle(){
        
    }
    
    
/*
 getDependant = (token, memberID) => {

            console.log(token);
              this.setState({ loaded: true });
                ServiceClass.appDetails(token, `dependents/${ memberID}`).then((reData) => {

                  if (reData.data.status === '1') {
                    console.log(reData.data.data);
                    this.setState({ dataArray: reData.data.data });
                    this.setState({ loaded: false });
                  }
                  else {
                      this.setState({ loaded: false });
                    Alert.alert(reData.data.message);
                  }

                }).catch((error) => {
                    //console.log(error);
                    Alert.alert(error);
                });
      }
*/


componentWillMount() {

  console.log('SubCard');
  console.log(this.props.arrayDescription);
 // this.setData();

}


    render() {
        
//        
//    let icon = this.icons['down'];
//
//        if(this.state.expanded){
//            icon = this.icons['up'];   //Step 4
//        }
      /*   const SampleNameArray = [
{ 'name': 'Michal',
'gender': 'Male',
'birthdate': '12/Jan/2017',
'relationship': 'self',
'Network': 'Idea',
},
{ 'name': 'Dolly',
'gender': 'female',
'birthdate': '12/Jun/2018',
'relationship': 'emp',
'Network': 'Airtel',
},
{ 'name': 'Scott',
'gender': 'Male',
'birthdate': '13/May/2019',
'relationship': 'self',
'Network': 'Airtel',
},
{ 'name': 'Michal',
'gender': 'Active',
'birthdate': '12/July/2017',
'relationship': 'self',
'Network': 'Airtel',
},
{ 'name': 'Michal',
'gender': 'Active',
'birthdate': '12/Aug/2017',
'relationship': 'self',
'Network': 'Airtel',
} ]; */
      return (

         <ScrollView style={styles.container}>
        <Panel title="A Panel with short content text">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Panel>
        <Panel title="A Panel with long content text">
          <Text>Lorem ipsum...</Text>
        </Panel>
        <Panel title="Another Panel">
          <Text>Lorem ipsum dolor sit amet...</Text>
        </Panel>
      </ScrollView>
     
         
    

      );
    }


}

       
     const styles = {
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  },
      MainContainer:
       {
           
           justifyContent: 'center',
           alignItems: 'center',
           paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
       },
        imgBackground: {
      height: '100%',
      width: '100%',
     },
        footerView: {
     height: 50,
      marginBottom: 0,
      padding: 0,
      width: '100%',
     // backgroundColor: 'red'

   },
   textSub: {
  color: 'black',
  fontSize: 14,


},
textrow: {
  color: 'black',
  fontSize: 16,
flexDirection: 'row', borderBottomWidth: 1,
borderColor: '#dedede', padding: 10
},
textSubRight: {
  color: 'black',
  fontSize: 14,

  textAlign: 'right'

}
  
 }    
       
       
       
    export default Notification;
