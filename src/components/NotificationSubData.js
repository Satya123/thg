import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class NotificationSubData extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
          arrData: [],

      };
    }
componentWillMount() {

  console.log('SubCard');
  console.log(this.props.arrayDescription);
 // this.setData();

}




renderView() {
return this.props.arrayDescription.map((array, index) =>
                 <View style={{ backgroundColor: '#ffffff', }}>
                    <View style={styles.textrow}>
                         <View style={{ width: '95%'}} >
                            <Text style={styles.textSub} >{array.notification}</Text>

                        </View>
                        <View style={{ width: '5%'}}>
                            <Text style={styles.textSubRightImage} ><Image  source={require('../../assets/notification-arrow-unread.png')} /></Text>
                        </View>
                    </View>
                    <View style={styles.textrowGray}>

                     <View style={{ width: '95%' }} >
                           <Text style={styles.textSub} >It is last established fact that reader will be distracted by redable content of the page</Text>
                       </View>

                        <View style={{ width: '5%' }}>
                            <Text style={styles.textSubRightImage} ><Image  source={require('../../assets/notification-arrow-read.png')} /></Text>
                        </View>
                    </View>
                 </View>

  );
}


  render() {

    return (
      <ScrollView>
      {this.renderView()}
      </ScrollView>

    );
  }


}


const styles = {

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
imgBackground: {
      height: '100%',
      width: '100%',
     },
textrow: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
 borderBottomWidth: 1,
borderColor: '#dedede',

},

textrowGray: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
borderBottomWidth: 1,
backgroundColor:'#dedede',
borderColor: '#dedede',

},

textSub: {
  color: 'black',
  fontSize: 16,
  lineHeight:20,
  textAlign: 'justify',
  padding:10
},
textSubRightImage: {
 justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  paddingTop:30
}
};

export default NotificationSubData;
