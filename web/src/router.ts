import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Test from "./pages/Test.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    { path: "/test", component: Test },
  ],
});

export { router };
