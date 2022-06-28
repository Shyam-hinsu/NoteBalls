<template>
  <BaseLayout>
    <template #header />
    <template #content> </template>
    <template #footer />
  </BaseLayout>
  <!-- <router-view name="auth"></router-view> -->
</template>
<script setup>
// imports
import { onMounted } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import BaseLayout from "@/components/Layout/_base-layout.vue";

//store
const storeNotes = useStoreNotes();

//hook
onMounted(() => {
  storeNotes.getNotes();
});
</script>