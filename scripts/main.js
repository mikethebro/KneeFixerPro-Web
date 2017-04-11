'use strict';

//Initializes KneeFixerPro
function KneeFixerPro() {
  this.checkSetup();

  //Shortcuts to DOM elements
  this.exerciseForm = document.getElementById('exercise-form');
  this.exerciseInput = document.getElementById('exercise');
  this.timesInput = document.getElementById('times');
  this.submitButton = document.getElementById('submit');

  //Save message on form submit.
  this.exerciseForm.addEventListener('submit', this.saveExercise.bind(this));


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

// Returns true if user is signed-in. Otherwise false and displays a message.
KneeFixerPro.prototype.checkSignedInWithMessage = function() {
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Saves a new exercise on the Firebase DB.
KneeFixerPro.prototype.saveExercise = function(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (this.exerciseInput.value && this.checkSignedInWithMessage()) {

    // TODO(DEVELOPER): push new message to Firebase.

  }
};

