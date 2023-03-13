import {
  createRouter,
  createWebHistory,
  type RouteComponent,
} from "vue-router";
import { Namespace } from "@/layouts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/tasks",
      alias: "/",
      name: "Tasks",
      meta: {
        layout: Namespace.Default,
        expired: "all",
        isComplted: false,
      },
      component: (): Promise<RouteComponent> =>
        import("@/views/tasks/List.vue"),
    },
    {
      path: "/tasks/expiring-today",
      name: "ExpiringToday",
      meta: {
        layout: Namespace.Default,
        expired: "today",
        isComplted: false,
      },
      component: (): Promise<RouteComponent> =>
        import("@/views/tasks/List.vue"),
    },
    {
      path: "/tasks/completed",
      name: "CompletedTasks",
      meta: {
        layout: Namespace.Default,
        expired: "expired",
        isComplted: true,
      },
      component: (): Promise<RouteComponent> =>
        import("@/views/tasks/List.vue"),
    },

    {
      path: "/task/create",
      name: "CreateTask",
      meta: {
        layout: Namespace.Default,
      },
      component: (): Promise<RouteComponent> =>
        import("@/views/tasks/CreateTaskView.vue"),
    },
    {
      path: "/task/update/:id",
      name: "EditTask",
      meta: {
        layout: Namespace.Default,
      },
      component: (): Promise<RouteComponent> =>
        import("@/views/tasks/UpdateTaskView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: {
        name: "Tasks",
      },
    },
  ],
});

export default router;
