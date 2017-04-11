// Initialize Firebase
var config = {
  apiKey: "AIzaSyBs6Gxmg8j_wicTwOSZ-CToaBSAzo7X-kA",
  authDomain: "kneefixerpro.firebaseapp.com",
  databaseURL: "https://kneefixerpro.firebaseio.com",
  projectId: "kneefixerpro",
  storageBucket: "kneefixerpro.appspot.com",
  messagingSenderId: "342257651978"
};
firebase.initializeApp(config);
'use strict';

//Initializes KneeFixerPro
function KneeFixerPro() {
  this.checkSetup();

  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
KneeFixerPro.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in KneeFixerPro
KneeFixerPro.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out of KneeFixerPro
KneeFixerPro.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

