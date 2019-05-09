import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text,Dimensions, TouchableOpacity, TextInput,Alert, ImageBackground, Image,ScrollView,SafeAreaView,NetInfo,AsyncStorage,ActivityIndicator} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import AccountInfo from './AccountInfo';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import CustomFooter from './CustomFooter';
import RequestAppointmentEdit from './RequestAppointmentEdit';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window')
//import Spinner from 'react-native-loading-spinner-overlay';


class ViewAppoitnmentSubCard extends Component {
  constructor(props) {
        super(props);

        this.props = props;

        this.state = {
            arrData: [],
            detailsArray: [],
              isViewDetails:false,
loaded: false,
              CancelAppointment:''
        };
    }


componentWillMount(){
//  alert(height.toString())
    //this.setState({scrollHeight:h})

}




      clickToClose = () => {
          this.setState({ isViewDetails: false });


      }


      appointmentEdit = (strID) => {


        NetInfo.isConnected.fetch().done((isConnected) => {
                 if (isConnected)
                 {

                     UserData.retriveData('token').then((resToken) => {
                         UserData.retriveData('memberId').then((res) => {
                             this.getAppointmentDetails(resToken, res,strID,true);
                         });
                     })

                 }
             });

       }



       viewDetails(strID) {
        // alert(strID);
          NetInfo.isConnected.fetch().done((isConnected) => {
                   if (isConnected)
                   {

                       UserData.retriveData('token').then((resToken) => {
                           UserData.retriveData('memberId').then((res) => {
                               this.getAppointmentDetails(resToken, res,strID,false);
                           });
                       })

                   }
               });
        }


        /*
            Get Appointment Details:
            @ token: token pass in header
            @ memberID: memberID pass in path
            @ appointmentID: Current appointmentID pass in path
        */
                getAppointmentDetails = (token, memberID,appointmentID,isEdit) => {
                           //console.log(token);
                             this.setState({ loaded: true });
////   debugger;
                               ServiceClass.appDetails(token, `appointments/${ memberID}/appointment/${appointmentID}`).then((reData) => {

                                 if (reData.data.status === '1') {
                                  // //   debugger;
                                   //console.log(reData.data.data);
                                   this.setState({ detailsArray: reData.data.data });
                                   try {
                                      AsyncStorage.setItem('editDetailsData', JSON.stringify(reData.data.data));
                                      } catch (error) {

                                      }
                                   this.setState({ loaded: false });
                                   if (isEdit === true){
                                     Actions.RequestAppointmentEdit({isEnableTele:this.props.isEnableTele});
                                   }else{

                                     this.setState({
                                       isViewDetails : true
                                     });
                                   }

                                 }
                                 else {
                                   ////   debugger;
                                     this.setState({ loaded: false });
                                   Alert.alert(reData.data.message);
                                   this.setState({
                                     isViewDetails : false
                                   });
                                 }

                               }).catch((error) => {
                                   ////console.log(error);
                                   Alert.alert(error);
                               });
                     }



cancelAppointmentAfterConfirmation(strID){
  // alert(strID);
    NetInfo.isConnected.fetch().done((isConnected) => {
             if (isConnected)
             {

                 UserData.retriveData('token').then((resToken) => {
                     UserData.retriveData('memberId').then((res) => {
                         this.cancelAppointMentDetails(resToken, res,strID);
                     });
                 })

             }
         });
}


        cancelAppointMent(strID) {

          Alert.alert(
       'Cancel Appointment',

       'Are you sure you want to cancel this appointment?',
       [

         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'OK', onPress: () => this.cancelAppointmentAfterConfirmation(strID)},
       ],
       { cancelable: false }
     )


         }



