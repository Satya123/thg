/*@ RequestAppointmentEdit.js
 THG App
 This file use for edit appontment  .
 Created by Pulkit Arora
 @*/
import React, { Component } from 'react';
        import { View, Image, Text, ScrollView, KeyboardAvoidingView, ImageBackground, SafeAreaView, Keyboard, TextInput, StyleSheet, Animated, ActivityIndicator, AsyncStorage, Alert, TouchableOpacity, NetInfo} from 'react-native';
//import Dropdown from 'react-native-modal-dropdown';
        import ServiceClass from './ServiceClass';
        import DatePicker from 'react-native-datepicker';
        import { Dropdown } from 'react-native-material-dropdown';
        import RNPickerSelect from 'react-native-picker-select';
//import RadioGroup from 'react-native-radio-buttons-group';
        import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
        import { Actions } from 'react-native-router-flux';
        import UserData from './UserData';
        import CustomFooter from './CustomFooter';
        import CustomHeader from './CustomHeader';
        export const IMAGE_HEIGHT = window.width / 2;
        export const IMAGE_HEIGHT_SMALL = window.width / 7;
        import ResponsiveImage from 'react-native-responsive-image';
        import DeviceInfo from 'react-native-device-info';
        import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
        import call from 'react-native-phone-call';
        class RequestAppointmentEdit extends Component {

        constructor(props) {
        super(props);
                this.animatedValue = new Animated.Value(0);
                this.selectValueInArray = 0;
                this.props = props;
                this.inputRefs = {};
                this.today = new Date();
                loaded: false,
                this.keyboardHeight = new Animated.Value(0);
                this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
                this.state = {
                arrDate:[],
                        Array_Value_Index:'',
                        appointmentDateOne:'',
                        appointmentTimeOne:'',
                        SelectdTimeZone:'',
                        isPrimary:false,
                        SelectdProvider:'',
                        txtPhone:'',
                        isDateModifiye:false,
                        txtName:'',
                        txtAddress:'',
                        txtAditionalInfo:'',
                        previousAppointment:'',
                        previousPaitent:'',
                        previousName:'',
                        isEdit:true,
                        count : 78,
                        indexForRetriveingData:0,
                        dataRadio: [
                        {
                        label: 'First Provider Available',
                                value: "First Provider Available",
                                color:'072849',
                                size: 20,
                        },
                        {
                        label: 'Choose a Past Provider',
                                value: 'Choose a Past Provider',
                                color:'072849',
                                size: 20,
                        },
                        {
                        label: 'Enter Preferred Provider',
                                value: 'Enter Preferred Provider',
                                color:'072849',
                                size: 20,
                        },
                        ],
                        dataArray:[],
                        arrayAppointment: [],
                        arrTime: [],
                        ViewArray: [],
                        date:"",
                        time:'',
                        isUpdateAppointment:true,
                        SelectdAppointment: 'xyz',
                        arrPatient: [],
                        SelectdPatient: '',
                        arrTimeZone: [

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
                    //    //console.log(value);
                        this.setState({ arrayAppointment: value })
                });
                UserData.retriveData('PrimaryCare').then((value) => {
       // //console.log(value);
                this.setState({ strPrimaryType: value })
        })

                AsyncStorage.getItem('profileArray')
                .then((contacts) => {
                const value = contacts ? JSON.parse(contacts) : [];
                    //    //console.log(value);
                        this.setState({arrayValue: value})
                });
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

        UserData.retriveData('isTelemedicineEnable').then((value) => {

        this.state({isTelemedicineEnable:value});
              //  debugger;
               // //console.log(this.state.isTelemedicineEnable);
        })

                AsyncStorage.getItem('editDetailsData')
                .then((contacts) => {
                const value = contacts ? JSON.parse(contacts) : [];
                        //  debugger;

                        if (value[0].providerOption === 'Enter Preferred Provider'){
                valuenew = 2;
                } else if (value[0].providerOption === 'Choose a Past Provider') {
                valuenew = 1
                } else{
                valuenew = 0
                        this.setState({ textProvider:'First Provider Available'});
                }
              
                        this.setState({
                        previousAppointment:value[0].appointmentType + "*",
                                SelectdTimeZone:value[0].timeZone,
                                previousName:value[0].patientName + "*",
                                previousPaitent:value[0].dependentID,
                                selectedAppointmentID:value[0].appointmentID,
                                txtName: value[0].providerName,
                                txtPhone: value[0].providerPhone,
                                txtAddress: value[0].providerAddress,
                                txtReasonData:value[0].visitReason,
                                appointmentDateOne:value[0].appointmentDate,
                                appointmentTimeOne:value[0].appointmentTime,
                                textProvider:value[0].providerOption,
                                txtAditionalInfo:value[0].schedulingNote,
                                arrDate:value[0].appointmentSchedule.dates.slice(1),
                                arrTime:value[0].appointmentSchedule.times.slice(1),
                                ViewArray:value[0].appointmentSchedule.times.slice(1),
                                Array_Value_Index:value[0].appointmentSchedule.times.slice(1).length,
                                isEdit: true,
                                count: valuenew,
                        });
                });
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


        ReplaceAll(Source, stringToFind, stringToReplace) {
        var temp = Source;
                var index = temp.indexOf(stringToFind);
                while (index != - 1) {
        temp = temp.replace(stringToFind, stringToReplace);
                index = temp.indexOf(stringToFind);
        }

        return temp;
        }


        /*
         @handleKeyDown: this function called on keyboard return press.
         
         */

        handleKeyDown = (e) => {
        if (e.nativeEvent.key == "Enter"){
        Keyboard.dismiss();
        }
        }
        /*
         @getDependant: In this function we call Api for getting data of Depandents  .
         @token: This parameter hold the token value, which is used in Api headers.
         @ memberID: Current User Id.
         
         */

        getDependant = (token, memberID) => {
        const arrPatient = [];
               // //console.log(token);
                this.setState({ loaded: true });
                ServiceClass.appDetails(token, `dependents/${ memberID}`).then((reData) => {
        if (reData.data.status === '1') {
        this.setState({ dataArray: reData.data.data });
               // //console.log(this.state.dataArray);
                this.setState({ loaded: false });
                for (var item in this.state.dataArray){

        arrPatient.push({
        label: this.state.dataArray[item].fisrtName + " " + this.state.dataArray[item].lastName,
                value: this.state.dataArray[item].dependentID
        })

        }
        this.setState({ arrPatient: arrPatient });
              //  //console.log(this.state.arrPatient);
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
        /*
         @clickToRequest: In this function we submit details in request appointment Api.
         @strProvider: this parameter pass through view, it is used to get current Provider type.
         */

        clickToRequest = () => {
            /*
      Alert("dsdsdsds")
       this.setState({isUpdateAppointment:false});
                const { appointmentTimeOne } = this.state;
                const { appointmentDateOne } = this.state;
                const { SelectdAppointment } = this.state;
                const { txtReasonData } = this.state;
                const { txtName } = this.state;
                const { txtPhone } = this.state;
                const { txtAddress } = this.state;
                const { SelectdTimeZone } = this.state;
                const { txtAditionalInfo } = this.state;
                const { textProvider } = this.state;
                this.state.SelectdAppointment = this.ReplaceAll(this.state.SelectdAppointment, '*', '');
                this.state.SelectdPatient = this.ReplaceAll(this.state.SelectdPatient, '*', '');
//             debugger;

              //  //console.log(this.state.SelectdAppointment);
// //console.log(this.state.SelectdPatient);
                if (this.state.SelectdAppointment === ''){
        alert("Please select a valid appointment.");
                } else if (this.state.SelectdPatient === '') {
        alert("Please select a valid patient.");
                } else if (this.state.txtReasonData === '') {
        alert("Please enter the reason to visit.");
                } else  if (this.state.appointmentDateOne === ''){
        alert("Please select an appointment date. ");
                } else if (this.state.appointmentTimeOne === ''){
        alert("Please select an appointment time.");
                } else if (this.state.arrDate.length !== this.state.arrTime.length){
        alert("Please select appointment date & time.");
                }
        else{

        if (textProvider === 'Enter Preferred Provider') {
        if (this.state.txtName === ''){
        alert("Please enter the preferred provider name.");
        } else if (this.state.txtPhone === ''){
        alert("Please enter the preferred provider phone number.");
        } else if (this.state.txtPhone.length < 10){
        alert("Please enter the preferred provider phone number of 10 digit.");
        }
        else if (this.state.txtAddress === ''){
        alert("Please enter the preferred provider address.");
        } else {
        if (this.state.arrDate.length < 3 && this.state.isDateModifiye == true){
        this.state.arrDate.push(appointmentDateOne);
                this.state.arrTime.push(appointmentTimeOne);
        }
        const { arrDate } = this.state;
                const { arrTime } = this.state;
                appointmentSchedule = {"timeZone": DeviceInfo.getTimezone(), "dates": arrDate, "times": arrTime};
              //  //console.log(appointmentSchedule);
                NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected)
        {

        UserData.retriveData('token').then((resToken) => {
        UserData.retriveData('memberId').then((res) => {
        this.requestAppointment(resToken, res, this.state.SelectdAppointment, txtReasonData, appointmentSchedule, txtAditionalInfo, textProvider, txtName, txtPhone, txtAddress, this.state.SelectdPatient);
        });
        })



        }
        });
        }
        } else{
        if (this.state.arrDate.length < 3 && this.state.isDateModifiye == true){
        this.state.arrDate.push(appointmentDateOne);
                this.state.arrTime.push(appointmentTimeOne);
        }
        const { arrDate } = this.state;
                const { arrTime } = this.state;
                appointmentSchedule = {"timeZone": DeviceInfo.getTimezone(), "dates": arrDate, "times": arrTime};
              //  //console.log(appointmentSchedule);
                NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected)
        {

        UserData.retriveData('token').then((resToken) => {
        UserData.retriveData('memberId').then((res) => {
        this.requestAppointment(resToken, res, this.state.SelectdAppointment, txtReasonData, appointmentSchedule, txtAditionalInfo, textProvider, txtName, txtPhone, txtAddress, this.state.SelectdPatient);
        });
        })



        }
        });
        }


        }
*/
        }

        /*
         @requestAppointment: This  function used for Update Appointment.
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
        requestAppointment = (token, memberID, appointmentType, visitReason, appointmentSchedule, schedulingNote, providerOption, providerName, providerPhone, providerAddress, dependentID) => {
        this.setState({ loaded: true });
                ServiceClass.updateAppointment(token, `appointments/${ memberID}/appointment/${this.state.selectedAppointmentID}`, appointmentType, visitReason, appointmentSchedule, schedulingNote, providerOption, providerName, providerPhone, providerAddress, dependentID).then((reData) => {

        if (reData.data.status === '1') {
        //console.log(reData.data.data);
                this.setState({ loaded: false });
                alert("Your appointment is updated successfully.");
                Actions.Appointments();
        }
        else {
        //   debugger;
        //console.log(reData.data);
                if (reData.data.message === 'Invalid date time provided.'){

        this.state.appointmentDateOne = '',
                this.state.appointmentTimeOne = '',
                this.state.arrDate = [],
                this.state.arrTime = [],
                this.defaultDateTime()
        }

        this.setState({ loaded: false });
                Alert.alert(reData.data.message);
        }

        }).catch((error) => {
        //   debugger;
        Alert.alert(error);
        });
        }

        /*
         @removeAdditionalDateTime: this function is used for removing additional date and time text field.
         */
        removeAdditionalDateTime = () => {

        this.animatedValue.setValue(0);
                //debugger;
                //console.log(this.state.arrDate);
                if (this.state.Array_Value_Index === 0){
        this.setState({arrDate: []});
                this.setState({arrTime: []});
        }
        else if (this.state.Array_Value_Index === 1){
        this.setState({arrDate: ['']});
                this.setState({arrTime: ['']});
        } else if (this.state.Array_Value_Index === 2) {
        this.setState({arrDate: [this.state.arrDate[0], '']});
                this.setState({arrTime: [this.state.arrTime[0], '']});
        }

        ////console.log();
        this.setState({ Disable_Button: false, ViewArray: this.state.ViewArray.splice(1, 1) }, () =>
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
        this.setState({Array_Value_Index:this.state.Array_Value_Index - 1});
                //this.state.Array_Value_Index = this.state.Array_Value_Index - 1;
                this.setState({ Disable_Button: false });
        });
        });
        }



        /*
         @selcteAdditionalDateTime: this function is used for adding additional date and time text field.
         */


        selcteAdditionalDateTime = () => {


        if (this.state.appointmentDateOne === ''){
        alert("Please select appointment date.");
        } else if (this.state.appointmentTimeOne === ''){
        alert("Please select appointment time.");
        } else if (this.state.Array_Value_Index == 1){
        if (this.state.arrDate.length === 0 || this.state.arrDate[0] === ''){
        alert("Please select appointment date.");
        } else if (this.state.arrTime[0] === '' || this.state.arrTime.length === 0){
        alert("Please select appointment time.");
        } else{
        this.animatedValue.setValue(0);
                let New_Added_View_Value = { Array_Value_Index: this.state.Array_Value_Index }

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
        //this.state.Array_Value_Index = this.state.Array_Value_Index + 1;
        this.setState({Array_Value_Index:this.state.Array_Value_Index + 1});
                this.setState({ Disable_Button: false });
        });
        });
        }
        }
        else{
        this.animatedValue.setValue(0);
                let New_Added_View_Value = { Array_Value_Index: this.state.Array_Value_Index }

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
        // this.state.Array_Value_Index = this.state.Array_Value_Index + 1;
        this.setState({Array_Value_Index:this.state.Array_Value_Index + 1})
                this.setState({ Disable_Button: false });
        });
        });
        }

        }

        /*
         @defaultDateTime: this function is used to show by default date and time text field.
         */


        defaultDateTime()  {
        const  dateCurrent = parseInt(this.today.getMonth() + 1) + "/" + this.today.getDate() + "/" + this.today.getFullYear();
// const stringDateTime = new Date().toLocaleString();
// const arrFindTime  = stringDateTime.split(',');
// const strWithPM =  arrFindTime[1].split(' ');
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
                value={this.state.appointmentDateOne}
                showIcon={false}
                onDateChange={(date) => {
                this.setState({appointmentDateOne: date, isDateModifiye:true})
                }}   />

            <DatePicker
                style={styles.datePic2}
                customStyles={styles.dateCustomStyle}
                date={this.state.appointmentTimeOne}
                showIcon={false}
                value={this.state.appointmentTimeOne}
                mode="time"
                placeholder="Time"
                format="HH:mm"
                minDate="02:50"
                confirmBtnText="OK"
                cancelBtnText="Cancel"
                minuteInterval={15}
                onDateChange={(time) => {
                this.setState({appointmentTimeOne: time, isDateModifiye:true})


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

                        thirdOptionSelectd(){
                return(
<View>
    <View style={styles.mainRow}>
        <View style={styles.viewContent} >
            <Text style={styles.textSub}>Name</Text>
        </View>
        <View style={styles.viewText} >
            {/*   <TextInput
             style={styles.textBox}
             maxLength={50}
             value={this.state.txtName}
             onChangeText={txtName => this.setState({txtName:txtName})}
             underlineColorAndroid="transparent"
             />*/}

            <TextInput 
                style={styles.textBox} 
                underlineColorAndroid="transparent"
                blurOnSubmit={false} 
                autoFocus={true} 
                autoCorrect={false} 
                autoCapitalize="none" 
                value={this.state.txtName}
                returnKeyType="next"
                maxLenght={35}
                onChangeText={txtName => this.setState({txtName})}

                />



        </View>
    </View>

    {/*******************************************/}
    <View style={styles.mainRow}>
        <View style={styles.viewContent} >
            <Text style={styles.textSub}>Phone</Text>
        </View>
        <View style={styles.viewText} >
            {/*    <TextInput
             style={styles.textBox}
             keyboardType="number-pad"
             maxLength={10}
             returnKeyType='done'
             value={this.state.txtPhone}
             onChangeText={txtPhone => this.setState({txtPhone:txtPhone})}
             underlineColorAndroid="transparent"
             
             />*/}

            <TextInput 
                style={styles.textBox} 
                underlineColorAndroid="transparent"
                blurOnSubmit={false} 
                autoFocus={true} 
                autoCorrect={false} 
                 keyboardType="number-pad"
                autoCapitalize="none" 
                maxLength  = {10}
                value={this.state.txtPhone}
                returnKeyType="next"
                onChangeText={txtPhone => this.setState({txtPhone})}

                />

        </View>
    </View>

    {/*******************************************/}
    <View style={styles.mainRow}>
        <View style={styles.viewContent} >
            <Text style={styles.textSub}>Address</Text>
        </View>
        <View style={styles.viewText} >
            {/*      <TextInput
             style={styles.textBox}
             value={this.state.txtAddress}
             maxLength={100}
             onChangeText={txtAddress => this.setState({txtAddress:txtAddress})}
             underlineColorAndroid="transparent"
             
             />*/}

            <TextInput 
                style={styles.textBox} 
                underlineColorAndroid="transparent"
                blurOnSubmit={false} 
                autoFocus={true} 
                autoCorrect={false} 
                autoCapitalize="none" 
                value={this.state.txtAddress}
                returnKeyType="next"
                maxLenght={100}
                onChangeText={txtAddress => this.setState({txtAddress})}

                />





        </View>
    </View>
</View>

                                )
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

                                /*
                                 @Main RenderView All SubPart are added here.
                                 
                                 */



                                onSelect(index, value){
//  debugger;
//  alert(index);

                                this.setState({
                                textProvider: value,
                                        count:index
                                })
                                        }





                                render() {

                                const {
                                isEdit,
                                        dataArray,
                                        loaded,
                                } = this.state;
                                        /*
                                         Radio Button Value Get here.
                                         */





                                        const  dateCurrent = parseInt(this.today.getMonth() + 1) + "/" + this.today.getDate() + "/" + this.today.getFullYear();
                                        /*
                                         On Click of extra Date Time field added here.
                                         */






                                        let Render_Animated_View = this.state.ViewArray.map((item, key) =>
                                        {

                                        return(
<View style={{ flexDirection: 'row', marginBottom: 10, width:'98%'}}>
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
        value={this.state.arrTime[2]}
        showIcon={false}
        onDateChange={(date) => {
                                        const arrDate = this.state.arrDate;
                                                arrDate[key] = date;
                                                this.setState({
                                                arrDate,
                                                        isDateModifiye:true
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
        cancelBtnText="Cancel"
        minuteInterval={15}
        value={this.state.arrTime[2]}
        onDateChange={(time) => {
                                                const arrTime = this.state.arrTime;
                                                        arrTime[key] = time;
                                                        this.setState({
                                                        arrTime,
                                                                isDateModifiye:true
        });
        }}
        />
</View>


                                                                );
                                                        });
                                                        /*END*/


                                                        /*
                                                         @render: this function use to present the UI of RequestAppointmentEdit components.
                                                         */

                                                        return (
<SafeAreaView style={styles.safeArea}>

    <View style={styles.MainContainer}>
        <View style={{width: '100%', height: 60 }}>
            <CustomHeader
                headerText={'Edit Appointment'}

                />
        </View>
        <ImageBackground style={styles.imgBackground} resizeMode='cover' source={require('../../assets/backgroundBlue.png')} >
            <View style={{height: '85%', width: '96%', margin:10, backgroundColor:'0f0' }}>

                <ScrollView style={{marginBottom:15}}>
                    {/***************************************/}
                    <View  style={styles.mainRow}>
                        <View style={styles.viewContent} >
                            <Text style={styles.textSub}>Appointment Type</Text>
                        </View>
                        <View style={styles.viewText} >
                            <RNPickerSelect
                                placeholder={{
                                                                label: this.state.previousAppointment,
                                                                        value: this.state.previousAppointment,
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
                                ref={(el) => {
                                                                        this.inputRefs.picker = el;
                                }}
                                />
                    </View>
                </View>
                {/**************/}
                {
                                                                                (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100, height:100, backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:10}} >< ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
                }

                {/*******************************************/}

                <View  style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Patient</Text>
                    </View>
                    <View style={styles.viewText} >
                        <RNPickerSelect
                            placeholder={{
                                                                                label: this.state.previousName,
                                                                                        value: this.state.previousPaitent,
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
                        {/*  <TextInput
                         style={styles.textArea}
                         underlineColorAndroid="transparent"
                         placeholderTextColor="grey"
                         numberOfLines={10}
                         returnKeyType="done"
                         onKeyPress={this.handleKeyDown}
                         value={this.state.txtReasonData}
                         onChangeText={txtReason => this.setState({txtReasonData:txtReason})}
                         multiline={true} />*/}
                        <TextInput 
                            style={styles.textBox} 
                            underlineColorAndroid="transparent"
                            blurOnSubmit={false} 
                            autoFocus={true} 
                            autoCorrect={false} 
                            autoCapitalize="none" 
                            value={this.state.txtReasonData}
                            returnKeyType="next"
                            maxLenght={100}
                            onChangeText={txtReasonData => this.setState({txtReasonData})}
                            />


                    </View>
                </View>

                {/************************************/}


                {/*******************************************/}

                {/*******************************************/}


                {/*******************************************/}
                {

                                                                                                        (this.state.isPrimary === true) ? null :

                                                                                                        (this.state.SelectdAppointment === 'Primary Care' && this.props.isEnableTele == "1" && this.state.isUpdateAppointment == true) ?  <View style={styles.mainPopUp}>{this.primaryView()}</View> : null
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
                        <View style={{width:'100%'}}>
                            {Render_Animated_View}
                        </View>
                        <View style={{width:'100%', flexDirection:'row'}}>
                            <View style={{width:'30%'}}>


                                {
                                                                                                                (this.state.Array_Value_Index === 2)? null :         <TouchableOpacity
                                    activeOpacity = { 0.7 }
                                    style = { styles.TouchableOpacityStyle }
                                    disabled = { this.state.Disable_Button }
                                    onPress = { this.selcteAdditionalDateTime }>
                                    <View style={{flexDirection:'row', marginBottom:10, height:40}}>
                                        <Text style={{fontSize:36, color:'#072849', textAlign:'left', paddingRight:5, paddingLeft:5, marginTop: - 10}}>+</Text>
                                    </View>
                                </TouchableOpacity>
                                }




                            </View>
                            <View style={{width:'40%'}}>
                                {
                                                                                                                        (this.state.Array_Value_Index > 0) ? <TouchableOpacity
                                    activeOpacity = { 0.7 }
                                    style = { styles.TouchableOpacityStyle }
                                    disabled = { this.state.Disable_Button }
                                    onPress = { this.removeAdditionalDateTime }>
                                    <View style={{flexDirection:'row', marginBottom:10, height:40}}>
                                        <Text style={{fontSize:36, color:'#072849', textAlign:'left', paddingRight:5, paddingLeft:5, marginTop: - 10}}>-</Text>


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

                        {/*  <TextInput
                         style={styles.textArea}
                         underlineColorAndroid="transparent"
                         placeholder="Type something"
                         placeholderTextColor="grey"
                         numberOfLines={10}
                         value={this.state.txtAditionalInfo}
                         returnKeyType="done"
                         onKeyPress={this.handleKeyDown}
                         onChangeText={txtAditionalInfo => this.setState({txtAditionalInfo:txtAditionalInfo})}
                         multiline={true}
                         />*/}

                        <TextInput 
                            style={styles.textBox} 
                            underlineColorAndroid="transparent"
                            blurOnSubmit={false} 
                            autoFocus={true} 
                            autoCorrect={false} 
                            autoCapitalize="none" 
                            maxLenght={100}
                            value={this.state.txtAditionalInfo}
                            returnKeyType="next"
                            onChangeText={txtAditionalInfo => this.setState({txtAditionalInfo})}
                            />

                    </View>
                </View>

                {/*******************************************/}
                <View  style={styles.mainRow}>
                    <View style={styles.viewContent} >
                        <Text style={styles.textSub}>Is there a specific provider?</Text>
                    </View>
                    <View style={styles.viewText} >


                        <RadioGroup
                            size={24}
                            thickness={2}
                            color='#072849'
                            selectedIndex={this.state.count}
                            onSelect = {(index, value) => this.onSelect(index, value)}
                            >
                            <RadioButton
                                value='First Provider Available'
                                >
                                <Text  style={{color:'#fff'}}>First Provider Available</Text>
                            </RadioButton>

                            <RadioButton
                                value='Choose a Past Provider'
                                color='#072849'
                                >
                                <Text  style={{color:'#fff'}}>Choose a Past Provider</Text>
                            </RadioButton>

                            <RadioButton
                                value='Enter Preferred Provider'
                                color='#072849'
                                >
                                <Text style={{color:'#fff'}}>Enter Preferred Provider</Text>
                            </RadioButton>


                        </RadioGroup>


                    </View>
                </View>

                {/*******************************************/}

                {
                                                                                                                                (this.state.textProvider == 'Enter Preferred Provider' || this.state.count == 2) ? <View>{this.thirdOptionSelectd()}</View> : null
                }
                <View style={styles.mainRow}>
                    <View style={styles.viewContent} >

                    </View>

                    <TouchableOpacity
                        activeOpacity = { 0.7 }
                        onPress = { this.clickToRequest.bind(this) }>
                        <ResponsiveImage  source={require('../../assets/UpdateAppointmentBtn.png')}   initWidth="257" initHeight="50"/>
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </View>
    </ImageBackground>
    <View style={styles.footerView}>
        <CustomFooter
            isAccount={false}
            isAppointment={true}
            isIDCard={false}
            isTelemedicine={false}
            isCustomerService={false}
            />
    </View>
</View>

</SafeAreaView>


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
        inputIOS: {
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
                inputAndroid: {
                fontSize: 16,
                        paddingTop: 13,
                        paddingHorizontal: 10,
                        paddingBottom: 12,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        color: 'black',
                },
        });
                const styles = {
                safeArea: {
                flex: 1,
                },
                        text: {
                        padding: 10,
                                fontSize: 14,
                        },
                        imgBackground: {
                        width: '100%',
                                height: '100%',
                        },
                        MainContainer:
                {
                flex: 1,
                },
                        footerView: {
                        width: '100%',
                                height: 50,
                                position: 'absolute',
                                bottom: 0
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
                        color: '#00dcc3',
                                fontSize: 18,
                                },
                        textSub: {
                        color: '#ffffff',
                                fontSize: 16,
                                },
                        textSubPrimaryCare: {
                        color: '#00dcc3',
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
                                width: '100%', backgroundColor: '#ffffff', color:'#000'
                        },
                        textBox: {
                        justifyContent: "flex-start",
                                width: '100%',
                                backgroundColor: '#ffffff'
                                , color:'#000',
                                paddingLeft:10,
                                height: 40,
                                borderRadius:3,
                        }, containerActivety: {

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
                                marginBottom: 0,
                                width:'100%'


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
                        width:145, backgroundColor: '#ffffff', height:46, marginRight:10, paddingBottom:10, paddingTop:0, paddingLeft:10, borderRadius:3,
                                color:'#ffffff', width:'56%',
                                },
                        datePic2: {
                        backgroundColor: '#ffffff', height:46, paddingBottom:10, paddingTop:0, paddingLeft:10, borderRadius:3,
                                color:'#ffffff', width:'40%',
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

                        },
                        mainRowNew: {
                        flexDirection: 'row',
                                marginBottom: 5,
                                width:'100%'


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
                        }, containerKeybord: {

                flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                },
                        mainPopUp: {
                        flex:1, position:'absolute', zIndex:1100000000, height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                        bullet: {
                        width: 20,
                                alignItems:'center',
                                fontWeight:'bold',
                                paddingLeft:5,
                        },
                        mainRowAll: {
                        margin:10,
                                width: '96%',
                        }
                };
                export default RequestAppointmentEdit;
