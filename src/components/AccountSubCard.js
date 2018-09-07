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
  var dict = {};
  console.log('SubCard');
  // console.log(this.props.arrayDescription[0]);
  // dict.left = 'Name';
  // dict.right = this.props.arrayDescription[0].name;
  // this.state.arrData.push(dict);
  // dict.left = 'ID';
  // dict.right = this.props.arrayDescription[0].ID;
  // this.state.arrData.push(dict);

  console.log(this.state.arrayDescription);

}

setData() {
  var dict = {};
  var dict1 = {};
    var dict2 = {};
  console.log('ProfileDidMountcall');
  console.log(this.props.arrayDescription[0]);
  dict.left = 'ID';
  dict.right = this.props.arrayDescription[0].ID;

  this.state.arrData.push(dict);
  dict1.left = 'Name';
  dict1.right = this.props.arrayDescription[0].name;
  this.state.arrData.push(dict1);
  dict2.left = 'MemberNo';
  dict2.right = this.props.arrayDescription[0].memberNo;
  this.state.arrData.push(dict2);

  console.log('wiout join');
  console.log(this.state.arrData);
}


renderView() {
return this.state.arrayDescription.map((array, index) =>
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
  justifyContent: 'flex-end',
alignItems: 'flex-end'

},


};

export default AccountSubCard;