/*
    Cancle Appointment :
    @ token: token pass in header
    @ memberID: memberID pass in path
    @ appointmentID: Current appointmentID pass in path
*/
        cancelAppointMentDetails = (token, memberID,appointmentID) => {
                   //console.log(token);
                     this.setState({ loaded: true });
                       ServiceClass.deleteDetails(token, `appointments/${ memberID}/appointment/${appointmentID}`).then((reData) => {
                         //   debugger;
                         if (reData.data.status === '1') {
                           //   debugger;
                           //console.log(reData.data.data[0].data);
                           this.setState({ arrayDescription: reData.data.data[0].data });
                           this.setState({ loaded: false });

                            alert("Your appointment has been cancelled successfully.");
                                this.props.handler(reData.data.data[0].data);
                         }
                         else {
                             this.setState({ loaded: false });
                           Alert.alert(reData.data.message);

                         }

                       }).catch((error) => {
                           ////console.log(error);
                           Alert.alert(error);
                       });
             }


        viewAppointmentDetails() {
          // //   debugger;
          var strAddress = this.state.detailsArray[0].selectedProviderAddress.street + this.state.detailsArray[0].selectedProviderAddress.city + this.state.detailsArray[0].selectedProviderAddress.state + this.state.detailsArray[0].selectedProviderAddress.zip
          // //console.log(strAddress);
          if (strAddress === ''){
              strAddress = "N/A";
          }

          return(

          <View style={styles.mainRowPopUp}>


          <View style={styles.mainRowHeading} >
                 <View style={{width:'90%', marginRight:10}}>
                  <Text style={styles.textSubHeading}>Details</Text>
                 </View>

                 <View style={styles.closeButton}>
                 <TouchableOpacity
                    activeOpacity = { 0.7 }
                    onPress = { this.clickToClose }>

                        <Image
                        source={require('../../assets/close.png')}
                        style={{alignItems:'flex-end', paddingRight:20}}
                        />

                    </TouchableOpacity>
                 </View>
                 </View>
          <ScrollView>


              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Patient Name(Dependents)</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{
                        (this.state.detailsArray[0].patientName === '')?"N/A":this.state.detailsArray[0].patientName
                      }</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Provider Name</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{ (this.state.detailsArray[0].status == 'Scheduled') ? (this.state.detailsArray[0].selectedProviderName === '')?"N/A":this.state.detailsArray[0].selectedProviderName
                        :(this.state.detailsArray[0].providerName === '')?"N/A":this.state.detailsArray[0].providerName}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Provider Type</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{
                        (this.state.detailsArray[0].status == 'Scheduled') ? (this.state.detailsArray[0].selectedProviderType === '')?"N/A":this.state.detailsArray[0].selectedProviderType

                      :  (this.state.detailsArray[0].providerOption === '' )?"N/A":this.state.detailsArray[0].providerOption}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Provider Specialty</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{"N/A"}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Provider Address</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{
                        (this.state.detailsArray[0].providerAddress === '' ) ? strAddress : this.state.detailsArray[0].providerAddress
                      }
                      </Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Appointment Fee</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{this.state.detailsArray[0].thcFee}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Deductible</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{this.state.detailsArray[0].deductible}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Status</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{this.state.detailsArray[0].status}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Appointment Date & Time</Text>
                  </View>
                   <View style={styles.mainRowNew}>
                  <View style={styles.viewTextSub} >
                      {this.reRanderViewInDetails(this.state.detailsArray[0].appointmentSchedule.dates)}

                  </View>
                  <View style={styles.viewText} >
                      {this.reRanderViewInDetails(this.state.detailsArray[0].appointmentSchedule.times)}

                  </View>
                    </View>

              </View>




</ScrollView>

          </View>


            )

        }

