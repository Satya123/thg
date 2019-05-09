/*@ ViewAppointment.js
  THG App
  This file is  used to show the  appontment list .
  Created by Pulkit Arora
@*/
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text,Alert, TouchableOpacity, TextInput, ImageBackground, Image,ScrollView,SafeAreaView,NetInfo,ActivityIndicator} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import AccountInfo from './AccountInfo';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import ViewAppoitnmentSubCard from './ViewAppoitnmentSubCard';
import CustomFooter from './CustomFooter';
//import Spinner from 'react-native-loading-spinner-overlay';

class ViewAppointment extends Component {
    constructor(props) {
        super(props);
        this.props = props;
         this.handler = this.handler.bind(this)
        this.state = {

         clickToClose:false,
           loaded: false,
           dataArray:[],
        };
    }
/*
  @componentWillReceiveProps: this function is called from child class.
*/

    componentWillReceiveProps(props) {
      // debugger;
      NetInfo.isConnected.fetch().done((isConnected) => {
               if (isConnected)
               {

                   UserData.retriveData('token').then((resToken) => {
                       UserData.retriveData('memberId').then((res) => {
                           this.getAppointmentlist(resToken, res);
                       });
                   })




               } else
               {

               }
           });
    }





  componentWillMount() {

    NetInfo.isConnected.fetch().done((isConnected) => {
             if (isConnected)
             {

                 UserData.retriveData('token').then((resToken) => {
                     UserData.retriveData('memberId').then((res) => {
                         this.getAppointmentlist(resToken, res);
                     });
                 })




             } else
             {

             }
         });

     }

     /*
         @getAppointmentlist: In this function we call Api for getting data of Appointment list  .
         @token: This parameter hold the token value, which is used in Api headers.
         @ memberID: Current User Id.

     */

     getAppointmentlist = (token, memberID,) => {

                //console.log(token);
                  this.setState({ loaded: true });
                    ServiceClass.appDetails(token, `appointments/${ memberID}`).then((reData) => {

                      if (reData.data.status === '1') {
                      //  debugger;
                        //console.log(reData.data.data);
                        this.setState({ dataArray: reData.data.data });
                        this.setState({ loaded: false });
                        if (reData.data.message  === ''){

                        }else{
                              Alert.alert(reData.data.message);
                        }

                      }
                      else {
                          this.setState({ loaded: false });
                        Alert.alert(reData.data.message);
                      //  Actions.pop();
                      }

                    }).catch((error) => {
                        ////console.log(error);
                        Alert.alert(error);
                    });
          }



/*************************Start Pop Up*******************************************************************/

/*************************End Pop Up*******************************************************************/

/*
  @handler: this function is called from child class to show  updated data.
*/


handler(data) {

  //console.log(data);
  this.setState({
    dataArray:data
  })
 }

 /*
   @render: this function use to present the UI of ViewAppointment components.
 */


    render() {
        const {
            isProfile,
            isDependents,
            isPolicies,
            isViewDetails,
            loaded,
            dataArray,
        } = this.state;

        return (
          <SafeAreaView style={styles.safeArea}>
          <View style={styles.MainContainer}>
    <ImageBackground style={styles.imgBackground} resizeMode='cover' source={require('../../assets/backgroundBlue.png')} >
    {
        (isViewDetails === true) ?
          <View style={styles.mainPopUp}>
        {this.appointmentView()}</View>: null
    }

    {
            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
            }
    <View style={{ width: '99%' }}>
      <ViewAppoitnmentSubCard arrayDescription={dataArray} handler = {this.handler} isEnableTele={this.props.isEnableTele} />
    </View>
    </ImageBackground>

    </View>
</SafeAreaView>
        );

    }

}


const styles = {

  safeArea: {
      flex: 1,

  },
  MainContainer:
          {
              flex: 1,

          },
    mainRowTop: {
        width: '100%',
        backgroundColor: '#ffffff',
        marginBottom:10,

    },
    mainRowDateExpire: {
        width: '96%',
        backgroundColor: '#dedede',
        margin:10,
         marginTop:0,
    },


    mainRowPopUp: {
        width: '96%',
        backgroundColor: '#ffffff',
        zIndex: 100,
        position: 'absolute',
         margin:10,
    },

    mainRow: {
        flexDirection: 'row',
        paddingLeft: 5,
        marginBottom:0,
        width: '100%',
        borderColor: '#dedede',
        borderBottomWidth: 1,
       flexWrap: 'wrap',

    },
    mainRowAll: {
         margin:10,
        width: '96%',
     },
    mainRowMinus10: {
        flexDirection: 'row',
        paddingLeft: 5,
        marginTop:-10,
        width: '100%',
        borderColor: '#dedede',
        borderBottomWidth: 1,
       flexWrap: 'wrap',

    },
    mainRowHeadSub: {
        flexDirection: 'row',
        width: '100%',

    },

mainRowImages: {
        width: '100%',
        marginTop:20,
         flexDirection: 'row',
         alignItems:'flex-end',
         justifyContent: 'flex-end',
         paddingBottom:20,

},

    textSub: {
        color: '#000000',
        fontSize: 16,
        padding: 10,

    },

    mainRowHeading: {
        width:'100%',flexDirection:'row',borderBottomWidth:2,borderColor:'#f2f2f2'

    },
    textSubHeading: {
        color: '#ff7417',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingTop: 10,
    },
    viewContent: {
        width: '50%'
    },
    viewContentHunPer: {
        width: '100%'
    },
    viewText: {
        width: '50%'
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
    closeButton: {
      width:'5%',justifyContent:'center',alignItems:'center'
    },
    mainPrimaryCarePopUp: {
     borderRadius:2,
    width:'100%',
    position:'absolute',
  zIndex:100000,
  height:'100%'


},
containerActivety: {
   top:-50,
  backgroundColor: 'transparent',
  height: '100%',
  width: '100%',
  zIndex: 10000000,
  position: 'absolute',
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: 'rgba(52, 52, 52, 0.1)'
},
mainPopUp: {
  flex:1,position:'absolute',zIndex:1100000000,height: '100%', width: '100%',  backgroundColor: 'rgba(0, 0, 0, 0.7)',justifyContent:'center',alignItems:'center',
},
mainPopUpSub: {
justifyContent:'center',alignItems:'center',backgroundColor:'transparent',activeOpacity:0.8
},

scrollHeight: {
    height:550,
    width:'100%'

},
 };
export default ViewAppointment;
