  /*@ RequestAppointmentCard.js
    THG App
    This file is  used to show the request appontment details .
    Created by Pulkit Arora
  @*/
        import React, { Component } from 'react';
        import { View, Image, Text, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, StyleSheet, Animated, ActivityIndicator, AsyncStorage, Alert, TouchableOpacity, NetInfo} from 'react-native';
        import ServiceClass from './ServiceClass';
        import DatePicker from 'react-native-datepicker';
        import { Dropdown } from 'react-native-material-dropdown';
        import RNPickerSelect from 'react-native-picker-select';
        import RadioGroup from 'react-native-radio-buttons-group';
        import { Actions } from 'react-native-router-flux';
        import UserData from './UserData';
        export const IMAGE_HEIGHT = window.width / 2;
        export const IMAGE_HEIGHT_SMALL = window.width /7;
        import ResponsiveImage from 'react-native-responsive-image';
        import DeviceInfo from 'react-native-device-info';

        class RequestAppointmentCard extends Component {

        constructor(props) {
        super(props);
                this.animatedValue = new Animated.Value(0);
                this.Array_Value_Index = 0;
                this.props = props;
                this.inputRefs = {};
                this.today = new Date();
                loaded: false,
                this.keyboardHeight = new Animated.Value(0);
                this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
                this.state = {
                arrDate:[],
                        appointmentDateOne:'',
                        appointmentTimeOne:'',
                        SelectdTimeZone:'',
                        isPrimary:false,
                        SelectdProvider:'',
                        txtPhone:'',
                        txtName:'',
                        txtAddress:'',
                        txtAditionalInfo:'',
                        dataRadio: [

                        {
                        label: 'First Provider Available',
                                value: "First Provider Available",
                                color:'#ff7417',
                                size: 20,
                        },
                        {
                        label: 'Choose a Past Provider',
                                value: 'Choose a Past Provider',
                                color:'#ff7417',
                                size: 20,
                        }, {
                        label: 'Enter Preferred Provider',
                                value: 'Enter Preferred Provider',
                                color:'#ff7417',
                                size: 20,
                        },
                        ],
                        dataArray:[],
                        arrayAppointment: [],
                        arrTime: [],
                        ViewArray: [],
                        date:"",
                        time:'',
                        SelectdAppointment: '',
                        arrPatient: [],
                        SelectdPatient: '',
                        arrTimeZone: [
                          {
                          label: 'AKST (UTC -5)',
                          value: 'AKST'
                        },
                          {
                          label: 'HST (UTC -5)',
                          value: 'HST'
                        },
                          {
                          label: 'PST (UTC -5)',
                          value: 'PST'
                        },
                        {
                        label: 'MST (UTC -5)',
                        value: 'MST'
                      },
                      {
                        label: 'CST (UTC -5)',
                        value: 'CST'
                      },
                    {
                      label: 'EST (UTC -5)',
                      value: 'EST'
                  },
                        ],

                        txtReasonData:''
                };
        }
/*
    @componentWillMount: In this function we retrive  appointment type list which we get on App Details Api,
      and PrimaryCare text which are also provided in same Api.

*/


        componentWillMount() {

          this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
          this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
          AsyncStorage.getItem('AppointmentType')
                .then((contacts) => {
                const value = contacts ? JSON.parse(contacts) : [];
                        console.log(value);
                        this.setState({ arrayAppointment: value })
                        });
                UserData.retriveData('PrimaryCare').then((value) => {
                  console.log(value);
                this.setState({ strPrimaryType: value })
                })

                }
              componentWillUnmount() {
                  this.keyboardWillShowSub.remove();
                  this.keyboardWillHideSub.remove();
                }

                keyboardWillShow = (event) => {
                  Animated.parallel([
                    Animated.timing(this.keyboardHeight, {
                      duration: event.duration,
                      toValue: event.endCoordinates.height,
                    }),
                    Animated.timing(this.imageHeight, {
                      duration: event.duration,
                      toValue: IMAGE_HEIGHT_SMALL,
                    }),
                  ]).start();
                };

                keyboardWillHide = (event) => {
                  Animated.parallel([
                    Animated.timing(this.keyboardHeight, {
                      duration: event.duration,
                      toValue: 0,
                    }),
                    Animated.timing(this.imageHeight, {
                      duration: event.duration,
                      toValue: IMAGE_HEIGHT,
                    }),
                  ]).start();
                };

    /*
        @componentDidMount: In this function we get all Dependents .

    */
  componentDidMount() {
          NetInfo.isConnected.fetch().done((isConnected) => {
                        if (isConnected)
                        {

                        UserData.retriveData('token').then((resToken) => {
                        UserData.retriveData('memberId').then((res) => {
                        this.getDependant(resToken, res);
                        });
                        })

                        }
                        else
                        {

                        }
                  });
          }
  /*
      @getDependant: In this function we call Api for getting data of Depandents  .
      @token: This parameter hold the token value, which is used in Api headers.
      @ memberID: Current User Id.

  */

        getDependant = (token, memberID) => {
        const arrPatient = [];
                console.log(token);
                this.setState({ loaded: true });
                ServiceClass.appDetails(token, `dependents/${ memberID}`).then((reData) => {
        if (reData.data.status === '1') {
        this.setState({ dataArray: reData.data.data });

        console.log(this.state.dataArray);
                this.setState({ loaded: false });
                for (var item in this.state.dataArray){

                arrPatient.push({
                label: this.state.dataArray[item].fisrtName + " " + this.state.dataArray[item].lastName,
                value: this.state.dataArray[item].dependentID
                })

        }
        this.setState({ arrPatient: arrPatient });
                console.log(this.state.arrPatient);


        }
        else {
        this.setState({ loaded: false });
               // Alert.alert(reData.data.message);
        }

        }).catch((error) => {
        //console.log(error);
        //Alert.alert(error);
        });
        }

        /*
            @clickToRequest: In this function we submit details in request appointment Api.
            @strProvider: this parameter pass through view, it is used to get current Provider type.
        */


        clickToRequest = (strProvider) => {



            const { appointmentTimeOne }  = this.state;
            const { appointmentDateOne }  = this.state;
            const { SelectdAppointment }  = this.state;
            const { txtReasonData }  = this.state;
            const { txtName }  = this.state;
            const { txtPhone }  = this.state;
            const { txtAddress }  = this.state;
            const { SelectdTimeZone }  = this.state;
            const { txtAditionalInfo }  = this.state;
              if (this.state.SelectdAppointment === ''){
                alert("Please Select Valid Appointment");

              }else if (this.state.SelectdPatient === '') {
                alert("Please Select Valid Patient");
              }else if (this.state.txtReasonData === '') {
                alert("Please enter reason to visit");
              } else  if (this.state.appointmentDateOne === ''){
                alert("Please Select Appointment Date ");
                } else if (this.state.appointmentTimeOne === ''){
                alert("Please Select Appointment Time ");
                }else{
                 if (strProvider === 'Enter Preferred Provider') {
                    if(this.state.txtName === ' ' ){
                      alert("Please Enter Preferred Provider Name");
                    }else if(this.state.txtPhone === ''){
                        alert("Please Enter Preferred Provider Phone Number");
                      }else if(this.state.txtAddress === ''){
                          alert("Please Enter Preferred Provider Address");
                      }else {
                        if (this.state.arrDate.length < 3){
                          this.state.arrDate.push(appointmentDateOne);
                          this.state.arrTime.push(appointmentTimeOne);
                        }
                        const { arrDate }  = this.state;
                        const { arrTime }  = this.state;

                        appointmentSchedule = {"timeZone": DeviceInfo.getTimezone(),"dates": arrDate,"times": arrTime};

                        console.log(appointmentSchedule);
                        NetInfo.isConnected.fetch().done((isConnected) => {
                                 if (isConnected)
                                 {

                                     UserData.retriveData('token').then((resToken) => {
                                         UserData.retriveData('memberId').then((res) => {
                                             this.requestAppointment(resToken, res,SelectdAppointment,txtReasonData,appointmentSchedule,txtAditionalInfo,strProvider,txtName,txtPhone,txtAddress,this.state.SelectdPatient);
                                         });
                                     })



                                 }
                             });
                      }
                }else{
                  if (this.state.arrDate.length < 3){
                    this.state.arrDate.push(appointmentDateOne);
                    this.state.arrTime.push(appointmentTimeOne);
                  }
                  const { arrDate }  = this.state;
                  const { arrTime }  = this.state;

                  appointmentSchedule = {"timeZone": DeviceInfo.getTimezone(),"dates": arrDate,"times": arrTime};

                  console.log(appointmentSchedule);
                  NetInfo.isConnected.fetch().done((isConnected) => {
                           if (isConnected)
                           {

                               UserData.retriveData('token').then((resToken) => {
                                   UserData.retriveData('memberId').then((res) => {
                                       this.requestAppointment(resToken, res,SelectdAppointment,txtReasonData,appointmentSchedule,txtAditionalInfo,strProvider,txtName,txtPhone,txtAddress,this.state.SelectdPatient);
                                   });
                               })



                           }
                       });
                }


              }

        }


        /*
          @requestAppointment: This  function used for Request Appointment.
          @token: This parameter hold the token value, which is used in Api headers.
          @lastUrl: Subpath of Api.
          @appointmentType: Type of Appointment.
          @visitReason: Reason for vist to Doctor.
          @appointmentSchedule: AppointmentSchedule is an Object type data which contains TimeZone,Date,Time.
          @schedulingNote: This Parameter contains Additional Information for Appointment.
          @providerOption: This Parameter use for set provider type.
          @providerName: Selected Provider Name.
          @providerPhone: Selected provider Phone Number.
          @providerAddress: Selected provider Address.
          @dependentID: Selected Patient Id .

        */

    requestAppointment = (token, memberID,appointmentType, visitReason, appointmentSchedule,schedulingNote, providerOption,providerName,providerPhone,providerAddress,dependentID) => {
                        this.setState({ loaded: true });
                       ServiceClass.requestAppointment(token, `appointments/${ memberID}`,appointmentType, visitReason, appointmentSchedule,schedulingNote ,providerOption,providerName,providerPhone,providerAddress,dependentID).then((reData) => {

                         if (reData.data.status === '1') {
                           //console.log(reData.data.data);
                           this.setState({ loaded: false });
                           alert("Your appointment request is submitted successfully");
                            Actions.Appointments({isRequestAppointment:true})
                         }
                         else {
                          // debugger;
                           // console.log(reData.data);
                             this.setState({ loaded: false });
                           Alert.alert(reData.data.message);
                             if (reData.data.message === 'Invalid date time provided.'){

                                this.state.appointmentDateOne = '',
                                this.state.appointmentTimeOne = '',
                                this.state.arrDate = [],
                                this.state.arrTime = [],
                                  this.defaultDateTime()
                             }


                         }

                       }).catch((error) => {
                        //   debugger;
                          Alert.alert(error);
                       });
             }


 /*
   @removeAdditionalDateTime: this function is used for removing additional date and time text field.
 */
 removeAdditionalDateTime = () =>{

   this.animatedValue.setValue(0);
   //debugger;
   console.log(this.state.arrDate);
    if (this.Array_Value_Index === 1){
      this.setState({arrDate: ['']});
      this.setState({arrTime: ['']});

   } else if (this.Array_Value_Index === 2) {
     this.setState({arrDate: [this.state.arrDate[0],'']});
       this.setState({arrTime: [this.state.arrTime[0],'']});
   }

   //console.log();
   this.setState({ Disable_Button: false, ViewArray: this.state.ViewArray.splice(1,1) }, () =>
   {
   Animated.timing(
           this.animatedValue,
   {
   toValue: 1,
           duration: 200,
           useNativeDriver: true
   }
   ).start(() =>
   {
   this.Array_Value_Index = this.Array_Value_Index - 1;
           this.setState({ Disable_Button: false });
   });
   });

 }



 /*
   @selcteAdditionalDateTime: this function is used for adding additional date and time text field.
 */


selcteAdditionalDateTime = () =>{


        if (this.state.appointmentDateOne === ''){
        alert("Please Select Appointment Date ");
        } else if (this.state.appointmentTimeOne === ''){
        alert("Please Select Appointment Time ");
        } else if (this.Array_Value_Index == 1){
        if (this.state.arrDate.length === 0 || this.state.arrDate[0] === ''){
        alert("Please Select Appointment Date ");
      } else if (this.state.arrTime[0] === '' || this.state.arrTime.length === 0){
        alert("Please Select Appointment Time ");
        } else{
        this.animatedValue.setValue(0);
                let New_Added_View_Value = { Array_Value_Index: this.Array_Value_Index }

        this.setState({ Disable_Button: false, ViewArray: [ ...this.state.ViewArray, New_Added_View_Value ] }, () =>
        {
        Animated.timing(
                this.animatedValue,
        {
        toValue: 1,
                duration: 200,
                useNativeDriver: true
        }
        ).start(() =>
        {
        this.Array_Value_Index = this.Array_Value_Index + 1;
                this.setState({ Disable_Button: false });
        });
        });
        }
        }
        else{
        this.animatedValue.setValue(0);
                let New_Added_View_Value = { Array_Value_Index: this.Array_Value_Index }

        this.setState({ Disable_Button: false, ViewArray: [ ...this.state.ViewArray, New_Added_View_Value ] }, () =>
        {
        Animated.timing(
                this.animatedValue,
        {
        toValue: 1,
                duration: 200,
                useNativeDriver: true
        }
        ).start(() =>
        {
        this.Array_Value_Index = this.Array_Value_Index + 1;
                this.setState({ Disable_Button: false });
        });
        });
        }

}

/*
  @defaultDateTime: this function is used to show by default date and time text field.
*/

defaultDateTime()  {
const  dateCurrent =  parseInt(  this.today.getMonth()+1) + "/"+ this.today.getDate() +"/"+   this.today.getFullYear();

 return(
    <View style={styles.mainRow}>
      <View style={styles.viewContent} >
        <Text style={styles.textSub}>Appointment Time (s)</Text>
     </View>

   <View style={styles.viewText} >
       <View style={styles.mainRowNew}>
      <DatePicker
               style={styles.datePic1}
               customStyles={styles.dateCustomStyle}
               ref='datepicker'
               date={this.state.appointmentDateOne}
               mode="date"
               androidMode='spinner'
               format="MM/DD/YYYY"
               minDate={dateCurrent}
               maxDate="12/01/2019"
               placeholder="Date"
               confirmBtnText="OK"
               cancelBtnText="Cancel"
               showIcon={false}
               onDateChange={(date) => {
                this.setState({appointmentDateOne: date})
               }}   />

           <DatePicker
               style={styles.datePic2}
               customStyles={styles.dateCustomStyle}
               date={this.state.appointmentTimeOne}
               showIcon={false}
               mode="time"
               placeholder="Time"
               format="HH:mm"
               minDate="02:50"
               confirmBtnText="OK"
               cancelBtnText="Cancel"
               minuteInterval={1}
               onDateChange={(time) => {
                this.setState({appointmentTimeOne: time})


               }}
               />

       </View>
   </View>
  </View>
)
}

onPress = selectedRaidodata => this.setState({ selectedRaidodata });

/*
@selctedThirdProviderType: this function is used to call when user selected Preferred Provider.
*/

selctedThirdProviderType(){
  return(

      <Animated.View style={[ { paddingBottom: this.keyboardHeight }]}>
      <View style={styles.mainRow}>
         <View style={styles.viewContent} >
           <Text style={styles.textSub}>Name</Text>
        </View>
     <View style={styles.viewText} >
         <TextInput
    style={styles.textBox}
    onChangeText={txtName => this.setState({txtName:txtName})}
    underlineColorAndroid="transparent"
/>

    </View>
    </View>

    {/*******************************************/}
      <View style={styles.mainRow}>
         <View style={styles.viewContent} >
           <Text style={styles.textSub}>Phone</Text>
        </View>
     <View style={styles.viewText} >
         <TextInput
      style={styles.textBox}
     keyboardType="number-pad"
     returnKeyType='done'
     onChangeText={txtPhone => this.setState({txtPhone:txtPhone})}
     underlineColorAndroid="transparent"

  />
 </View>
    </View>

    {/*******************************************/}
      <View style={styles.mainRow}>
         <View style={styles.viewContent} >
           <Text style={styles.textSub}>Address</Text>
        </View>
     <View style={styles.viewText} >
         <TextInput
    style={styles.textBox}
    onChangeText={txtAddress => this.setState({txtAddress:txtAddress})}
    underlineColorAndroid="transparent"

  />
 </View>
    </View>
    </Animated.View>

)
}
/*
  @handleKeyDown: this function used to close the keyboard on return click.
*/
handleKeyDown = (e) => {
   if(e.nativeEvent.key == "Enter"){
      Keyboard.dismiss();
   }
}

clickToClose = () => {
this.setState({ isPrimary: true });
}

/*
  @clickToCannectTelimedcine: this function used to close the PrimaryCare Pop-up.
*/
clickToCancle = () => {
this.setState({ isPrimary: true });
}

/*
  @clickToCannectTelimedcine: this function used to redirect on Telemedicine page.
*/

clickToCannectTelimedcine = () => {
   Actions.Telemedicine();
  this.setState({ isPrimary: true });
}

/*
  @primaryView: this function used to present Primary Care description.
*/

primaryView() {
    return(
 <View  style={styles.mainPrimaryCarePopUp}>
      <View style={{width:'100%', height:50, flexDirection:'row', borderBottomWidth:2, borderColor:'#f2f2f2'}} >
         <View style={{width:'90%', marginRight:10}}>
          <Text style={styles.textSubPrimaryCare}>Primary Care</Text>
         </View>
         <View style={{width:'5%', justifyContent:'center', alignItems:'center'}}>
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
     <View style={{ flexDirection: 'row', paddingTop: 5, paddingRight: 20, }}>
         <View style={ styles.bullet }>
           <Text>{'\u2022' + " "}</Text>
        </View>
          <View>
              <Text style={styles.textSubPrimry}>{this.state.strPrimaryType}</Text>
         </View>
       </View>
        <View style={{ flexDirection: 'row', padding: 20, borderTopWidth:2, borderColor:'#f2f2f2' }}>
           <View>
       <TouchableOpacity
              activeOpacity = { 0.7 }
              onPress = { this.clickToCannectTelimedcine }>

              <ResponsiveImage
              source={require('../../assets/ConnecttoTelemedicine.png')}
              initWidth="257"
              initHeight="50"
              style={{alignItems:'flex-end', marginRight:10}}
              />
        </TouchableOpacity>
        </View>
            <View>
            <TouchableOpacity
               activeOpacity = { 0.7 }
               onPress = { this.clickToCancle }>

               <ResponsiveImage
               source={require('../../assets/cancel.png')}
               initWidth="88"
               initHeight="50"
               style={{alignItems:'flex-end', paddingRight:20}}
               />
    </TouchableOpacity>
 </View>
</View>
</View>

    )

}

setProvider(str){
    this.setState({SelectdProvider:str});
}

/*  @Main RenderView All SubPart are added here.*/

render() {
  const {
    dataArray,
    loaded
  } = this.state;
/*Radio Button Value Get here.*/
    let selectedButton = this.state.dataRadio.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.dataRadio[0].label;
      //  alert(selectedButton);
     const  dateCurrent =  parseInt(  this.today.getMonth()+1) + "/"+ this.today.getDate() +"/"+   this.today.getFullYear();
/*On Click of extra Date Time field added here.*/
  let Render_Animated_View = this.state.ViewArray.map(( item, key ) =>
    {
 return(
 <View style={{ flexDirection: 'row',marginBottom: 10}}>
                            <DatePicker
                            style={styles.datePic1}
                            customStyles={styles.dateCustomStyle}
                            ref='datepicker'
                            date={this.state.arrDate[key]}
                            mode="date"
                            androidMode='spinner'
                            format="MM/DD/YYYY"
                            minDate={dateCurrent}
                            maxDate="12/01/2019"
                            placeholder="Date"
                            confirmBtnText="OK"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={(date) => {
                                                const arrDate = this.state.arrDate;
                                                        arrDate[key] = date;
                                                        this.setState({
                                                        arrDate
                                 });
                                 this.setState({
                                 isPlusClick: false
                                });

                              }}   />
                         <DatePicker
                             style={styles.datePic2}
                             customStyles={styles.dateCustomStyle}
                             date={this.state.arrTime[key]}
                             showIcon={false}
                             androidMode='spinner'
                             mode="time"
                             placeholder="Time"
                             minDate={new Date().toLocaleString()}
                             format="HH:mm"
                             confirmBtnText="OK"
                             value=""
                             cancelBtnText="Cancel"
                             minuteInterval={1}
                             onDateChange={(time) => {
                                                        const arrTime = this.state.arrTime;
                                                                arrTime[key] = time;
                                                                this.setState({
                                                                arrTime,
                                  });
                             }}
                              />
     </View>
       );

    });
/*END*/


/*
  @render: this function use to present the UI of RequestAppointmentCard components.
*/
 return (

 <ScrollView >
{/***************************************/}
     <View  style={styles.mainRow}>
      <View style={styles.viewContent} >
          <Text style={styles.textSub}>Appointment Type</Text>
      </View>
       <View style={styles.viewText} >
     <RNPickerSelect
                        placeholder={{
                            label: 'Select Appointment Type',
                            value: null,
                        }}
                        items={this.state.arrayAppointment}
                        onValueChange={(value) => {
                            this.setState({
                                SelectdAppointment: value,

                            });
                            (value === 'Primary Care') ?   this.setState({
                                  isPrimary: false,

                              }) :  this.setState({
                                    isPrimary: true,

                                });

                        }}

                        style={{ ...pickerSelectStyles }}
                        value={this.state.SelectdAppointment}

                    />
      </View>
        </View>
        {/**************/}
        {
          (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
        }

        {/*******************************************/}

        <View  style={styles.mainRow}>
           <View style={styles.viewContent} >
               <Text style={styles.textSub}>Patient</Text>
           </View>
            <View style={styles.viewText} >
            <RNPickerSelect
                              placeholder={{
                                  label: 'Select Patient Type',
                                  value: null,
                              }}
                              items={this.state.arrPatient}
                              onValueChange={(value) => {
                                  this.setState({
                                      SelectdPatient: value,
                                  });
                              }}

                              style={{ ...pickerSelectStyles }}
                              value={this.state.SelectdPatient}
                              ref={(el) => {
                                  this.inputRefs.picker = el;
                              }}
                          />

           </View>
             </View>

             {/*******************************************/}


        <View style={styles.mainRow}>
           <View style={styles.viewContent} >
             <Text style={styles.textSub}>Reason for the Visit</Text>
          </View>
       <View style={styles.viewText} >
      <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholderTextColor="grey"
      numberOfLines={10}
      returnKeyType="done"
      onKeyPress={this.handleKeyDown}
      onChangeText={txtReason => this.setState({txtReasonData:txtReason})}
      multiline={true} />

      </View>
      </View>

{/************************************/}





    {/*******************************************/}
    {
        (this.state.isPrimary === true) ? null :

      (this.state.SelectdAppointment === 'Primary Care') ?  <View style={styles.mainPopUp}>{this.primaryView()}</View> : null
    }
    {/*Additional Date and time field added*/}

      {this.defaultDateTime()}


        {/*******************************************/}
        <View  style={styles.mainRowSub}>
         <View style={styles.viewContent} >
         <Text style={{
           color: '#ffffff',
           fontSize: 13,
         }}>Add (+) | Remove (-)</Text>
         </View>
       <View style={{width:'67%'}}>
          <View style={{width:'93%'}}>
            {Render_Animated_View}
          </View>
          <View style={{width:'100%',flexDirection:'row'}}>
           <View style={{width:'30%'}}>


{
  (this.Array_Value_Index === 2)? null :         <TouchableOpacity
              activeOpacity = { 0.7 }
              style = { styles.TouchableOpacityStyle }
              disabled = { this.state.Disable_Button }
              onPress = { this.selcteAdditionalDateTime }>
              <View style={{flexDirection:'row',marginBottom:10,height:40}}>
    <Text style={{fontSize:36,color:'#ff7417',textAlign:'left',paddingRight:5,paddingLeft:5,marginTop:-10}}>+</Text>
                    </View>
              </TouchableOpacity>
}




              </View>
              <View style={{width:'40%'}}>
              {
                 (this.Array_Value_Index > 0) ? <TouchableOpacity
                                 activeOpacity = { 0.7 }
                                 style = { styles.TouchableOpacityStyle }
                                 disabled = { this.state.Disable_Button }
                                 onPress = { this.removeAdditionalDateTime }>
                                 <View style={{flexDirection:'row',marginBottom:10,height:40}}>
                              <Text style={{fontSize:36,color:'#ff7417',textAlign:'left',paddingRight:5,paddingLeft:5,marginTop:-10}}>-</Text>


                                       </View>
                                 </TouchableOpacity> : null

              }

  </View>
</View>
 </View>
           </View>

  {/*******************************************/}


            {/*******************************************/}
        <View style={styles.mainRow}>
           <View style={styles.viewContent} >
             <Text style={styles.textSub}>Additional Info</Text>
          </View>
       <View style={styles.viewText} >

           <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholder="Type something"
      placeholderTextColor="grey"
      returnKeyType="done"
      onKeyPress={this.handleKeyDown}
      onChangeText={txtAditionalInfo => this.setState({txtAditionalInfo:txtAditionalInfo})}
      multiline={true}
    />

      </View>
      </View>

            {/*******************************************/}
   <View  style={styles.mainRow}>
      <View style={styles.viewContent} >
          <Text style={styles.textSub}>Is there a specific provider?</Text>
      </View>
       <View style={styles.viewText} >
    <View style={styles.container}>
                <RadioGroup
                radioButtons={this.state.dataRadio}
                label={false}
                 onPress={selectedRaidodata => this.setState({
                    selectedRaidodata

                   }) }
                 color={'#ffffff'}
                 style={{color:'white'}} />
            </View>

      </View>
        </View>

        {/*******************************************/}

        {
            //alert(selectedButton);
          (selectedButton == 'Enter Preferred Provider') ? <View>{this.selctedThirdProviderType()}</View> : null
        }
     <View style={styles.mainRow}>
           <View style={styles.viewContent} >

          </View>
          <TouchableOpacity
             activeOpacity = { 0.7 }
             onPress = { this.clickToRequest.bind(this,selectedButton) }>
               <ResponsiveImage  source={require('../../assets/request-appointment-btn.png')}   initWidth="257" initHeight="50"/>
         </TouchableOpacity>
      </View>
    </ScrollView>


    );
  }


  /*
      Main Render View End
  */


}

/*
  @styles:  these style constant are used to create a presentable ui .
*/


const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
const styles = {
  MainContainer:
          {
              flex: 1,

          },
  container: {
      paddingTop: 30,
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingHorizontal: 10,
  },

  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'red',
    borderBottomWidth: 1,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20
  //  backgroundColor: 'blue'
  },

  viewTest: {
    flex: 1,
    backgroundColor: 'red'
  },
textStyle: {
  color: '#ff7417',
  fontSize: 18,

},
textSub: {
  color: '#ffffff',
  fontSize: 16,
},
textSubPrimaryCare: {
  color: '#ff7417',
  fontSize: 20,
  fontWeight:'bold',

  borderColor:'#dedede',
  padding:10

},

viewContent: {
   width: '30%'
},
viewText: {
   width: '65%'
},
textArea: {
    height:50,
    borderRadius:3,
    justifyContent: "flex-start",
    paddingLeft:10,
    fontSize:18,
    width: '100%',backgroundColor: '#ffffff',color:'#000'
  },
textBox: {

    justifyContent: "flex-start",
    width: '100%',
    backgroundColor: '#ffffff'
    ,color:'#000',
    paddingLeft:10,

      height: 40,

borderRadius:3,





  },   containerActivety: {

         backgroundColor: 'transparent',
         height: '100%',
         width: '100%',
         zIndex: 10000000,
         position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      },

textSubLeft: {
  color: 'black',
  fontSize: 14,


},
mainRowSub: {
  //backgroundColor:'#0f0',
 flexDirection: 'row',
 marginBottom: 10,
 width:'100%',



},
mainRow: {
 flexDirection: 'row',
 marginBottom: 10,
 width:'100%'


},
mainPrimaryCarePopUp: {

  borderRadius:2,
  width:'100%',
  backgroundColor:'#ffffff',
  position:'absolute',
  zIndex:100000


},
datePic1: {
width:145,backgroundColor: '#ffffff',height:46,marginRight:10,paddingBottom:10,paddingTop:0,paddingLeft:10,borderRadius:3,
color:'#ffffff', width:'56%',

},
datePic2: {
backgroundColor: '#ffffff',height:46,paddingBottom:10,paddingTop:0,paddingLeft:10,borderRadius:3,
color:'#ffffff', width:'44%',

},
dateCustomStyle:{
  dateInput: {
    alignItems: 'flex-start',
    borderWidth: 0
},
  placeholderText: {
            color: '#000'  },
dateText:{
  color: '#000',
  paddingLeft:0,
}

},
FloatingButtonStyle: {

  resizeMode: 'contain',
  width: 25,
  height: 25,
},

TouchableOpacityStyle:{
  flexDirection:'row'
},
mainRowNew: {
 flexDirection: 'row',

 width:'96%'


},
container: {
        height:100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 18,
        marginBottom: 50,
    },
    textSubDate: {
   color: '#ffffff',
    width:'58%',
   fontSize: 16,
   marginRight:10,
  },
  textSubTime: {
   color: '#ffffff',
   width:'38%',
   fontSize: 16,
  },
  textSubPrimry: {
    color: 'black',
    fontSize: 18,


  },  containerKeybord: {

      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerKeybordSecond: {

       flex: 0.1,
       alignItems: 'center',
       justifyContent: 'center',
     },
  mainPopUp: {
    flex:1,position:'absolute',zIndex:1100000000,height: '100%', width: '100%',  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  bullet: {
          width: 20,
           alignItems:'center',
           fontWeight:'bold',
           paddingLeft:5,
 }
};

export default RequestAppointmentCard;