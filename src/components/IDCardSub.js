import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class IDCardSub extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = {


      };
    }
componentWillMount() {

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

export default IDCardSub;
