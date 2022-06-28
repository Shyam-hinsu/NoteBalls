<template>
  <div class="edit-note-container">
    <Form
      :edit-form-id="routId"
      submit-btn-name="Update"
      @finish="editNote"
      @cancle="cancle"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onUnmounted } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";

import Form from "@/components/form/form.vue";

//router
const router = useRouter();
const rout = useRoute();
const routId = rout.params.id;

//store
const storeNotes = useStoreNotes();
storeNotes.isEdit = true;

//Hook
onUnmounted(() => {
  storeNotes.isEdit = false;
});

//method
function editNote() {
  storeNotes.editNote(routId);
  router.push("/");
}
function cancle() {
  storeNotes.formState.note = storeNotes.findContentById(routId);
}
</script>

<style  scoped>
.edit-note-container {
  width: 100%;
  background-color: #001529;
  padding: 20px;
}
</style>