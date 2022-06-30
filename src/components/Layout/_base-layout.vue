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
          <a-menu-item v-if="storeAuth.user.id">
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
    <a-layout-footer class="footer">
      <slot name="footer">
        <img src="@/../public/antvue.svg" class="itemImage" />
        <img src="@/../public/pinia.svg" class="itemImage" />
        <img src="@/../public/favicon.ico" class="itemImage" />
        <img src="@/../public/tailwind.png" class="itemImage" />
      </slot>
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";
import { useRoute, useRouter } from "vue-router";

import { walkBlockDeclarations } from "@vue/compiler-core";

//store
const storeAuth = useStoreAuth();

// router
const router = useRouter();

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
}
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer {
  background-color: #001529;
  display: flex;
  justify-content: center;
}
.itemImage {
  margin-right: 10px;
  height: 30px;
  width: 30px;
}
</style>