import React, { Component } from 'react';
import { Text, View ,ImageBackground, AsyncStorage,SafeAreaView,TouchableOpacity} from 'react-native';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import { Actions } from 'react-native-router-flux';
import UserData from './UserData';


class Menu extends Component {

  constructor(props) {
      super(props);
      this.state = {
          arrayValue: [],
              isProfile: false,
              isHome: false,
              isMenu: true,
              isNotification: false,
            };
    }
    clickToLogOut = () => {

        UserData.saveData('token', '');
        this.setState({ isLogOut: true });

      // Actions.popTo('Login',{'name':'Login'})
      // Actions.refresh({ key: 'Login', text: '' });

      Actions.Login({isHide:true});
      Actions.refresh({ key: 'Login', text: '' });

    }

    componentWillMount() {
      //console.log('componentWillMount call Telemedicine');


    AsyncStorage.getItem('profileArray')
    .then((contacts) => {
    const value = contacts ? JSON.parse(contacts) : [];

    //console.log(value);
    this.setState({ arrayValue: value })
  });

    }

    render() {
      const{
        arrayValue
      } = this.state
      return (
<SafeAreaView style={styles.safeArea}>
                    <View style={styles.MainContainer}>
                        <View style={{width: '100%', }}>
                            <CustomHeader headerText={'Menu'} />
                        </View>

                        <ImageBackground
                            style={styles.imgBackground}
                            resizeMode='cover'
                            source={require('../../assets/backgroundBlue.png')} >
                            <View style={{height: '95%', width: '100%' }}>
                                <View style={{margin: 10, backgroundColor: '#ffffff' }}>

                                </View>

                                <TouchableOpacity
                                    onPress={this.clickToLogOut}>
                                    <View style={{margin: 10, backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{color: 'red', textAlign: 'center'}}>Log out</Text>
                                    </View>

                                </TouchableOpacity>


                            </View>
                        </ImageBackground>
                        <View style={styles.footerView}>
                            <CustomFooter
                                isProfile={this.state.isProfile}
                                isHome={this.state.isHome}
                                isMenu={this.state.isMenu}
                                isNotification={this.state.isNotification}
                                profileData={arrayValue}
                                />
                        </View>
                    </View>
</SafeAreaView>

      );
    }


}
const styles = {
                                safeArea: {
                                    flex: 1,
                                    backgroundColor: '#ddd'
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
                                imgBackground: {
                                    width: '100%',
                                    height: '100%',

                                },
                                textStyle: {

                                    color: '#fff',
                                    fontSize: 22
                                }
};


    export default Menu;
