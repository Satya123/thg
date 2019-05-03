/* NotificationSubData.js
  THG App
  This file use for show Notifications Contant.
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class NotificationSubData extends Component {
  /*
    @props: Get the Notification list.
*/
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
          arrData: [],

      };
    }
    /*
      @renderView: this function made cell on the basis of array count and array descriptions .
  */

renderView() {
return this.props.arrayDescription.map((array, index) =>
   <ScrollView>

                   {(array.status==='Unread')?  <View style={styles.textrowGray}>
                          <View style={{ width: '95%', padding:10}} >
                             <Text style={styles.textMain} >{array.subject}</Text>
                             <Text style={styles.textSub} >{array.message}</Text>
                         </View>
                     </View>:  <View style={styles.textrow}>
                            <View style={{ width: '95%',}} >
                               <Text style={styles.textMain} >{array.subject}</Text>
                               <Text style={styles.textSub} >{array.message}</Text>
                           </View>
                       </View>}
  </ScrollView>

  );
}

/*
  @render: this function use to present the UI of this components .
*/
  render() {

    return (
      <ScrollView>
      {this.renderView()}
      </ScrollView>

    );
  }


}

/*
  @styles:  these style constant are used to create a presentable ui .
*/
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
borderColor: '#464646',
borderBottomWidth:1,
//borderStyle: 'dotted',

},

textMain: {
  color: 'black',
  fontSize: 20,
  lineHeight:20,
  textAlign: 'justify',

},
textSub: {
  color: 'black',
  fontSize: 16,
  lineHeight:20,
  textAlign: 'justify',

},

};

export default NotificationSubData;
