// stores/counter.js
import { defineStore } from "pinia";
import { auth } from "@/firebase/firebaseInit";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      logInStatus: false,
      successLoginDetails: {},
      errorLoginDetails: {},
    };
  },
  getters: {},
  actions: {
    register(credentials) {
      let registerStatus = {};
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          const successDetails = {
            status: 1,
            user,
          };
          registerStatus = successDetails;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const errorDetails = {
            status: 0,
            errorCode,
            errorMessage,
          };
          registerStatus = errorDetails;
        });
      return logInStatus;
    },
    logIn(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.successLoginDetails.status = 1;
          this.successLoginDetails.user = user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.errorLoginDetails.status = 0;
          this.errorLoginDetails.errorCode = errorCode;
          this.errorLoginDetails.errorMessage = errorMessage;
        });
      console.log(this.successDetails);
      console.log(this.errorDetails);
    },
    signOut() {
      let logInStatus = {};
      signOut(auth)
        .then(() => {
          logInStatus = {
            status: 1,
          };
        })
        .catch((error) => {
          logInStatus = {
            status: 0,
            error,
          };
        });

      return logInStatus;
    },
  },
});
