import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export class Settings extends Component {
  render() {
    return (
      <View>
        <Text>This is the Settings screen</Text>
        <Button onPress={() => this.props.navigation.navigate('HomeScreen')} title="Home"/ >
      </View>
    )
  }
};

export default Settings;
