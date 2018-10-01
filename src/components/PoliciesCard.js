import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import Popup from './Popup';

class PoliciesCard extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        isReadMode: true,
        isVisible: false,
      };
    }
componentWillMount() {
 
console.log(this.props.arrayDescription);
}
  componentDidMount(){
    //console.log('policiescardcall');
    //console.log(this.props.arrayDescription);
  }

  setImage(url) {
   
     this.setState({ 
      isVisible : true ,
       urlImg: url
    });
  }

    Hide_Splash_Screen=()=>{

    this.setState({ 
      isVisible : false 

    });

  }

  
renderView() {
  const{
    isView,
  }=this.state;
  
return this.props.arrayDescription.map((array, index) =>
                                       
<View style={{ marginBottom: 10 }}>
  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Type</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.type}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Status</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.status}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Effective Date</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.effectiveDate}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Cancellation Date</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.cancelDate}</Text>

    </View>

  </View >


  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '50%' }} >
        <Text style={styles.textSub} key={index}>Network</Text>
    </View>
    <View style={{ width: '50%' }}>
        <Text style={styles.textSubRight} key={index}>{array.network}</Text>

    </View>

  </View >




  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dedede', padding: 10, backgroundColor: '#ffffff', height: 40 }}>
    <View style={{ width: '80%' }} >
        <Text style={styles.textSub} key={index}>Benefits</Text>
    </View>
    <View style={{ width: '20%', height: 25}}>
     
       <TouchableHighlight
                onPress={() => {
                  this.setImage(array.benefitsDetails);
                }}>
                <View><Image  source={require('../../assets/view-icon.png')} style={{marginLeft:20}}/></View>
              </TouchableHighlight>
       

    </View>

  </View >
  </View>

  );
}

clickToReadMore = id => {
    //console.log(id);
      this.setState({ isReadMode: false });
}

renderViewSub(arrayData, index) {
  const {
    isReadMode

  } = this.state;

if (isReadMode === true) {
  return (
    <View>
    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
   <View style={{ width: 25, height: 25, }} >
       <Image source={require('../../assets/bullat-arrow25x25.png')} />
   </View>
    <Text style={styles.textSub} >{arrayData[0]}</Text>
    </View>
    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
   <View style={{ width: 25, height: 25, }} >
       <Image source={require('../../assets/bullat-arrow25x25.png')} />
   </View>
    <Text style={styles.textSub} >{arrayData[1]}</Text>
    </View>
    <TouchableOpacity
    onPress={this.clickToReadMore.bind(this, index)}
    >
    <Text style={{ color: 'blue' }}>Read More ..</Text>
    </TouchableOpacity>
    </View>

  );
} else {
  return arrayData.map((array, valueData) =>
  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
 <View style={{ width: 25, height: 25, }} >
     <Image source={require('../../assets/bullat-arrow25x25.png')} />
 </View>
  <Text style={styles.textSub} key={valueData}>{array}</Text>
  </View>


    );
}


}



  render() {
    
    const { 
    isVisible,
      urlImg,
  } = this.state;
    
    
    return (
   <View style={styles.MainContainer}>
       
         {
           (this.state.isVisible === true) ?  <View style={{position:'absolute',zIndex:1100000000,height: '100%', width: '100%'}}><View style={styles.SplashScreen_RootView}>

                <View style={styles.SplashScreen_ChildView}>

                    {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}

                    <Image source={{uri: urlImg }}
                    style={{width:'100%', height: '100%', resizeMode: 'contain'}} />

                </View>


                <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style={styles.TouchableOpacity_Style}
                  onPress={this.Hide_Splash_Screen} >

                    <Image source={require('../../assets/close-icon.png')}
                    style={{width:25, height: 25}} />

                </TouchableOpacity>

            
            </View></View> : null
          }
     
      
         
          
        <View style={{height: '100%', width: '100%'}}>
           <ScrollView>  
         
          {this.renderView()}
          </ScrollView>
        </View>
        
    
       
      </View>
   
        
       
      

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
        justifyContent: 'center',
        alignItems: 'center',
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


   },

};

export default PoliciesCard;
