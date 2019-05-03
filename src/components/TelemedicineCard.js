import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

class TelemedicineCard extends Component {

  constructor(props) {
      super(props);
      this.props = props;
    }
componentWillMount() {
//console.log(this.props.arrayDescription);
}



renderView() {
var keyId = 0;
const htmlContent = `
  <div>Access board-certified doctors any time of day or night, at $0 Cost. Doctors will speak to you over the phone, diagnose your condition, and prescribe medicine if needed. Teladoc is good for many problems, including:\n<ul><li>Cold and flu</li>\n\t<li>Bronchit</li>\n\t<li>pin</li>\n</ul></div>
`;

// Access board-certified doctors any time of day or night, at $0 Cost. Doctors will speak to you over the phone, diagnose your condition, and prescribe medicine if needed. Teladoc is good for many problems, including:
// &lt;ul&gt;&lt;li&gt;Cold and flu&lt;/li&gt;
// 	&lt;li&gt;Bronchit&lt;/li&gt;
// 	&lt;li&gt;pin&lt;/li&gt;
// &lt;/ul&gt;

return this.props.arrayDescription.map(objectValue =>

  <View style={{ flexDirection: 'row', paddingTop: 5, paddingRight: 20 }}>
      <View style={{padding: 10 }}>
        <HTML html={objectValue}  />
      </View>
    </View>

  );
}

 render() {
    return (
      <ScrollView style={{height: '100%' }}>
      <View style={{ backgroundColor: '#fff', marginTop: 1 }}>
      <View style={{ height: 40, marginTop: 10, padding: 10 }} >
            <Text style={styles.textStyle}>Telemedicine Features</Text>

        </View>
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
                                color: '#00dcc3',
                                fontSize: 18,

                            },
                            textSub: {
                                color: 'black',
                                fontSize: 18,

                            },
                            bullet: {
                                width: 20,
                                alignItems: 'center',
                                fontWeight: 'bold',
                                paddingLeft: 5,
                            }

                        };
export default TelemedicineCard;
