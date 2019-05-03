 {
            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
            }
            
            
            Spinner
            
  <TextInput 
    style={styles.textBox} 
    underlineColorAndroid="transparent"
    blurOnSubmit={false} 
    autoFocus={false} 
    autoCorrect={false} 
    autoCapitalize="none" 
    
    returnKeyType="next"
    onChangeText={txtName => this.setState({txtName})}
   
/>
uncaught 