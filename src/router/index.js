import { createRouter, createWebHashHistory } from "vue-router";
import ViewNotes from "@/views/view-notes.vue";
import ViewStates from "@/views/view-stats.vue";
import ViewEditNote from "@/views/view-edit-note.vue";

import auth from "@/components/auth.vue";

const routes = [
  {
    path: "/",
    name: "notes",
    component: ViewNotes,
  },
  {
    path: "/viewStates",
    name: "states",
    component: ViewStates,
  },
  {
    path: "/viewEditNote/:id",
    name: "viewEditNote",
    component: ViewEditNote,
  },
  {
    path: "/auth",
    name: "auth",
    component: auth,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
