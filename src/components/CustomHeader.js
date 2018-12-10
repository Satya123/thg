import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
class CustomHeader extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = { count: 0 };
    }
 render() {
      return (
                <View style={styles.containerView}>
                    <View style={{paddingTop: 5}}>
                    <TouchableOpacity
                      onPress={() => Actions.pop()}
                      title=""
                    >
                                      <Image
      
                                             source={require('../../assets/back-arrow25x25.png')}
                                      />
                        </TouchableOpacity>
                          </View>
                          <View style={{width: '85%', height: 40, paddingTop: 5}} >
                            <Text style={styles.textStyle}>{this.props.headerText}</Text>
      
                        </View>
                  </View>


      );
    }

}


const styles = {

  containerView: {
    flex: 0,
      justifyContent: 'space-around',
      backgroundColor: '#ff7417',
      flexDirection: 'row',
      paddingTop: 10,
      height: 60,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
  },

  ImageStyle: {
     height: 25,
      width: 25,
},

  textStyle: {
    fontSize: 20,
    color: 'white',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'

  }
};





export default CustomHeader;
