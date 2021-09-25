import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Country from "../views/Country";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:code",
    name: "country",
    component: Country,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
