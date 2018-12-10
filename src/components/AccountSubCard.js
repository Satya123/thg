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
        render() {
        return (
<ScrollView>
    <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Name</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>{this.props.arrayDescription[0].name}</Text>
        </View>
    </View>
    {/*End row */}
    <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>ID Number</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>{this.props.arrayDescription[0].ID}</Text>
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
            <Text style={styles.textSub}>email</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>{this.props.arrayDescription[0].email}</Text>
        </View>
    </View>
    {/*End row */}
    <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Address</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.street}</Text>
        </View>
    </View>
    {/*End row */}
    <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>City</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.city}</Text>
        </View>
    </View>
    {/*End row */}
    <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>State</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.state}</Text>
        </View>
    </View>
    {/*End row */}
    <View style={styles.maniRow}>
        <View style={styles.fiftypercent} >
            <Text style={styles.textSub}>Zip Code</Text>
        </View>
        <View style={styles.fiftypercent}>
            <Text style={styles.textSubRight}>{this.props.arrayDescription[0].billAddress.zip}</Text>
        </View>
    </View>
    {/*End row */}
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
        export default AccountSubCard;
