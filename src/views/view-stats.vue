<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    class="w-full"
    :pagination="false"
    bordered
  />
</template>
<script setup>
import { useStoreNotes } from "@/stores/storeNotes";
import { onBeforeMount } from "vue";
//sore data (notes)
const storeNotes = useStoreNotes();

const dataSource = [
  {
    key: "1",
    State: "Number of Notes",
    Value: storeNotes.findTotalNumberOfNotes,
  },
  {
    key: "2",
    State: "Number of Character (of all notes)",
    Value: storeNotes.findTotalNumberOfCharactor,
  },
];

const columns = [
  {
    title: "State",
    dataIndex: "State",
    key: "State",
  },
  {
    title: "Value",
    dataIndex: "Value",
    key: "Value",
  },
];
</script>


<style lang="scss" scoped>
</style>