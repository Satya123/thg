import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Alert, WebView,TouchableOpacity } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Progress from 'react-native-progress';
import DeviceInfo from 'react-native-device-info';
import Pdf from 'react-native-pdf';
import ResponsiveImage from 'react-native-responsive-image';


class PoliciesCard extends Component {
  /*
    @props: Get the Polocies list.
*/
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        isReadMode: true,
        isVisible: false,
      };
    }
/*
  @setImage:this function use for show benifite Polocies pdf.
  @url: Pdf url which get in Policies Api
*/
  setImage(url,benefitsDetailsContentType) {
    //console.log(url);

    if (benefitsDetailsContentType === 'image/jpeg' || benefitsDetailsContentType === 'image/png'){

      this.setState({isPDF:false});

    }else{
      this.setState({isPDF:true});
    }

     this.setState({
      isVisible : true ,
       urlImg: url
    });
  }
/*
  @hidePoliciesPdf: this function close Pdf file.
*/
  hidePoliciesPdf=()=>{
    this.setState({
      isVisible : false

    });

  }


renderView() {
  const{
    isView,
  }=this.state;

  /*
    @renderView: this function made cell on the basis of array count and array descriptions .
*/
return this.props.arrayDescription.map((array, index) =>

            <View style={{marginBottom: 10 }}>
                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Type</Text>
                    </View>
                    <View style={{width: '50%' }}>
                    {
                      (array.type.toString() == '') ? <Text style={styles.textSubRight} key={index}>N/A</Text> : <Text style={styles.textSubRight} key={index}>{array.type.toString()}</Text>
                    }

                   </View>
                 </View >
                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Status</Text>
                    </View>
                    <View style={{width: '50%' }}>
                    {
                      (array.status.toString() == '') ? <Text style={styles.textSubRight} key={index}>N/A</Text>  : <Text style={styles.textSubRight} key={index}>{array.status.toString()}</Text>
                    }


                    </View>
               </View>
              <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub.toString()} key={index}>Effective Date</Text>
                    </View>
                    <View style={{width: '50%' }}>


                        {
                          (array.effectiveDate.toString() == '') ? <Text style={styles.textSubRight} key={index}>N/A</Text>  : <Text style={styles.textSubRight} key={index}>{array.effectiveDate.toString()}</Text>
                        }

                    </View>
                </View>
               <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Cancellation Date</Text>
                    </View>
                    <View style={{width: '50%' }}>

                        {
                          (array.cancelDate.toString() == '') ? <Text style={styles.textSubRight} key={index}>N/A</Text>  : <Text style={styles.textSubRight} key={index}>{array.cancelDate.toString()}</Text>
                        }
                   </View>
                </View>
                 <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
                    <View style={{width: '50%' }} >
                        <Text style={styles.textSub} key={index}>Network</Text>
                    </View>
                    <View style={{width: '50%' }}>
                    {
                      (array.network.toString() == '') ? <Text style={styles.textSubRight} key={index}>N/A</Text>  : <Text style={styles.textSubRight} key={index}>{array.network.toString()}</Text>
                    }


                    </View>
                </View>
                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
                    <View style={{width: '80%' }} >
                        <Text style={styles.textSub} key={index}>Benefits</Text>
                    </View>
                    <View style={{width: '20%', height: 25}}>

                      {
                        (array.benefitsDetails.toString() === '') ? <Text style={styles.textSubRight} key={index}>N/A</Text>  :
                         <TouchableHighlight
                                onPress={() => {
                                    this.setImage(array.benefitsDetails.toString(),array.benefitsDetailsContentType.toString());
                                }}>
                              <Image style={{width:54,height:25,marginLeft:20}} source={require('../../assets/view-icon.png')} />
                            </TouchableHighlight>
                      }



                    </View>

                  </View>

            </View>

  );
}
/*
  @clickToReadMore: this function open Policies Pdf file.
*/
clickToReadMore = id => {
    //console.log(id);
      this.setState({ isReadMode: false });
}

/*
  @render: this function use to present the UI of this components.
  @it also show Popup for Pdf.
*/

 render() {

    const {
    isVisible,
      urlImg,
  } = this.state;
  const source = { uri: urlImg, cache: true };

    return (
   <View style={styles.MainContainer}>

         {
           (this.state.isVisible === true) ?  <View style={{position:'absolute',zIndex:1,height: '95%', width: '100%',  backgroundColor: 'rgba(0, 0, 0, 0.1)'}}><View style={styles.SplashScreen_RootView}>

           {
             (this.state.isPDF === true) ?   <Pdf
                    source={source}

                    style={styles.pdf}/> :

                    <WebView
                    originWhitelist={['*']}
                    automaticallyAdjustContentInsets={false}
                    source={{ html: '<img src="'+this.state.urlImg+'" alt="undefined" style="float:none;width: 100%;height: auto;margin-top:50"/>'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    />

           }




                  <TouchableOpacity
                  activeOpacity = { 0.5 }
                  style={styles.TouchableOpacity_Style}
                  onPress={this.hidePoliciesPdf} >

                    <Image source={require('../../assets/close.png')}
                    style={{width:25, height: 25}} />

                </TouchableOpacity>


            </View></View> : null
          }

       <View style={{height: '100%', width: '100%'}}>
           <ScrollView >

          {this.renderView()}

          <View style={{width: '100%', height: 50}}><Text></Text></View>
          </ScrollView>
        </View>
      </View>

    );
  }


}
/*
  @styles:  constant are use to make a  presentable ui .
*/
const styles = {

pdf:{
  flex:1,
  marginTop:50,
},
containerPDF: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   },

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

},  SplashScreen_RootView:
    {
        justifyContent: 'center',
        flex:1,

        position: 'absolute',
        width: '100%',
        height: '100%',

    },

    SplashScreen_ChildView:
    {

        backgroundColor: 'rgba(0, 0, 0, 0.9)',

        flex:1,
        margin: 0,
    },

    TouchableOpacity_Style:{

        width:25,
        height: 25,
        top:9,
        right:9,
        position: 'absolute'

    },
  MainContainer:
   {
flex: 0,
 width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:"center"


   },

};

export default PoliciesCard;