//Initializes KneeFixerPro
'use strict';
function KneeFixerPro()
{
  this.checkSetup();
  //Shortcuts to DOM elements
  this.exerciseForm = document.getElementById('exercise-form');
  this.exerciseInput = document.getElementById('exercise');
  this.timesInput = document.getElementById('times');
  this.submitButton = document.getElementById('submit');

  //Save message on form submit.
  this.exerciseForm.addEventListener('submit', this.saveExercise.bind(this));


  this.initFirebase();
  this.loadExercises();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
KneeFixerPro.prototype.initFirebase = function()
{
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in KneeFixerPro
KneeFixerPro.prototype.signIn = function()
{
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out of KneeFixerPro
KneeFixerPro.prototype.signOut = function()
{
  // Sign out of Firebase.
  this.auth.signOut();
};

// Returns true if user is signed-in. Otherwise false and displays a message.
KneeFixerPro.prototype.checkSignedInWithMessage = function()
{
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  //this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

KneeFixerPro.prototype.loadExercises= function()
{
  // Reference to the /messages/ database path.
  this.exercisesRef = this.database.ref('exercises');
  // Make sure we remove all previous listeners.
  this.exercisesRef.off();

  // Loads the last 12 messages and listen for new ones.
  /*var setMessage = function(data) {
    var val = data.val();
    this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);*/
};

// Saves a new exercise on the Firebase DB.
KneeFixerPro.prototype.saveExercise = function(e)
{
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (this.exerciseInput.value) //&& this.checkSignedInWithMessage())
  {
    // Add a new message entry to the Firebase Database.
    this.exercisesRef.push(
    {
      exercise: this.exerciseInput.value,
      times: this.timesInput.value,
      done: 0,
    }
    ).then(function() {
      // Clear message text field and SEND button state.
      KneeFixerPro.resetMaterialTextfield(this.messageInput);
      this.toggleButton();
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  }
  this.exerciseInput.value = ""
  this.timesInput.value = ""
};

KneeFixerPro.prototype.onAuthStateChanged = function(user) {
  /*if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = null;   // TODO(DEVELOPER): Get profile pic.
    var userName = null;        // TODO(DEVELOPER): Get user's name.

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.loadMessages();

    // We save the Firebase Messaging Device token and enable notifications.
    this.saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }*/
};

// Checks that the Firebase SDK has been correctly setup and configured.
KneeFixerPro.prototype.checkSetup = function()
{
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config)
  {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  }
  else if (config.storageBucket === '')
  {
    window.alert('Your Cloud Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};

// Saves the messaging device token to the datastore.
KneeFixerPro.prototype.saveMessagingDeviceToken = function()
{
  // TODO(DEVELOPER): Save the device token in the realtime datastore
};

// Requests permissions to show notifications.
KneeFixerPro.prototype.requestNotificationsPermissions = function()
{
  // TODO(DEVELOPER): Request permissions to send notifications.
};

window.onload = function()
{
  window.kneefixerpro = new KneeFixerPro();
};