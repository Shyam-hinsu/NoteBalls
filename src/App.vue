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
import { useStoreAuth } from "@/stores/storeAuth";
import BaseLayout from "@/components/Layout/_base-layout.vue";

//store
const storeAuth = useStoreAuth();

//hook
onMounted(() => {
  storeAuth.init();
});
</script>

