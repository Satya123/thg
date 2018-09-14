import React, { Component } from 'react';
import { Text, View, Alert,ImageBackground, ActivityIndicator,Image } from 'react-native';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import CustomHeader from './CustomHeader';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import NotificationSubData from './NotificationSubData';

class Dependents extends Component {

  constructor(props) {
      super(props);
        this.state = {
            isProfile: false,
            isDependents: true,
            dataArray:[],
            isPolicies: false,
            loaded: false,
          };
    }

componentWillMount() {

}

    componentDidMount() {

      UserData.retriveData('token').then((resToken) => {
        UserData.retriveData('memberId').then((res) => {
            this.getDependant(resToken, res);
            });
      })

  }

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

    render() {
      const {
        dataArray,
        loaded
      } = this.state;
     // console.log(SampleNameArray);
      
          const SampleNameArray = [
{ 'notification': 'It is last established fact that reader will be distracted by redable content of the page1',

},
{ 'notification': 'It is last established fact that reader will be distracted by redable content of the page1',

},
{ 'notification': 'It is last established fact that reader will be distracted by redable content of the page3',

},
{ 'notification': 'It is last established fact that reader will be distracted by redable content of the page4',

},
{ 'notification': 'It is last established fact that reader will be distracted by redable content of the page5',

},
{ 
    'notification': 'It is last established fact that reader will be distracted by redable content of the page6'
}
];
      
      
      
      return (
 <View>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'Notification'}

              />
        </View>
           <View style={styles.MainContainer}>
           <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '95%', width: '95%',margin:10 }}>
            
                
           
            {<NotificationSubData arrayDescription={SampleNameArray} />}
          
            </View>
            <View style={styles.footerView}>
                    <CustomFooter
                    isProfile={this.state.isProfile}
                    isHome={this.state.isHome}
                    isMenu={this.state.isMenu}
                    isNotification={this.state.isNotification}
                    />
              </View>
              {
                                (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100, height:100, backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
              }
            </ImageBackground>
          </View>
            </View>

      );
    }


}

const styles = {
  MainContainer:
   {
   
     alignItems: 'center',
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
   footerView: {
     height: 50,
      marginBottom: 0,
      padding: 0,
      width: '100%',
     // backgroundColor: 'red'

   },
   imgBackground: {
      height: '100%',
      width: '100%',
     },
textrow: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
 borderBottomWidth: 1,
borderColor: '#dedede',

},

textrowGray: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
borderBottomWidth: 1,
backgroundColor:'#dedede',
borderColor: '#dedede',

},

textSub: {
  color: 'black',
  fontSize: 16,
  lineHeight:20,
  textAlign: 'justify',
  padding:10
},
textSubRightImage: {
 justifyContent: 'center',
  alignItems: 'center',
  height:60,
  paddingTop:10
},


};


    export default Dependents;
