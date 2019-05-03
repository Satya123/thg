

/* LiveChat.js
  THG App
  This file is used for chat etc.
  @Created by Pulkit Arora
*/




import React, { Component } from 'react';
import { View, Dimensions,ActivityIndicator ,StyleSheet, Image, Platform, Text , ScrollView , TouchableOpacity, SafeAreaView, TextInput,ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import ChatBubble from './ChatBubble/ChatBubble';
import Chat from './Chat/Chat';
import {init} from "@livechat/livechat-visitor-sdk";
const { height, width } = Dimensions.get('window');
const totalSize = num => (Math.sqrt((height * height) + (width * width)) * num) / 100;
const chatIcon = require('../assets/chat.png');
import CustomHeader from '../src/components/CustomHeader';
import ResponsiveImage from 'react-native-responsive-image';
import { Actions } from 'react-native-router-flux';
import UserData from '../src/components/UserData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default class LiveChat extends Component {
  constructor(props) {
    super(props);
    this.defineStyles();
    this.state = {
      isChatOn: false,
      offlineData:[],
      loaded: false,
      title:"Our agents are not available right now. Please leave a message and we'll get back to you.",
      txtName:'',
      txtEmail:'',
      txtSubject:'',
      txtMessage:'',
      bubble: props.bubble ? props.bubble : (
        <View style={this.styles.bubbleStyle}>
          <Image source={chatIcon} style={this.styles.icon} />
        </View>
      ),
    };
    if (!GLOBAL.visitorSDK) {
      GLOBAL.visitorSDK = init({
        license: '10210157',
        group: props.group
      });
    }
    props.onLoaded(GLOBAL.visitorSDK);
    GLOBAL.visitorSDK.on('status_changed', this.handleStateChange.bind(this));
  }
  /*
    @handleStateChange: this function use to manage chat agent status.
  */


  handleStateChange = (statusData) => {

    this.setState({
      onlineStatus: statusData.status === 'online',
    });
    if (statusData.status === 'online'){
    //  alert("online")
      this.setState({
        onlineStatus: true,
      });
       UserData.saveData('active', 'online');
    }else{
    //  alert("offline")
    debugger;
  //  this.offlineField();
      this.setState({
        onlineStatus: false,
      });
       UserData.saveData('active', 'offline');

    }
  };

componentWillMount(){
  UserData.retriveData('active').then((value) => {
      if (value == 'online'){
        this.setState({
          onlineStatus: true,
        });
      }else{
        this.setState({
          onlineStatus: false,
        });
      //  this.offlineField();
      }

  })




}





/*
  @offlineView: this function is called when chat agents are offline.
*/



  offlineView(){

    return (
      <KeyboardAwareScrollView>
      <View style={{padding:20,width:'100%'}}>

            <View style={{flexDirection:'row',width:'100%'}}>
            <Text style={{marginBottom:10,fontSize:18,color:'#fff'}}>Your name</Text>
            <Text style={{marginBottom:10,fontSize:18,color:'red'}}>*</Text>
            </View>
            <View style={{width:'100%'}}>
            <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            placeholder="Name"
            returnKeyType="done"
            onKeyPress={this.handleKeyDown}
            value={this.state.txtName}
            onChangeText={txtName => this.setState({txtName:txtName})}
             />
             </View>
            <View style={{flexDirection:'row',width:'100%'}}>
            <Text style={{marginBottom:10,fontSize:18,color:'#fff'}}>E-mail</Text>
            <Text style={{marginBottom:10,fontSize:18,color:'red'}}>*</Text>
            </View>
            <View style={{width:'100%'}}>
            <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            placeholder="Email"

            returnKeyType="done"
            onKeyPress={this.handleKeyDown}
            value={this.state.txtEmail}
            onChangeText={txtEmail => this.setState({txtEmail:txtEmail})}
             />
             </View>
            <View style={{flexDirection:'row',width:'100%'}}>
            <Text style={{marginBottom:10,fontSize:18,color:'#fff'}}>Subject</Text>
            <Text style={{marginBottom:10,fontSize:18,color:'red'}}>*</Text>
            </View>
            <View style={{width:'100%'}}>
            <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            placeholder="Subject"

            returnKeyType="done"
            onKeyPress={this.handleKeyDown}
            value={this.state.txtSubject}
            onChangeText={txtSubject => this.setState({txtSubject:txtSubject})}
             />
             </View>
            <View style={{flexDirection:'row',width:'100%'}}>
            <Text style={{marginBottom:10,fontSize:18,color:'#fff'}}>Message</Text>
            <Text style={{marginBottom:10,fontSize:18,color:'red'}}>*</Text>
            </View>
            <View style={{width:'100%'}}>
            <TextInput
            style={styles.textAreaMsg}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            placeholder="Message"
            numberOfLines={10}
            returnKeyType="done"
            onKeyPress={this.handleKeyDown}
            value={this.state.txtMessage}
            onChangeText={txtMessage => this.setState({txtMessage:txtMessage})}
             />
             </View>

      </View>
</KeyboardAwareScrollView>

    );


  }

  validate = (text) => {
     //  debugger
           console.log(text);
           let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
           if(reg.test(text) === false)
           {
          // console.log("Email is Not Correct");
           this.setState({email:text})
           return false;
             }
           else {
             this.setState({email:text})
             //console.log("Email is Correct");
           }
     }

     /*
       @clickToRequest: this function is used to push the request token to live chat dasboard.
     */

  clickToRequest = () => {
    const { txtName }  = this.state;
    const { txtEmail }  = this.state;
      const { txtSubject }  = this.state;
      const { txtMessage }  = this.state;

      var isValid    = this.validate(txtEmail);



        if (this.state.txtName === ''){
          alert("Please enter your name");

        }else if (this.state.txtEmail === '') {
            alert("Please enter your email");
        }else if (isValid === false) {
           alert('You have entered an invalid email address!');
         }
         else  if (this.state.txtSubject === ''){
          alert("Please enter subject ");
          } else if (this.state.txtMessage === ''){
          alert("Please enter your message ");
        }else{
          this.setState({loaded: true});
          visitorSDK
            .sendTicketForm({
              name: txtName,
              email: txtEmail,
              subject: txtSubject,
              message: txtMessage,
            })
            .then((res) => {
            //  debugger;
            //  console.log(res);
                this.setState({loaded: false});
              if(res.success === true){
                alert('Your query has been submitted succesfully. We will get back to you on your registered email address.')
                  //this.props.onSelectLanguage(this.state.onlineStatus);
                Actions.pop();
              }else{
                    alert('Something went wrong')
              }
              this.setState({loaded: false});

              //console.log('Ticket sent')
            })
            .catch(error => {
              debugger;
              this.setState({loaded: false});
              alert('Something went wrong')
              //this.props.onSelectLanguage(this.state.onlineStatus);
              console.log(error);
            })
        }

      }

  defineStyles() {
    this.styles = StyleSheet.create({
      bubbleStyle: {
        width: width / 5,
        height: width / 5,
        backgroundColor: this.props.bubbleColor,
        borderRadius: width / 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        width: width / 7, height: width / 7,
      },
      container: {
        flex:1,

        width:'100%',
        height:'100%',
        position: 'absolute'
      },
    });
  }

  openChat = () => {
    this.setState({ isChatOn: true });
  };

  closeChat = () => {
    this.setState({ isChatOn: false });
  };

  /*
    @render: this function use to present the UI of RequestAppointmentCard components.
  */


  render() {
    const {

        loaded
    } = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>

      <View style={styles.MainContainer}>

          <View style={{width: '100%', zIndex: 1000000000000, position: 'absolute' }}>
              <CustomHeader
                  headerText={'Chat'}
                  />
          </View>

          <ImageBackground
              style={styles.imgBackground}
              resizeMode='cover'
              source={require('../assets/backgroundBlue.png')} >
              {
                  (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}} >< ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
              }

              <View style={this.styles.container}>


                {
                  this.state.onlineStatus ?
                  <ChatBubble
                      left={this.props.bubbleLeft}
                      top={this.props.bubbleTop}
                      openChat={this.openChat}
                      bubble={this.state.bubble}
                      disabled={this.props.movable}
                    />

                    : null

                }

                {
                  this.state.onlineStatus ?
                      <Chat {...this.props} isChatOn={this.state.isChatOn} closeChat={this.closeChat} />

                    :   <View style={{width:'100%'}}>
                    <View style={{width:'100%',padding:20,paddingBottom:0}}>
                            <Text style={styles.status}>
                               {this.state.title}
                            </Text>
                            </View>
                            <View style={{width:'100%'}}>
                            {this.offlineView()}
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity
                               activeOpacity = { 0.7 }
                               onPress = { this.clickToRequest.bind(this) }>
                                 <ResponsiveImage  source={require('../assets/leaveMessage.png')}   initWidth="257" initHeight="50"/>
                           </TouchableOpacity>
                           </View>
                      </View>



                }



              </View>

          </ImageBackground>


      </View>

      </SafeAreaView>
    );
  }
}

