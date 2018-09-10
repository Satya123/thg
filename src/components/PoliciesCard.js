import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class PoliciesCard extends Component {

  constructor(props) {
      super(props);
      this.props = props;
    }
componentWillMount() {
//  debugger;
console.log(this.props.arrayDescription);
}


renderView() {
return this.props.arrayDescription.map((array, index) =>
<View style={{ marginBottom: 10 }}>
  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Type</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.Type}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Status</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.Status}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>EffectiveDate</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.EffectiveDate}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>CancellationDate</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.CancellationDate}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Network</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.Network}</Text>

    </View>

  </View >




    <View style={{ backgroundColor: '#ffffff', padding: 10 }}>
    <Text style={styles.textSub}>Benifits:</Text>
    {this.renderViewSub(array.Benifits)}
    </View>
  </View>

  );
}


renderViewSub(arrayData) {
return arrayData.map((array, index) =>

  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>


  <View style={{ width: 25, height: 25, }} >
      <Image source={require('../../assets/bullat-arrow25x25.png')} />
  </View>
   <Text style={styles.textSub} key={index}>{array}</Text>
   </View>


  );
}


  render() {
    return (
      <ScrollView style={{ width: '100%' }}>



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
textBenifet: {
  color: 'black',
  fontSize: 15,
  width: '30%',
  paddingBottom: 10,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'right',
},
textSubBenifet: {
  color: 'black',
  fontSize: 15,
  width: '62%',
  paddingBottom: 10,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'left',
},
textSubone: {
  color: 'black',
  fontSize: 15,
  fontWeight: 'bold',

  width: '50%'

},
textSubOne: {
  color: 'black',
  fontSize: 15,
  fontWeight: 'bold',
  textAlign: 'right',
  width: '50%'

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

export default PoliciesCard;
