import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DocumentsView from "../views/DocumentsView.vue";
import CreateView from "@/views/CreateView.vue";
import UpdateView from "@/views/UpdateView.vue";
import ConnectionState from "../components/socket/ConnectionState.vue";
import UserForm from "../components/forms/UserForm.vue";
import LogOut from "../components/forms/LogOut.vue";
import ShareDocument from "../components/ShareDocument.vue";
import CommentItem from "@/components/CommentItem.vue";

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      props: true,
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
      path: "/share/:id",
      name: "share",
      component: ShareDocument,
      props: true,
      // props: (route) => (JSON.parse(route.params)),
    },
    {
      path: "/connection-state",
      component: ConnectionState,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: UserForm,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogOut,
      props: true,
    },
    {
      path: "/register",
      name: "register",
      component: UserForm,
      props: true,
    },
    {
      path: "/comment",
      name: "comment",
      component: CommentItem,
      props: true,
    },
  ],
});

export default router;