LiveChat.propTypes = {
  license: '10210157',
  group: PropTypes.number,
  movable: PropTypes.bool,
  bubble: PropTypes.element,
  bubbleColor: PropTypes.string,
  bubbleLeft: PropTypes.number,
  bubbleTop: PropTypes.number,
  chatTitle: PropTypes.string,
  greeting: PropTypes.string,
  noAgents: PropTypes.string,
  onLoaded: PropTypes.func,
};

LiveChat.defaultProps = {
  bubbleColor: '#2196F3',
  movable: true,
  onLoaded: () => {},
  bubbleLeft: width - (width / 5) - (width / 50),
  bubbleTop: Platform.OS === 'ios' ? height - (width / 5) - (width / 50) : height - (width / 5) - (width / 13),
  chatTitle: 'Chat with us!',
  greeting: 'Welcome to our LiveChat!\nHow may We help you?',
  noAgents: 'Our agents are not available right now.',
};


/*
  @styles:  these style constant are used to create a presentable ui .
*/

const styles = StyleSheet.create({
  hide: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
  container: {
    width,
    height: Platform.OS === 'ios' ? height : height - height / 25,
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  safeArea: {
      flex: 1,
      backgroundColor: '#ddd'
  },
  navigation: {
    flex: 1,
  },
  systemMessage: {
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  status: {
    textAlign: 'center',

    fontSize: totalSize(2.1),
    fontWeight: '500',
    color: '#fff',
    paddingTop: 80,
  },
  textArea: {
      height:50,
      borderRadius:3,
      justifyContent: "flex-start",
      paddingLeft:10,
      fontSize:18,
      marginBottom:10,
      width: '100%',backgroundColor: '#ffffff',color:'#000'
    },
    textAreaMsg: {
        height:80,
        borderRadius:3,
        justifyContent: "flex-start",
        paddingLeft:10,
        fontSize:18,
        marginBottom:10,
        width: '100%',backgroundColor: '#ffffff',color:'#000'
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
    MainContainer:
            {
                flex: 1,
            },
            imgBackground: {
                width: '100%',
                height: '100%',

            },
});
