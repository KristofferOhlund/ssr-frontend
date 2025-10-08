import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DocumentsView from "../views/DocumentsView.vue";
import CreateView from "@/views/CreateView.vue";
import UpdateView from "@/views/UpdateView.vue";
import ConnectionState from "../components/socket/ConnectionState.vue";

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/documents",
      name: "documents",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DocumentsView,
    },
    {
      path: "/create",
      name: "create new document",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CreateView,
    },
    {
      path: "/update/:id",
      name: "update",
      component: UpdateView,
      props: true,
      // props: (route) => (JSON.parse(route.params)),
    },
    {
      path: "/connection-state",
      component: ConnectionState,
      props: true,
    },
  ],
});

export default router;
