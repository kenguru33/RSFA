import {AuthMethods, AuthProviders} from "angularfire2";
export const myFirebaseConfig = {
  apiKey: "AIzaSyDgAkPHkC2KabvWelAFggwWQvGB-dTU5eI",
  authDomain: "rsfa-e3c2f.firebaseapp.com",
  databaseURL: "https://rsfa-e3c2f.firebaseio.com",
  storageBucket: "rsfa-e3c2f.appspot.com",
  messagingSenderId: "439046788820"
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

