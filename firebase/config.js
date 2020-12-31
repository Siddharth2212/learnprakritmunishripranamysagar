import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0fGYnCxaL2racGXWbhkKKJFZwILAiAlo",
  authDomain: "digitalbrand-ac4e1.firebaseapp.com",
  databaseURL: "https://digitalbrand-ac4e1.firebaseio.com",
  projectId: "digitalbrand-ac4e1",
  storageBucket: "digitalbrand-ac4e1.appspot.com",
  messagingSenderId: "327833454223",
  appId: "1:327833454223:web:87618631b777756e83d2fa",
  measurementId: "G-F0PDVS75P2"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
