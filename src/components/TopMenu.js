import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import AccountInfo from './AccountInfo';




class TopMenu extends Component {
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
                      isProfile: true,
                      isDependents: false,
                      isPolicies: false,

      };
    }


  clickToProfile = () => {
    this.setState({ isProfile: true });
    this.setState({ isDependents: false });
    this.setState({ isPolicies: false });
    AccountInfo.callByChild(true, false, false);
      Actions.AccountInfo();
  }
  clickToDependents = () => {
      this.setState({ isProfile: false });
      this.setState({ isDependents: true });
      this.setState({ isPolicies: false });
        AccountInfo.callByChild(false, true, false);
      Actions.AccountInfo();
  }
  clickToPolicies = () => {
        this.setState({ isProfile: false });
        this.setState({ isDependents: false });
        this.setState({ isPolicies: true });
        AccountInfo.callByChild(false, false, true);
       Actions.AccountInfo();
  }


  render() {
    const {
       isProfile,
       isDependents,
       isPolicies
     } = this.state;

    return (

      <View style={styles.topView}>

      <TouchableOpacity
      style={(isProfile === true) ? styles.firstViewActive : styles.firstView}
      activeOpacity={0.5}
      onPress={() => this.clickToProfile()}
      >
      <Text style={(isProfile === true) ? styles.textActive : styles.textInActive}>PROFILE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={(isDependents === true) ? styles.secondViewActive : styles.secondView}
      activeOpacity={0.5}
      onPress={() => this.clickToDependents()}
      >
      <Text style={(isDependents === true) ? styles.textActive : styles.textInActive}>DEPENDENTS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={(isPolicies === true) ? styles.thirdViewActive : styles.thirdView}
      activeOpacity={0.5}
      onPress={() => { this.clickToPolicies(); }}
      >
          <Text style={(isPolicies === true) ? styles.textActive : styles.textInActive}>POLICIES & BENIFITS</Text>
      </TouchableOpacity>

      </View>


    );
  }

}


const styles = {
  textActive: {
        color: '#ff7417'
  },
  textInActive: {
        color: 'black'
  },


topView: {
  flexDirection: 'row',
  marginTop: 0,
  padding: 0,

  height: 60,
  width: '100%',
  color: '#ff7417',

},
firstView: {
  borderBottomWidth: 2,
  borderColor: '#ccc',
  width: '25%',
  alignItems: 'center',
   paddingTop: 20
},
firstViewActive: {
  borderBottomWidth: 2,
  borderColor: '#ff7417',
  width: '25%',
  alignItems: 'center',
  color: '#ff7417',
  paddingTop: 20

},
secondView: {
  borderBottomWidth: 2,
  borderColor: '#ccc',
  width: '30%',
  alignItems: 'center',
   paddingTop: 20
},
secondViewActive: {
  borderBottomWidth: 2,
  borderColor: '#ff7417',
  width: '30%',
  alignItems: 'center',
  color: '#ff7417',
  paddingTop: 20

},
thirdViewActive: {
  borderBottomWidth: 2,
  borderColor: '#ff7417',
  width: '45%',
  alignItems: 'center',
  color: '#ff7417',
  paddingTop: 20

},
thirdView: {
  borderBottomWidth: 2,
  borderColor: '#dedede',
  width: '45%',
  alignItems: 'center',
   paddingTop: 20
}

};

export default TopMenu;
