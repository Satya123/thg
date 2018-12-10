import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity, TextInput,Alert, ImageBackground, Image,ScrollView,SafeAreaView,NetInfo,AsyncStorage,ActivityIndicator} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import AccountInfo from './AccountInfo';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import CustomFooter from './CustomFooter';
import RequestAppointmentEdit from './RequestAppointmentEdit';


class ViewAppoitnmentSubCard extends Component {
  constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            arrData: [],
            detailsArray: [],
              isViewDetails:false,

              CancelAppointment:''
        };
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
                           console.log(token);
                             this.setState({ loaded: true });
                               ServiceClass.appDetails(token, `appointments/${ memberID}/appointment/${appointmentID}`).then((reData) => {

                                 if (reData.data.status === '1') {
                                   //debugger;
                                   console.log(reData.data.data);
                                   this.setState({ detailsArray: reData.data.data });
                                   try {
                                      AsyncStorage.setItem('editDetailsData', JSON.stringify(reData.data.data));
                                      } catch (error) {

                                      }
                                   this.setState({ loaded: false });
                                   if (isEdit === true){
                                     Actions.RequestAppointmentEdit();
                                   }else{

                                     this.setState({
                                       isViewDetails : true
                                     });
                                   }

                                 }
                                 else {
                                     this.setState({ loaded: false });
                                   Alert.alert(reData.data.message);
                                   this.setState({
                                     isViewDetails : false
                                   });
                                 }

                               }).catch((error) => {
                                   //console.log(error);
                                   Alert.alert(error);
                               });
                     }




        cancleAppointMent(strID) {
         // alert(strID);
           NetInfo.isConnected.fetch().done((isConnected) => {
                    if (isConnected)
                    {

                        UserData.retriveData('token').then((resToken) => {
                            UserData.retriveData('memberId').then((res) => {
                                this.cancleAppointmentDetails(resToken, res,strID);
                            });
                        })

                    }
                });
         }



/*
    Cancle Appointment :
    @ token: token pass in header
    @ memberID: memberID pass in path
    @ appointmentID: Current appointmentID pass in path
*/
        cancleAppointmentDetails = (token, memberID,appointmentID) => {
                   console.log(token);
                     this.setState({ loaded: true });
                       ServiceClass.deleteDetails(token, `appointments/${ memberID}/appointment/${appointmentID}`).then((reData) => {
                         debugger;
                         if (reData.data.status === '1') {
                           debugger;
                           console.log(reData.data.data[0].data);
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
                           //console.log(error);
                           Alert.alert(error);
                       });
             }


        viewAppointmentDetails() {

          return(
            <ScrollView>
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

              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Patent Name(Dependents)</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{(this.state.detailsArray[0].patientName === '')?"N/A":this.state.detailsArray[0].patientName}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Provider Name</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{(this.state.detailsArray[0].providerName === '')?"N/A":this.state.detailsArray[0].providerName}</Text>
                  </View>
              </View>
              <View style={styles.mainRow}>
                  <View style={styles.viewContent} >
                      <Text style={styles.textSub}>Provider Type</Text>
                  </View>
                  <View style={styles.viewText} >
                      <Text style={styles.textSub}>{

                        (this.state.detailsArray[0].providerOption === '' )?"N/A":this.state.detailsArray[0].providerOption}</Text>
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
                      <Text style={styles.textSub}>{this.state.detailsArray[0].providerAddress.street} {this.state.detailsArray[0].providerAddress.city} {this.state.detailsArray[0].providerAddress.state} {this.state.detailsArray[0].providerAddress.zip}</Text>
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





          </View>
          </ScrollView>
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
                        <Text style={styles.textSub}>Date Time</Text>
                    </View>
                    <View style={styles.viewText} >
                        <Text style={styles.textSub}>{array.appointmentDate} {array.appointmentTime}</Text>
                    </View>
                </View>
                <View style={styles.mainRowHeadSub}>
                    <Text style={styles.textSub}>Reason for the Visit</Text>
                </View>
                <View style={styles.mainRowMinus10}>
                    <Text style={styles.textSub}>{array.visitReason}</Text>
                </View>
                <View style={styles.mainRowImages}>

                    <TouchableOpacity onPress={() => this.viewDetails(array.appointmentID)}>
                        <ResponsiveImage  source={require('../../assets/view-appointments_view.jpeg')}  initWidth="38" initHeight="33" style={{marginRight: 5}}/>
                    </TouchableOpacity>
                    {
                      (array.status === 'Pending') ? <TouchableOpacity onPress={() => this.appointmentEdit(array.appointmentID)}><ResponsiveImage  source={require('../../assets/view-appointments_edit.jpeg')}  initWidth="36" initHeight="33" style={{marginRight: 5}}/></TouchableOpacity> : null
                    }

                    <TouchableOpacity onPress={() => this.cancleAppointMent(array.appointmentID)}>
                    {
                      (array.status === 'Cancelled') ? null : <ResponsiveImage  source={require('../../assets/view-appointments_close.jpeg')}  initWidth="45" initHeight="33"/>
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
                      (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
                    }

                      {
                          (isViewDetails === true) ?
                            <View style={styles.mainPopUp}>
                          {this.viewAppointmentDetails()}</View>: null
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

         backgroundColor: 'transparent',
         height: '100%',
         width: '100%',
         zIndex: 10000000,
         position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      },
   mainPopUp: {
     flex:1,position:'absolute',zIndex:1100000000,height: '100%', width: '100%',  backgroundColor: 'rgba(0, 0, 0, 0.7)',
   },
   mainPopUpSub: {
   justifyContent:'center',alignItems:'center',backgroundColor:'transparent',activeOpacity:0.8
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