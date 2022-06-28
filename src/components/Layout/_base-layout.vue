<template>
  <a-layout>
    <a-layout-header>
      <slot name="header">
        <div class="logo" />
        <a-menu
          v-model:selectedKeys="selectedKeys.value"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item v-for="item in menuItem" :key="item.key">
            <RouterLink v-if="item.isRouterLink" :to="item.to">{{
              item.name
            }}</RouterLink>
            <p v-else>{{ item.name }}</p>
          </a-menu-item>
        </a-menu>
      </slot>
    </a-layout-header>
    <a-layout-content>
      <div
        :style="{ background: '#fff', padding: '24px', minHeight: '79vh' }"
        class="content-container"
      >
        <slot name="content"> <RouterView /> </slot>
      </div>
    </a-layout-content>
    <slot />
    <a-layout-footer>
      <slot name="footer"> this is footer </slot>
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";

const menuItem = [
  {
    key: "notes",
    name: "notes",
    isRouterLink: true,
    to: "/",
  },
  {
    key: "viewStates",
    name: "viewStates",
    isRouterLink: true,
    to: "/viewStates",
  },
];
const selectedKeys = ref(menuItem.map((item) => item.key));

// console.log(selectedKeys.value);
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>