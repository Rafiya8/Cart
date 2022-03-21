import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import * as firebase from 'firebase';

// import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADxNrK9k-NW00mTSE67vPm9jmxixxjzOQ",
  authDomain: "cart-e2d23.firebaseapp.com",
  projectId: "cart-e2d23",
  storageBucket: "cart-e2d23.appspot.com",
  messagingSenderId: "1036316010585",
  appId: "1:1036316010585:web:31dba78d7ea5a2b7616948"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


