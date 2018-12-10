import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
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
        this.state = {count: 0,
            isHome: this.props.isHome,
            isProfile: this.props.isProfile,
            isMenu: this.props.isMenu,

            isNotification: this.props.isNotification
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('profileArray')
   .then((contacts) => {
   const value = contacts ? JSON.parse(contacts) : [];
   //console.log(value);
   this.setState({ arrayValue: value })
 });
    }

    clickToHome = () => {
        Actions.HomeScreen();
        // Actions.AccountInfo({ userData: this.props.profileData });
    }
    clickToProfile = () => {
        Actions.AccountInfo({userData: this.state.arrayValue});

    }
    clickToNotification = () => {
        Actions.Notification();
    }
    clickToMenu = () => {
        Actions.Menu();
    }

    render() {
        const {
            isHome, isProfile, isNotification, isMenu
        } = this.state;

        //console.log(isProfile);
        return (
                <View>
                    <View style={styles.shadow1}>
                        <Image  source={require('../../assets/b.png')} />
                    </View>
                    <View style={styles.footerView}>
                
                        <TouchableOpacity
                            onPress={this.clickToHome}
                            title=""
                            >
                            {
                    (isHome === true) ? <Image source={require('../../assets/home-active.png')} /> : <Image source={require('../../assets/home.png')} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.clickToProfile}
                            >
                
                            {

                    (isProfile === true) ? <Image source={require('../../assets/user-active.png')} /> : <Image source={require('../../assets/user.png')} />
                            }
                        </TouchableOpacity>
                
                
                        <TouchableOpacity
                            onPress={this.clickToNotification}
                            title=""
                            >
                            {  (isNotification === true) ? <Image source={require('../../assets/notification-active.png')} /> : <Image source={require('../../assets/notification.png')} />}
                        </TouchableOpacity>
                
                
                        <TouchableOpacity
                            onPress={this.clickToMenu} >
                            {
                    (isMenu === true) ? <Image source={require('../../assets/list-active.png')} /> : <Image source={require('../../assets/list.png')} />
                            }
                        </TouchableOpacity>
                    </View>
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
    shadow1: {
        //  margin: 0,
        marginBottom: 0,
        padding: 0,
        alignItems: 'center',
    },

};

export default CustomFooter;
