<TouchableOpacity
   activeOpacity = { 0.5 }
   style={styles.TouchableOpacity_Style}
   onPress={this.HideSplashScreen} >
   <Image source={require('../../assets/splash-screen.jpg')}
   style={{width:25, height: 25}} />
 </TouchableOpacity>





                 <View style={styles.SplashScreen_RootView}>

                     <View style={styles.SplashScreen_ChildView}>



                         <Image source={require('../../assets/splash-screen.jpg')}
                         style={{width:'100%', height: '100%', resizeMode: 'contain'}} />

                     </View>

                        </View>);


// Index.js

/** @format */
import React from 'react';
import { AppRegistry, View } from 'react-native';


 // import CustomHeader from './src/components/CustomHeader';
 // import Telemedicine from './src/components/Telemedicine';
import Login from './src/components/Login';
//import BottomNav from './src/components/BottomNav';


const App = () => (
  <Login />

);


AppRegistry.registerComponent('albums', () => App);


// <CustomHeader headerText={'Telemedicine'} />
// <Telemedicine name={'Hello'} />







//headerText
headerLeft: (
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ require('./assets/back-arrow25x25.png') }/>
    </TouchableOpacity>
    <CustomHeader headerText={'Telemedicine'} />
),






<View style={styles.containerView}>
    <View style={{ width: 25, height: 25, margin: 5 }} >
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      title=""
    >
                      <Image

                             source={require('./assets/back-arrow25x25.png')}
                      />
        </TouchableOpacity>
          </View>
      <View style={{ width: 300, height: 40, marginTop: 5 }} >
            <Text style={styles.textStyle}>{'Telemedicine'}</Text>

        </View>
  </View>




  // Home screenfooter


  <View style={{
          //flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 0,
          padding:10,
          backgroundColor:'#ffffff'

        }}>
          <View style={{marginLeft:8,}}><Image  source={require('../../assets/home-active.png')} /></View>
          <View><Image  source={require('../../assets/user.png')} /></View>
          <View><Image  source={require('../../assets/notification.png')} /></View>
          <View style={{marginRight:8,}}><Image  source={require('../../assets/list.png')} /></View>
        </View>


        // Splash

        (

                        <View style={styles.SplashScreen_RootView}>

                            <View style={styles.SplashScreen_ChildView}>



                                <Image source={require('../../assets/splash-screen.jpg')}
                                style={{width:'100%', height: '100%', resizeMode: 'contain'}} />

                            </View>

                               </View>);

                               {
                                                 (this.state.isVisible === true) ? Splash_Screen : null
                                               }









//footerView



import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Menu from './Menu';
import Notification from './Notification';
import { createStackNavigator, } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

class CustomFooter extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = { count: 0,
                      isHome: true,
                      isProfile: false,
                      isMenu: false,
                      isNotification: false
      };
    }


clickToHome = () => {
  this.state.isProfile = false;
  this.state.isHome = true;
  this.state.isMenu = false;
  this.state.isNotification = false;
   Actions.HomeScreen();
}
clickToProfile = () => {
  this.state.isProfile = true;
  this.state.isHome = false;
  this.state.isMenu = false;
  this.state.isNotification = false;
  Actions.Profile();
}
clickToNotification = () => {
  this.state.isProfile = false;
  this.state.isHome = false;
  this.state.isMenu = false;
  this.state.isNotification = true;

  Actions.Notification();
}
clickToMenu = () => {
  this.state.isProfile = false;
  this.state.isHome = false;
  this.state.isMenu = true;
  this.state.isNotification = false;
  Actions.Menu();
}


    render() {
      return (
        <View style={styles.footerView}>
        <TouchableOpacity
          onPress={this.clickToHome}
          title=""
        >
        {
          (this.state.isHome === true) ? <Image source={require('../../assets/home-active.png')} /> : <Image source={require('../../assets/home.png')} />
        }


            </TouchableOpacity>


            <TouchableOpacity
              onPress={this.clickToProfile}

            >
                      (this.state.isProfile === true) ? <Image source={require('../../assets/user-active.png')} /> : <Image source={require('../../assets/user.png')} />
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={this.clickToNotification}
                  title=""
                >
                          (this.state.isNotification === true) ? <Image source={require('../../assets/notification-active.png')} /> : <Image source={require('../../assets/notification.png')} />
                    </TouchableOpacity>


                    <TouchableOpacity
                      onPress={this.clickToMenu}
                      title=""
                    >
                        (this.state.isMenu === true) ? <Image source={require('../../assets/list-active.png')} /> : <Image source={require('../../assets/list.png')} />

                        </TouchableOpacity>



              </View>


      );
    }





}


