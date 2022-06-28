<template>
  <a-card hoverable class="card-container">
    <div class="card-note-container">
      <div class="mb-5">
        {{ note.content }}
      </div>

      <div class="card-note-length">
        <p>{{ note.date }}</p>
        <p>{{ findLength }} Characters</p>
      </div>
    </div>

    <template #actions>
      <a-button type="primary"
        ><RouterLink :to="`/viewEditNote/${note.id}`"
          >edit</RouterLink
        ></a-button
      >

      <a-button @click="showConfirm" danger>Delete</a-button>
    </template>
  </a-card>
</template>

<script setup>
import { computed, createVNode, onMounted } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { useStoreNotes } from "@/stores/storeNotes";

// props \/ emits
const props = defineProps({
  note: {
    type: Object,
    default: {},
  },
});

//store
const storeNotes = useStoreNotes();

//computed
const findLength = computed(() => {
  return props.note.content.length;
});

const showConfirm = () => {
  Modal.confirm({
    title: "Do you Want to delete these note?",
    icon: createVNode(ExclamationCircleOutlined),

    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    keyboard: true,
    maskClosable: true,
    centered: true,
    closable: true,
    class: "model-container",
    dialogClass: "model-container",
    wrapClassName: "model-container",
    onOk() {
      storeNotes.deleteNote(props.note.id);
    },
    onCancel() {},
  });
};
</script>

<style  scoped>
.card-note-container {
  display: flex;
  flex-direction: column;
}
.card-note-length {
  display: flex;
  justify-content: space-between;
  color: rgba(128, 128, 128, 0.759);
}
</style>