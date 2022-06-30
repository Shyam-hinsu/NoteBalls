<template>
  <Form @finish="submit" @cancle="cancle" />
  <template v-if="!storeNotes.isNotesLoaded">
    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </template>

  <div v-else>loding ......</div>
  <a-empty v-if="!storeNotes.notes.length && !storeNotes.isNotesLoaded" />
</template>

<script setup>
// imports
import { ref } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";

import Note from "@/components/note.vue";
import Form from "@/components/form/form.vue";

//sore data (notes)
const storeNotes = useStoreNotes();

//const  refs
const visible = ref(false);

//methods
function submit() {
  storeNotes.submit();
}
function cancle() {
  storeNotes.formState.note = "";
}
</script>
 
<style  scoped>
.card-container {
  width: 100%;
  margin-bottom: 30px;

  /* From https://css.glass */
  background: rgba(0, 119, 255, 0.062);

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.6px);
  -webkit-backdrop-filter: blur(8.6px);
}

.form {
  width: 100%;
  background: #001529;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  outline: 3px solid #7775a3;
}
</style>