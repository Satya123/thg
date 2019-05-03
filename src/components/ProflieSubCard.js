/* Profile.js
  THG App
  This file use to present User Profile details .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
class ProflieSubCard extends Component {
  /*
    @props: Get the User profile details.
*/
  constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            arrData: [],

        };
      }

      /*
        @render: this function made cell on the basis of array descriptions .
    */
  render() {
      return (
        <View>
       <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Name</Text>
        </View>
        <View style={styles.fiftypercent}>
        {
          (this.props.arrayDescription[0].name.toString() == '') ? <Text style={styles.textSubRight}>N/A</Text> : <Text style={styles.textSubRight}>{this.props.arrayDescription[0].name.toString()}</Text>
        }

      </View>
      </View>
   {/*End row */}
       <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>ID Number</Text>
        </View>
        <View style={styles.fiftypercent}>

            {
              (this.props.arrayDescription[0].ID.toString() == '') ? <Text style={styles.textSubRight}>N/A</Text> : <Text style={styles.textSubRight}>{this.props.arrayDescription[0].ID.toString()}</Text>
            }
        </View>
      </View>
    {/*End row */}
       <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Primary Language</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>English</Text>
        </View>
      </View>
      {/*End row */}
        <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Email</Text>
        </View>
        <View style={styles.fiftypercent}>
        {
          (this.props.arrayDescription[0].email.toString() == '') ? <Text style={styles.textSubRight}>N/A</Text> : <Text style={styles.textSubRight}>{this.props.arrayDescription[0].email.toString()}</Text>
        }

       </View>
      </View>
     {/*End row */}
        <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Address</Text>
        </View>
        <View style={styles.fiftypercent}>
        {
          (this.props.arrayDescription[0].billAddress.street.toString() == '') ? <Text style={styles.textSubRight}>N/A</Text> : <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.street.toString()}</Text>
        }

       </View>
      </View>
     {/*End row */}
        <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>City</Text>
        </View>
        <View style={styles.fiftypercent}>
        {
          (this.props.arrayDescription[0].billAddress.city.toString() == '') ? <Text style={styles.textSubRight}>N/A</Text> : <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.city.toString()}</Text>
        }

       </View>
      </View>
     {/*End row */}
        <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>State</Text>
        </View>
        <View style={styles.fiftypercent}>

            {
              (this.props.arrayDescription[0].billAddress.state.toString() == '') ? <Text style={styles.textSubRight}>N/A</Text> : <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.state.toString()}</Text>
            }
       </View>
      </View>
     {/*End row */}
        <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Zip Code</Text>
        </View>
        <View style={styles.fiftypercent}>
        {
          (this.props.arrayDescription[0].billAddress.zip.toString() == '') ? <Text style={styles.textSubRight}>N/A</Text> : <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.zip.toString()}</Text>
        }

        </View>
      </View>
     {/*End row */}
     </View>
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
 },

  viewTest: {
    flex: 1,
    backgroundColor: 'red'
  },
  fiftypercent: {
   width:'50%'
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
maniRow: {
 flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10

},
};

export default ProflieSubCard;
