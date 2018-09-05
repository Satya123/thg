import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';


class PoliciesCard extends Component {

  constructor(props) {
      super(props);
      this.props = props;
    }
componentWillMount() {
console.log(this.props.arrayDescription);
}


renderView() {
return this.props.arrayDescription.map((array, index) =>
  <View>


       <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
       <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
       <Text style={styles.textSubOne}>PolicyName:</Text>
        <Text style={styles.textSub} key={index}>{array.PolicyName}</Text>
        </View>
      </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
            <Text style={styles.textSubOne}>Value:</Text>
             <Text style={styles.textSub} key={index}>{array.value}</Text>
             </View>
             </View>


          {this.renderViewSub(array.Benifits)}

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 2, borderColor: '#ffffff' }}>
            </View>

    </View>

  );
}


renderViewSub(arrayData) {
return arrayData.map((array, index) =>

  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
  {

    (index === 0) ? <Text style={styles.textSubOne}>Benifits:</Text> : <Text style={styles.textSubOne} />

  }

  <View style={{ width: 25, height: 25, }} >
      <Image source={require('../../assets/bullat-arrow25x25.png')} />
  </View>
   <Text style={styles.textSubBenifet} key={index}>{array}</Text>
   </View>


  );
}


  render() {
    return (
      <ScrollView style={{ backgroundColor: '#ffffff', width: '100%' }}>
      <View style={{ backgroundColor: '#f3f3f3', marginTop: 2 }}>


          {this.renderView()}
        </View>


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
textSubBenifet: {
  color: 'black',
  fontSize: 15,
  width: '62%',
  paddingBottom: 10,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'left',
},
textSub: {
  color: 'black',
  fontSize: 15,
  width: '67%',
  paddingBottom: 10,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'left',


},
textSubOne: {
  color: 'black',
  fontSize: 15,
  width: '33%',
  paddingRight: 10,
  paddingBottom: 10,
  fontWeight: 'bold',
  textAlign: 'right',

},


};

export default PoliciesCard;
