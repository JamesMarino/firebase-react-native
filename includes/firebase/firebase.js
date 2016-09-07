
import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "yourkeyhere",
            authDomain: "projName-d0c3e.firebaseapp.com",
            databaseURL: "https://projName-d0c3e.firebaseio.com",
            storageBucket: "projName-d0c3e.appspot.com"
        });
    }

}

module.exports = Firebase;