const styles = {

  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    padding: 10,
    backgroundColor: '#ffffff'


  },


};

export default CustomFooter;



// RouterComponent

<Scene
key='Telemedicine'
component={Telemedicine}
navTransparent
navBar={

              CustomHeader
        }

/>
//PROFILE

<View style={styles.MainContainer}>
      <Text>Profile</Text>
  </View>
  <View>
      <CustomFooter
      isProfile={this.state.isProfile}
      isHome={this.state.isHome}
      isMenu={this.state.isMenu}
      isNotification={this.state.isNotification}
      />
  </View>




///AccountInfo


<View style={{ height: 30, borderBottomWidth: 2, width: '30%' }}><Text>Porfile</Text></View>
<View style={{ height: 30, borderBottomWidth: 2, width: '30%' }}><Text>Depedents</Text></View>
<View style={{ height: 30, borderBottomWidth: 2, width: '30%' }}><Text>Policies & Benifits</Text></View>





<View style={styles.topView}>

<TouchableOpacity
style={(this.state.isProfile === true) ? styles.firstTextActive : styles.firstText}
activeOpacity={0.5}
onPress={() => { this.clickToProfile(); }}
>
<Text style={{ color: '#ff7417' }}>PROFILE</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.secondText}
activeOpacity={0.5}
onPress={() => { this.clickToDependents(); }}
>
<Text>DEPENDENTS</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.ThirdText}
activeOpacity={0.5}
onPress={() => { this.clickToPolicies(); }}
>
    <Text>POLICIES & BENIFITS</Text>
</TouchableOpacity>

</View>

// callbcakc
ServiceClass.SecondClassFunctionWithArgument('82503220', '07/01/1997', 'login').then((reData) => {
  console.log(reData);
  Actions.HomeScreen();
}).catch((error) => {
    console.log(error);
});




{
  (loaded === true) ? <ActivityIndicator size="large" color="#0000ff" /> : null
}




const RouterComponent = () => {
    return (
      <Router>
      <Scene key='root' >
      <Scene hideNavBar>
      <Scene key='HomeScreen' component={HomeScreen} title='' />
      <Scene key='Login' component={Login} title='' initial />
      <Scene key='Profile' component={Profile} title='' />
      <Scene key='Menu' component={Menu} title='' />
      <Scene key='Notification' component={Notification} title='' />
      <Scene key='Telemedicine' component={Telemedicine} title='' />
      <Scene key='AccountInfo' component={AccountInfo} title='' />
      <Scene key='Dependents' component={Dependents} title='' />
      <Scene key='Policies' component={Policies} title='' />
      <Scene key='ServiceClass' component={ServiceClass} title='' />
      </Scene>

      </Scene>

      </Router>
    );




    setData() {
      var dict = {};
      var dict1 = {};
        var dict2 = {};
      console.log('ProfileDidMountcall');
      console.log(this.props.dataArray[0]);
      dict.left = 'ID';
      dict.right = this.props.dataArray[0].ID;

      this.state.arrData.push(dict);
      dict1.left = 'Name';
      dict1.right = this.props.dataArray[0].name;
      this.state.arrData.push(dict1);
      dict2.left = 'MemberNo';
      dict2.right = this.props.dataArray[0].memberNo;
      this.state.arrData.push(dict2);
  debugger;
      console.log('wiout join');
      console.log(this.state.arrData);
    }





    /// Policies

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


    //Policecard


    <  <View>
           <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
           <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
           <Text style={styles.textSubOne}>Type </Text>
            <Text style={styles.textSub} key={index}>{array.Type}</Text>
            </View>
          </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.textSubOne}>Status</Text>
                 <Text style={styles.textSub} key={index}>{array.Status}</Text>
                 </View>
                 </View>


              {this.renderViewSub(array.Benifits)}

                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 10, borderColor: '#ffffff' }}>
                </View>

        </View>
