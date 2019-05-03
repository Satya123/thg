/* DependentSubData.js
  THG App
  This file use to present Dependent details .
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

class DependentSubData extends Component {
  /*
    @props: Get the Dependents list.
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
            <View style={{marginBottom: 10, backgroundColor: '#ffffff', }}>
                <View style={styles.textrow}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Name</Text>
                    </View>
                    <View style={{width: '50%' }}>
                        <Text style={styles.textSubRight} key={index}>{` ${array.fisrtName} ${array.lastName.toString()}`}</Text>
                    </View>
                </View>
                <View style={styles.textrow}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Gender</Text>
                    </View>
                    <View style={{width: '50%' }}>
                        <Text style={styles.textSubRight} key={index}>{array.gender.toString()}</Text>
                    </View>
                </View>

                <View style={styles.textrow}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Birthdate</Text>
                    </View>
                    <View style={{width: '50%' }}>
                        <Text style={styles.textSubRight} key={index}>{array.birthDate.toString()}</Text>
                    </View>
                </View>

                <View style={styles.textrow}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Relationship</Text>
                    </View>
                    <View style={{width: '50%' }}>
                        <Text style={styles.textSubRight} key={index}>{array.memberRelation.toString()}</Text>
                    </View>
                </View>
            </View>

            );
      }
  /*
    @render: this function use to present the UI of this components .
*/
  render() {
      return (
              <ScrollView style={{marginBottom:10}}>
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
            shadowOffset: {width: 1, height: 2},
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
