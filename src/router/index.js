import { createRouter, createWebHistory } from "vue-router";
import TodosView from "../views/TodosView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: TodosView, //this component is already imported, no need for lazy load because it is the default page
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited. This is best practice but components can also be imported directly.
			component: () => import("../views/AboutView.vue"),
		},
	],
});

export default router;
