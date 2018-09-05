import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class TelemedicineCard extends Component {

  constructor(props) {
      super(props);
      this.props = props;
    }
componentWillMount() {
console.log(this.props.arrayDescription);
}


renderView() {
  var keyId = 0;

return this.props.arrayDescription.map(array =>
  <View style={{ flexDirection: 'row', paddingTop: 5, paddingRight: 20 }}>
      <View style={{ width: 25, height: 25, }} >
          <Image source={require('../../assets/bullat-arrow25x25.png')} />
      </View>
      <View>
          <Text style={styles.textSub} key={keyId}>{array}</Text>

      </View>
    </View>

  );
}


  render() {
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <View style={{ backgroundColor: '#f3f3f3', marginTop: 1 }}>
      <View style={{ height: 40, marginTop: 10, padding: 10 }} >
            <Text style={styles.textStyle}>Telemedicine Features</Text>

        </View>

          {this.renderView()}
        </View>
        <View style={{ backgroundColor: '#f3f3f3', marginTop: 1 }}>
        <View style={{ height: 40, marginTop: 10, padding: 10 }} >
              <Text style={styles.textStyle}>How to Activate</Text>

          </View>

            {this.renderView()}
          </View>
          </ScrollView>


    );
  }


}


// <View style={{ flexDirection: 'row', padding: 5 }}>
//     <View style={{ width: 35, height: 35, }} >
//         <Image source={require('../../assets/bullat-arrow25x25.png')} />
//     </View>
//     <View>
//         <Text style={styles.textSub}>Lorem Ipsum is simply dummy the </Text>
//     </View>
//   </View>
//
//
// </View>




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
textStyle: {
  color: '#ff7417',
  fontSize: 18,

},
textSub: {
  color: 'black',
  fontSize: 18,


},


};

export default TelemedicineCard;
