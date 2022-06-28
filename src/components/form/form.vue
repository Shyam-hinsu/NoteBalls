<template>
  <a-form
    name="note_form"
    :model="storeNotes.formState"
    @finish="submit"
    class="form"
  >
    <h1 style="color: aliceblue" class="mb-4">
      {{ storeNotes.isEdit ? "Edit" : "Add" }} Notes Form
    </h1>
    <a-form-item>
      <a-textarea
        v-model:value="storeNotes.formState.note"
        ref="newNoteRef"
        :placeholder="`${storeNotes.isEdit ? 'Edit' : 'Add'} note`"
        :auto-size="{ minRows: 4 }"
        v-autofocus
      />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="mr-5"
        :disabled="!storeNotes.formState.note.length > 0"
      >
        {{ props.submitBtnName }}
      </a-button>
      <a-button type="primary" class="mr-5" @click="cancle">{{
        storeNotes.isEdit ? "Cancle" : "Clear"
      }}</a-button>
      <a-button v-if="storeNotes.isEdit" @click="router.push('/')"
        >Go Back To Notes</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { vAutofocus } from "@/directives/vAutofocus";
import { useStoreNotes } from "@/stores/storeNotes";
import { useWatchCharacters } from "@/use/useWatchCharacters";

//store
const storeNotes = useStoreNotes();

// hook
onMounted(() => {
  storeNotes.isEdit
    ? (storeNotes.formState.note = storeNotes.findContentById(props.editFormId))
    : (storeNotes.formState.note = "");
});

// props \/ Emiters \/ router
const props = defineProps({
  editFormId: {
    type: String,
    default: "",
  },
  submitBtnName: {
    type: String,
    default: "submit",
  },
});
const emit = defineEmits(["finish", "cancle"]);
const router = useRouter();

// constance
const newNoteRef = ref(null);
const noteRef = ref("");

//methods
function submit() {
  emit("finish");

  storeNotes.formState.note = "";
  // newNoteRef.focus();
}
function cancle() {
  emit("cancle");
}

// watch
useWatchCharacters(storeNotes.formState);
</script>

