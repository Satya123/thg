
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet

} from 'react-native';


class SettingsScreen extends Component {
  render() {
    return (
        <View style={style.container}>
          <Text>Tab Navigation</Text>
        </View>

    );
  }
}
export default SettingsScreen;


const style = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }

});
