<template>
  <div
    class="
      w-4/5
      h-30
      flext
      flex-column
      justify-center
      p-10
      auth-container
      relative
    "
    :class="register ? 'bg-dark' : 'bg-light'"
  >
    <div class="header-btn" :class="register ? 'bg-light' : 'bg-dark'">
      <a-row class="justify-center">
        <a-button
          class="mr-4"
          :type="register ? 'default' : 'primary'"
          @click="tglTologin"
          >Login
        </a-button>
        <a-button
          :type="register ? 'primary' : 'default'"
          @click="tglToRegister"
        >
          Register
        </a-button>
      </a-row>
    </div>
    <a-row class="justify-center">
      <h1 class="text-3xl" :class="register ? 'text-light' : 'text-dark'">
        {{ register ? "Register" : "LogIn" }}
      </h1>
    </a-row>
    <a-row v-if="storeAuth.error.errorCode" class="justify-center auth-message">
      <a-col class="error-bg px-1 text-xs">
        <h6 class="error-msg">
          {{ storeAuth.error.errorCode }}
        </h6>
      </a-col>
    </a-row>
    <a-divider type="horizontal" class="bg-blue-500 my-1" />
    <div class="w-full flex justify-center">
      <a-form :model="credentials" autocomplete="on" @finish="onFinish">
        <div class="flex justify-center flex-col">
          <a-form-item>
            <label for="email" :class="register ? 'text-light' : 'text-dark'"
              >Email</label
            >
            <a-input v-model:value="credentials.email" placeholder="Email">
              <template #prefix
                ><mail-outlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <label for="passward" :class="register ? 'text-light' : 'text-dark'"
            >Passward</label
          >
          <a-form-item>
            <a-input
              type="password"
              v-model:value="credentials.password"
              placeholder="password"
              autocomplete="true"
            >
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
        </div>
        <div class="mt-5 flex justify-center w-full">
          <a-button
            class="w-full"
            shape="round"
            type="primary"
            html-type="submit"
            >{{ register ? "Register" : "LogIn" }}
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { MailOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useStoreAuth } from "@/stores/storeAuth";

//router
const router = useRouter();
const rout = useRoute();

// constents
const register = ref(false);
const credentials = ref({
  email: "",
  password: "",
});
//store
const storeAuth = useStoreAuth();

// //computed
// const authMessage = computed(() => {
//   return storeAuth.errorLoginDetails.errorMessage;
// });

// methods
function onFinish() {
  if (!credentials.value.email || !credentials.value.password) {
    alert("Enter Email or Password");
  } else {
    if (register.value) {
      storeAuth.register(credentials.value);
      if (storeAuth.user.id) {
        register.value = false;
      }
    } else {
      storeAuth.logIn(credentials.value);
    }
  }
}
function tglTologin() {
  register.value = false;
  credentials.value.password = "";
}
function tglToRegister() {
  register.value = true;
  credentials.value.password = "";
}
</script>

<style scoped>
.auth-container {
  color: wheat;
}
.header-btn {
  position: absolute;
  top: -24px;
  padding: 10px;
}
.bg-dark {
  background-color: #001529;
}
.bg-light {
  background-color: #bfdbfe;
}
.text-dark {
  color: #001529;
}
.text-light {
  color: white;
}
.auth-message {
  justify-items: center;

  align-content: center;
  color: black;

  width: 100%;
}
.error-bg {
  /* From https://css.glass */
  background: rgba(255, 0, 0, 0.33);

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.4px);
  -webkit-backdrop-filter: blur(2.4px);
  border: 1px solid rgba(255, 0, 0, 1);
}
.error-msg {
  color: #ff0000;
}
</style>