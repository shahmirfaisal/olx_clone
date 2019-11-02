import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyAjkvzuZxgzS7JIokzleMalttncOWDxC5Y",
  authDomain: "e-commerce-a35a3.firebaseapp.com",
  databaseURL: "https://e-commerce-a35a3.firebaseio.com",
  projectId: "e-commerce-a35a3",
  storageBucket: "e-commerce-a35a3.appspot.com",
  messagingSenderId: "852004946314",
  appId: "1:852004946314:web:5f52ef4a97b6bff8b1c873",
  measurementId: "G-MY27448CL6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Auth Class
class Firebase {
  // Authentications
  signUp(name, email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().onAuthStateChanged(user => {
            user
              .updateProfile({
                displayName: name
              })
              .then(() => resolve(user));
          });
        })
        .catch(er => {
          reject(er.message);
        });
    });
  }

  logIn(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);

          resolve(user.user);
        })
        .catch(er => {
          reject(er.message);
        });
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve())
        .catch(er => reject(er));
    });
  }

  isSignIn() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  }

  // Firebase Storage
  store(file) {
    return new Promise((resolve, reject) => {
      firebase
        .storage()
        .ref("pic/" + file.name)
        .put(file)
        .then(n => {
          firebase
            .storage()
            .ref(n.metadata.fullPath)
            .getDownloadURL()
            .then(url => {
              resolve(url);
            })
            .catch(er => {
              reject(er);
              console.log(er);
            });
        })
        .catch(er => {
          reject(er);
          console.log(er);
        });
    });
  }

  // Firestore
  storeAd(ad, email) {
    return new Promise((resolve, reject) => {
      let publicRef = firebase
        .firestore()
        .collection("publicAds")
        .doc();

      publicRef
        .set(ad)
        .then(() => resolve())
        .catch(er => reject(er));

      let userRef = firebase
        .firestore()
        .collection(email)
        .doc();

      userRef.set(ad);
    });
  }

  getPublicAds() {
    return new Promise((resolve, reject) => {
      let publicRef = firebase.firestore().collection("publicAds");
      let ads = [];

      publicRef
        .get()
        .then(docs => {
          docs.forEach(doc => {
            ads.push(doc.data());
          });

          resolve(ads);
        })
        .catch(er => reject(er));
    });
  }

  getUserAds(email) {
    return new Promise((resolve, reject) => {
      let userRef = firebase.firestore().collection(email);
      let ads = [];

      userRef
        .get()
        .then(docs => {
          docs.forEach(doc => {
            ads.push(doc.data());
          });

          resolve(ads);
        })
        .catch(er => reject(er));
    });
  }
}
export default new Firebase();
