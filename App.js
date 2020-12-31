import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import MainScreen from './components/MainscreenComponent';
import Main from './components/MainComponent';
import LoginComponent from './components/LoginComponent';
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
// PROVIDE VALID FIREBASE CONFIG HERE
// https://firebase.google.com/docs/web/setup
const FIREBASE_CONFIG = {
   apiKey: "AIzaSyB0fGYnCxaL2racGXWbhkKKJFZwILAiAlo",
    authDomain: "digitalbrand-ac4e1.firebaseapp.com",
    databaseURL: "https://digitalbrand-ac4e1.firebaseio.com",
    projectId: "digitalbrand-ac4e1",
    storageBucket: "digitalbrand-ac4e1.appspot.com",
    messagingSenderId: "327833454223",
    appId: "1:327833454223:web:df323ad137c6131a83d2fa",
    measurementId: "G-4CQQT4N3R0"
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

export default function App() {
   // Set an initializing state whilst Firebase connects
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
   const recaptchaVerifier = React.useRef(null);
   const verificationCodeTextInput = React.useRef(null);
   const [phoneNumber, setPhoneNumber] = React.useState('');
   const [verificationId, setVerificationId] = React.useState('');
   const [verifyError, setVerifyError] = React.useState();
   const [verifyInProgress, setVerifyInProgress] = React.useState(false);
   const [verificationCode, setVerificationCode] = React.useState('');
   const [confirmError, setConfirmError] = React.useState();
   const [confirmInProgress, setConfirmInProgress] = React.useState(false);
   const isConfigValid = !!FIREBASE_CONFIG.apiKey;

   // Handle user state changes
   function onAuthStateChanged(user) {
     setUser(user);
     console.log("__haeighaegaeg");
     console.log(user);
     if (initializing) setInitializing(false);
   }
   
  useEffect(() => {
    // auth().signOut();
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(true){
    return (
      <Main/>
    );
  }
  else{
    return (
      <Main/>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginTop: 50,
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  success: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFFC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontWeight: 'bold',
  },
});