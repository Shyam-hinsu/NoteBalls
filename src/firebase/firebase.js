import { db } from "./firebaseInit";

import { collection, getDocs } from "firebase/firestore";

async function getNotesFromFirease() {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const notesArray = [];
  querySnapshot.forEach((doc) => {
    let note = {
      id: doc.id,
      content: doc.data().content,
    };
    notesArray.unshift(note);
  });

  return notesArray;
}

export { getNotesFromFirease };
