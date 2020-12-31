import React from 'react';
import { StyleSheet, ScrollView, View, Text, ImageBackground, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getFromAsync, storeInAsync} from '../utils/utils';
import {axiosPost} from '../service/apiCall';
import {AppLoader} from '../utils/appLoader';
import * as Device from 'expo-device';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      validated : true,
      devicetype : "",
      passwordValidated: true,
      secureEntry: true,
      isAppLoader: false,
    }
}

async componentDidMount(){
  const devicetype = await Device.getDeviceTypeAsync();
  this.setState({devicetype: devicetype});
}

_onPressForgotPassword() {
  this.props.navigation.navigate('ForgotPassword')
}

_onPressSignIn() {
  let { email, password } = this.state;
  var error = false
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //Check Email
  if (reg.test(email) === false) {
    this.setState({validated: false })
    error = true
  }
  else {
    this.setState({validated: true })
  }
  //Check Password
  if (password.length == 0 || password.length < 4) {
    this.setState({passwordValidated: false })
    error = true
  }
  else {
    this.setState({passwordValidated: true })
  }
  if (!error) {
    this._onPostCall(email, password)
  }
}

_onPostCall(email, password){
  let requestData = {
    email: email,
    password: password,
  }
  let event = this;
  this.setState({isAppLoader: true})
  this.props.navigation.navigate("Root")

  // axiosPost('https://voip-api.herokuapp.com/api/v1/sub_user/login',requestData, function callBack(response) {
  //   event.setState({isAppLoader: false})
  //   if (response?.success === true){
  //     // Toast.show({
  //     //   type:'success',
  //     //   text1: 'Login Success. Enjoy!',
  //     // });
  //     storeInAsync('userLoggedIn', 1);
  //     storeInAsync('userData', {email: email});
  //     if (event.props.route?.params?.fromHome === true) {
  //       event.props.navigation.popToTop()
  //       return
  //     }
  //     event.props.navigation.navigate('MyTabs')
  //   } else {
  //     // Toast.show({
  //     //   type:'error',
  //     //   text1: response.result,
  //     // });
  //   }
  // })
}
  
  render() {
    let { email, password, validated, passwordValidated, secureEntry } = this.state;

  return (
    <ScrollView style={{flex:1}}>
      <KeyboardAvoidingView
        behavior= {Platform.OS === 'ios' ? "position" : null}
        keyboardVerticalOffset={Platform.OS === 'ios'? -250: 0}
        style={{flex: 1}}
        >
      <ImageBackground source={require('../assets/images/login_background.png')} style={this.state.devicetype == Device.DeviceType.PHONE ? styles.image : styles.imageweb}>
        <View style={styles.scrollView}>
      <Image style={styles.stretch} source={require('../assets/images/logo.png')}/>
      <Text style={styles.textTitle}>Welcome Back</Text>
      <Text style={styles.textSubtitle}>BE THE BEST VERSION OF YOURSELF..!</Text>
      <View style={{marginTop:50}}/>
      <Text style={styles.textPlaceholder}>Email Address</Text>
      <TextInput
    style={styles.textInput}
    onChangeText={(value) => this.setState({email: value, validated: true})}
    value={email}/>
    { !validated && <Text style={[styles.lengthOfEventText, {color: 'red'}]}>Please enter correct email.</Text> }
          <View style={{paddingTop:20}}/>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.textPlaceholder}>Password</Text>
              <TouchableOpacity style={styles.forgotPassword} onPress={() => {this._onPressForgotPassword()}}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
      <TextInput
      style={styles.passwordInput}
      secureTextEntry={this.state.secureEntry}
      onChangeText={(value) => this.setState({password: value, passwordValidated: true})}
      value={password}/>
      <TouchableOpacity style={{width:wp('10%')}} onPress={() => {this.setState({secureEntry: !secureEntry})}}>
      <Image
        style={{width:wp('5%'), height:wp('5%'), marginTop:10}}
        source={require('../assets/images/lock.png')}
      />
      </TouchableOpacity>
      </View>
      { !passwordValidated && <Text style={[styles.lengthOfEventText, {color: 'red'}]}>Please enter correct Password.</Text> }
       <TouchableOpacity onPress={() => {this._onPressSignIn()}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>
        </View>
    </ImageBackground>
    </KeyboardAvoidingView>
    <AppLoader isVisible={this.state.isAppLoader}/>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding:wp('8%'), 
    flexDirection:'column', 
    flex:1,
    justifyContent:'flex-start',
  },
  lengthOfEventText: {
    color: 'rgb(5, 5, 5)',
    fontFamily: 'ArialMT',
    fontSize: wp('3.5%'),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    letterSpacing: 0.18,
    backgroundColor: 'transparent',
    marginLeft: wp('1%'),
},
  stretch: {
    width: wp('77%'),
    height: wp('18.5%'),
    marginRight:100,
  },
  textTitle: {
    marginTop: wp('5%'),
    color: '#ffffff',
    fontSize: wp('10%'),
    fontWeight: '700'
  },
  textPlaceholder: {
    color: '#d3d3d3',
    width:wp('60%')
  },
  forgotPassword: {
    color: '#d3d3d3',
    width:wp('40%')
  },
  textInput: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    color: '#ffffff',
    fontSize:wp('3.5%'),
    height: wp('10%'),
  },
  passwordInput: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    color: '#d3d3d3',
    width:wp('78%'),
    marginRight:8,
    fontSize:wp('3.5%'),
    height: wp('10%'),
  },
  textSubtitle: {
    color: '#ffffff',
    fontSize: wp('5%'),
  },
  image: {
    width:wp('100%'),
    height: hp("100%"),
    resizeMode: "cover",
    flexDirection:'column'
  },
  imageweb: {
    width:wp('100%'),
    height: 'auto',
    resizeMode: "cover",
    flexDirection:'column'
  },
  button: {
    marginTop: wp('6%'),
    width: wp('40%'),
    borderRadius:wp('2%'),
    alignItems: 'center',
    backgroundColor: '#d3d3d3'
  },
  buttonText: {
    textAlign: 'center',
    padding: wp('4%'),
    color: 'black',
    fontWeight:'600'

  }
});