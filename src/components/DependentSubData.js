import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class DependentSubData extends Component {

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
 <View style={{ marginBottom: 10,backgroundColor: '#ffffff', }}>
  <View style={styles.textrow}>
      <View style={{ width: '50%' }} >
          <Text style={styles.textSub} key={index}>Name</Text>
      </View>
      <View style={{ width: '50%' }}>
          <Text style={styles.textSubRight} key={index}>{array.name}</Text>
      </View>
 </View>
  <View style={styles.textrow}>
      <View style={{ width: '50%' }} >
          <Text style={styles.textSub} key={index}>Gender</Text>
      </View>
      <View style={{ width: '50%' }}>
          <Text style={styles.textSubRight} key={index}>{array.gender}</Text>
      </View>
 </View>

  <View style={styles.textrow}>
      <View style={{ width: '50%' }} >
          <Text style={styles.textSub} key={index}>Birthdate</Text>
      </View>
      <View style={{ width: '50%' }}>
          <Text style={styles.textSubRight} key={index}>{array.birthdate}</Text>
      </View>
 </View>

  <View style={styles.textrow}>
      <View style={{ width: '50%' }} >
          <Text style={styles.textSub} key={index}>Relationship</Text>
      </View>
      <View style={{ width: '50%' }}>
          <Text style={styles.textSubRight} key={index}>{array.relationship}</Text>
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
textStyle: {
  color: '#ff7417',
  fontSize: 18,

},
textSub: {
  color: 'black',
  fontSize: 14,


},
textrow: {
  color: 'black',
  fontSize: 16,
flexDirection: 'row',
 borderBottomWidth: 1,
borderColor: '#dedede',
padding: 10
},
textSubRight: {
  color: 'black',
  fontSize: 14,

  textAlign: 'right'

},


};

export default DependentSubData;
