import { createApp } from "vue";
import { createPinia } from "pinia";
import { createWebHistory, createRouter } from "vue-router";
import "./style.css";
import App from "./App.vue";

const router = createRouter({
  routes: [],
  history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
