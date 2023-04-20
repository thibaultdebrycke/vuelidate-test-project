import HugeForm from "@/views/HugeForm.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "huge-form",
            component: HugeForm,
        },
    ],
});

export default router;
