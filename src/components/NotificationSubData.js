import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
class NotificationSubData extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            arrData: [],

        };
    }

    renderView() {
        return this.props.arrayDescription.map((array, index) =>
            <ScrollView>
                {(array.status === 'Unread') ? <View style={styles.textrowGray}>
                    <View style={{width: '95%', padding: 10}} >
                        <Text style={styles.textMain} >{array.subject}</Text>
                        <Text style={styles.textSub} >{array.message}</Text>
                    </View>
                </View> : <View style={styles.textrow}>
                    <View style={{width: '95%', }} >
                        <Text style={styles.textMain} >{array.subject}</Text>
                        <Text style={styles.textSub} >{array.message}</Text>
                    </View>
                </View>}
            </ScrollView>

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
                shadowOffset: {width: 1, height: 2},
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
                fontSize: 14,
                flexDirection: 'row',
                borderBottomWidth: 1,
                backgroundColor: '#dedede',
                borderColor: '#464646',
                borderBottomWidth: 1,
         },

            textMain: {
                color: 'black',
                fontSize: 16,
                lineHeight: 20,
                textAlign: 'justify',

            },
            textSub: {
                color: 'black',
                fontSize: 14,
                lineHeight: 20,
                textAlign: 'justify',

            },

        };

        export default NotificationSubData;