import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class AccountSubCard extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
          arrData: [],

      };
    }
componentWillMount() {

  //console.log('SubCard');
  //console.log(this.props.arrayDescription);
  this.setData();

}

setData() {
  var dict = {};
  var dict1 = {};
  var dict2 = {};
  var dict3 = {};
  var dict4 = {};
  var dict5 = {};
  var dict6 = {};
  var dict7 = {};
  //console.log('ProfileDidMountcall');
  //console.log(this.props.arrayDescription[0]);
  dict1.left = 'Name';
  dict1.right = this.props.arrayDescription[0].name;
  this.state.arrData.push(dict1);


  dict.left = 'ID Number';
  dict.right = this.props.arrayDescription[0].ID;

  this.state.arrData.push(dict);

  dict2.left = 'Primary Language';
  dict2.right = 'English';
  this.state.arrData.push(dict2);


  dict3.left = 'Email';
  dict3.right = this.props.arrayDescription[0].email;
  this.state.arrData.push(dict3);

  dict7.left = 'Address';
  dict7.right = this.props.arrayDescription[0].billAddress.street;
  this.state.arrData.push(dict7);

  dict4.left = 'City';
  dict4.right = this.props.arrayDescription[0].billAddress.city;
  this.state.arrData.push(dict4);

  dict5.left = 'State';
  dict5.right = this.props.arrayDescription[0].billAddress.state;
  this.state.arrData.push(dict5);

  dict6.left = 'Zip Code';
  dict6.right = this.props.arrayDescription[0].billAddress.zip;
  this.state.arrData.push(dict6);


  //console.log(this.state.arrData);
}


renderView() {
return this.state.arrData.map((array, index) =>
  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10 }}>
      <View style={{ width: '50%' }} >
          <Text style={styles.textSub} key={index}>{array.left}</Text>
      </View>
      <View style={{ width: '50%' }}>
          <Text style={styles.textSubRight} key={index}>{array.right}</Text>

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
textSubRight: {
  color: 'black',
  fontSize: 14,

  textAlign: 'right'

},


};

export default AccountSubCard;