reRanderViewInDetails(arrayShow){

  return arrayShow.map((array, index) =>
    <Text style={styles.textSub}>{array}</Text>
  );
}

    renderView() {

        return this.props.arrayDescription.map((array, index) =>
            <View style={[(array.status === 'Cancelled')? styles.mainRowDateExpire : styles.mainRowTop]}>
                <View style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Appointment Type</Text>
                    </View>
                    <View style={styles.viewText} >
                        <Text style={styles.textSub}>{array.appointmentType}</Text>
                    </View>
                </View>
                <View style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Patient</Text>
                    </View>
                    <View style={styles.viewText} >
                        <Text style={styles.textSub}>{array.patientName}</Text>
                    </View>
                </View>
                <View style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Date & Time</Text>
                    </View>
                    <View style={styles.viewText} >
                        <Text style={styles.textSub}>{array.appointmentDate} {array.appointmentTime}</Text>
                    </View>
                </View>
                <View style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Status</Text>
                    </View>
                    <View style={styles.viewText} >
                        <Text style={styles.textSub}>{array.status}</Text>
                    </View>
                </View>
                <View style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Provider Name</Text>
                    </View>
                    <View style={styles.viewText} >
                    <Text style={styles.textSub}>{ (array.status == 'Scheduled') ? (array.selectedProviderName === '')?"N/A":array.selectedProviderName
                      :(array.providerName === '')?"N/A":array.providerName}</Text>
                    </View>
                </View>
                <View style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Provider Type</Text>
                    </View>
                    <View style={styles.viewText} >
                        <Text style={styles.textSub}>{ ( array.status == 'Scheduled') ?
                          (array.selectedProviderType === '')?"N/A":array.selectedProviderType : (array.providerOption === '')?"N/A":array.providerOption
                        }</Text>
                    </View>
                </View>
                <View style={styles.mainRowHeadSub}>
                    <Text style={styles.textSub}> Reason for the Visit</Text>
                </View>
                <View style={styles.mainRowMinus10}>
                    <Text style={styles.textSub}>{array.visitReason}</Text>
                </View>
                <View style={styles.mainRowImages}>


                    <TouchableOpacity onPress={() => this.viewDetails(array.appointmentID)}>
                        <Image  source={require('../../assets/view-appointments_view.png')}   style={{marginRight: 5,width:34,height:30}}/>
                    </TouchableOpacity>
                    {
                      (array.status === 'Pending'  || array.status === 'Scheduled' || array.status === 'Update Requested') ? <TouchableOpacity onPress={() => this.appointmentEdit(array.appointmentID)}><Image  source={require('../../assets/view-appointments_edit.png')}   style={{marginRight: 5,width:34,height:30}}/></TouchableOpacity> : null
                    }

                    <TouchableOpacity onPress={() => this.cancelAppointMent(array.appointmentID)}>
                    {
                      (array.status === 'Cancelled') ? null : <Image  source={require('../../assets/view-appointments_close.png')}   style={{width:34,height:30,marginRight:5}}/>
                    }

                    </TouchableOpacity>
                </View>
            </View>



                                            );
          }

                render() {
                  const {

                      isViewDetails,
                      loaded

                  } = this.state;

                  return (
                    <View>
  {
          (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'transparent',alignItems:'center',justifyContent:'center',borderRadius:10}} >< ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
        }



                      {
                          (isViewDetails === true) ?
                           <View style={{position:'absolute',zIndex:1100000000,height: '100%', width: '101%',paddingLeft:5, backgroundColor: 'rgba(0, 0, 0, 0.9)'}}><View style={styles.SplashScreen_RootView}>
                          {this.viewAppointmentDetails()}</View></View>: null
                      }


                   <ScrollView>
                          <View style={styles.mainRowAll}>
                                    {this.renderView()}
                                  </View>

                            </ScrollView>



                          </View>
                                                    );
                                        }

                                    }


   const styles = {  safeArea: {
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
         width: '100%',
         marginBottom:10,
         backgroundColor: '#f3f3f3',

       },

       SplashScreen_RootView:
           {


              marginTop:10,
               position: 'absolute',
               width: '100%',
               height: '100%',

           },

       mainRowPopUp: {
           width: '96%',
           backgroundColor: '#fff',
           zIndex: 100,
            position: 'absolute',
            margin:10,

            height: (height*65)/100
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
            marginBottom:40,
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
           color: '#00dcc3',
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
       viewTextSub: {
           width: '65%'
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
     flex:1,position:'absolute',zIndex:1100000000,marginBottom:0, width: '100%',  backgroundColor: '#000',
   },


   scrollHeight: {
       height:550,
       width:'100%'

   },
   mainRowNew: {
    flexDirection: 'row',
    marginBottom: 5,
    width:'50%'


   },

 };
export default ViewAppoitnmentSubCard;
