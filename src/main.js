import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
import App from "./App.vue";

import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const pinia = createPinia();
const app = createApp(App);
// createApp(App).use(router).use(Antd).mount("#app"); // alterNative of the below formate

app.use(router);
app.use(Antd);
app.use(pinia);

app.mount("#app");
