import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet

} from 'react-native';
import { createMaterialBottomTabNavigation } from 'react-navigation-material-bottom-tabs';
import SettingsScreen from './SettingsScreen';


class BottomNav extends Component {
  render() {
    return (
        <View style={style.container}>
          <Text>Tab Navigation</Text>
        </View>

    );
  }
}

export default createMaterialBottomTabNavigation({
  Home: { screen: BottomNav },
  Settings: { screen: SettingsScreen }

});

const style = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }

});
