import { createRouter, createWebHashHistory } from "vue-router";
import ViewNotes from "@/views/view-notes.vue";
import ViewStates from "@/views/view-stats.vue";
import ViewEditNote from "@/views/view-edit-note.vue";
import auth from "@/components/auth.vue";
import { useStoreAuth } from "@/stores/storeAuth";
import { readonly } from "vue";

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

router.beforeEach(async (to, from) => {
  //store
  const storeAuth = useStoreAuth();
  if (!storeAuth.user.id && to.name !== "auth") {
    return {
      name: "auth",
    };
  }
  if (storeAuth.user.id && to.name === "auth") {
    return false;
  }
});
export default router;
