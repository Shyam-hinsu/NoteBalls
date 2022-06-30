// stores/counter.js
import { defineStore } from "pinia";
import { auth } from "@/firebase/firebaseInit";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useStoreNotes } from "@/stores/storeNotes";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      logInStatus: false,
      user: {},
      error: {},
    };
  },
  getters: {},
  actions: {
    init() {
      //sore data (notes)
      const storeNotes = useStoreNotes();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.error = {};
          this.router.push("/");
          storeNotes.init();
        } else {
          this.user = {};
          this.error = {};
          storeNotes.clearNotes();
          this.router.replace("/auth");
        }
      });
    },
    register(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          this.error = {};
        })
        .catch((error) => {
          this.error.errorCode = error.code;
          this.error.errorMessage = error.message;
        });
    },
    logIn(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.error = {};
        })
        .catch((error) => {
          this.error.errorCode = error.code;
          this.error.errorMessage = error.message;
        });
    },
    signOut() {
      let logInStatus = {};
      signOut(auth)
        .then(() => {})
        .catch((error) => {});
    },
  },
});
