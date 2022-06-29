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
            <RouterLink v-if="item.isRouterLink" :to="item.to">
              {{ item.name }}
            </RouterLink>

            <h6 v-else>
              {{ item.name }}
            </h6>
          </a-menu-item>
          <a-menu-item>
            <a-button @click="signOut">LogOut </a-button>
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
import { useStoreAuth } from "@/stores/storeAuth";

//store
const storeAuth = useStoreAuth();

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
const selectedKeys = ref(menuItem.map((item) => item.key).filter(Boolean));

// console.log(selectedKeys.value);
function signOut() {
  storeAuth.signOut();
  console.log(storeAuth.signOut());
}
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>