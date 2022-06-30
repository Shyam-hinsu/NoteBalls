// stores/counter.js
import { defineStore } from "pinia";
import { db } from "@/firebase/firebaseInit";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useStoreAuth } from "@/stores/storeAuth";

let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshots = null;

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      formState: {
        note: "",
      },
      notes: [],
      isEdit: false,
      isNotesLoaded: false,
    };
  },
  getters: {
    findNoteId(state) {
      return (id) => {
        state.notes.findIndex((note) => note.id === id);
      };
    },

    findTotalNumberOfNotes: (state) => {
      return state.notes.length;
    },

    findTotalNumberOfCharactor: (state) => {
      return state.notes.reduce((ac, ele) => {
        return ac + ele.content.length;
      }, 0);
    },
  },
  actions: {
    init() {
      //store
      const storeAuth = useStoreAuth();
      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      // notesCollectionRef = collection(
      //   db,
      //   "users",
      //   "5tNDlnD77jga5ZCCcr4B7iHPPZB3",
      //   "notes"
      // );
      notesCollectionQuery = query(notesCollectionRef, orderBy("date"));
      this.getNotes();
    },
    async getNotes() {
      this.isNotesLoaded = true;

      getNotesSnapshots = onSnapshot(
        notesCollectionQuery,
        (querySnapshot) => {
          let notes = [];
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              timestemp: doc.data().timestemp,
              date: doc.data().date,
            };
            notes.unshift(note);
          });
          this.notes = notes;
          this.isNotesLoaded = false;
        },
        (error) => {
          console.log(error);
        }
      );
      //later  on
    },
    async submit() {
      await setDoc(doc(notesCollectionRef, uuidv4()), {
        content: this.formState.note,
        timestemp: Date.now(),
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      });
    },
    async editNote(id) {
      const washingtonRef = doc(notesCollectionRef, id);

      await updateDoc(washingtonRef, {
        content: this.formState.note,
        timestemp: Date.now(),
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      });
    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
    },
    findContentById(id) {
      return this.notes.filter((note) => note.id === id)[0]["content"];
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshots) getNotesSnapshots(); //unsubscribe form any active listner
    },
  },
});
