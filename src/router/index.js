// Composables
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import View from "@/layouts/default/View.vue";
import AuthView from "@/layouts/default/AuthView.vue";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "Home",
    component: () => import("@/views/dashboard/IndexView.vue"),
    meta: { layout: View },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: { layout: AuthView },
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: () => import("@/views/auth/ChangePassword.vue"),
    meta: { layout: View },
  },
  {
    path: "/members/:report?",
    name: "Members",
    component: () => import("@/views/members/MembersView.vue"),
    props: true,
    meta: { layout: View },
  },

  {
    path: "/member/:id",
    name: "Member",
    props: true,
    component: () => import("@/views/members/MemberProfileView.vue"),
    meta: { layout: View },
  },
  {
    path: "/schedules",
    name: "Schedules",
    component: () => import("@/views/SchedulesView-1.vue"),
    meta: { layout: View },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("@/views/TasksView.vue"),
    meta: { layout: View },
  },
  {
    path: "/settings",
    name: "Settings",
    redirect: { name: "BusinessSettings" },
    component: () => import("@/views/settings/SettingsView.vue"),
    children: [
      {
        path: "business-settings",
        name: "BusinessSettings",
        component: () => import("@/views/settings/BusinessSettingsView.vue"),
      },
      {
        path: "staff-members",
        name: "StaffMembers",
        component: () => import("@/views/settings/StaffMembersView.vue"),
      },
      {
        path: "memberships/:report?",
        name: "Memberships",
        props: true,
        component: () => import("@/views/settings/MembershipsView.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () => import("@/views/settings/ProductsView.vue"),
      },
      {
        path: "leads-settings",
        name: "LeadsSettings",
        component: () => import("@/views/settings/LeadsSettings.vue"),
      },
    ],
    meta: { layout: View },
  },
  {
    path: "/staff-members/:id",
    name: "StaffProfile",
    props: true,
    component: () => import("@/views/staff-members/StaffProfileView.vue"),
    meta: { layout: View },
  },

  {
    path: "/sales/:report?",
    name: "sales",
    component: () => import("@/views/SalesView.vue"),
    props: true,
    meta: { layout: View },
  },

  {
    path: "/reports",
    name: "Reports",
    component: () => import("@/views/ReportsView.vue"),
    meta: { layout: View },
  },
  {
    path: "/leads/:report?",
    name: "Leads",
    component: () => import("@/views/leads/LeadsView.vue"),
    props: true,
    meta: { layout: View },
  },
  {
    path: "/branches",
    name: "Branches",
    component: () => import("@/views/branches/BranchesView.vue"),
    meta: { layout: View },
  },

  { path: "/:pathMatch(.*)*", component: () => import("@/views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authenticated = store.getters["auth/authenticated"];
  if (to.name !== "Login" && !authenticated) next({ name: "Login" });
  else if (to.name === "Login" && authenticated) next({ name: from.name });
  else next();
});

export default router;
