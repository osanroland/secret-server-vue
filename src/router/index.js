import { createWebHistory, createRouter } from "vue-router";
import SecretForm from "@/components/SecretForm.vue";
import ShowSecret from "@/components/ShowSecret.vue";
import NotFound from "@/components/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "SecretForm",
        component: SecretForm,
    },
    {
        path: "/secret/:hash",
        name: "ShowSecret",
        component: ShowSecret,
        props: true,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;