import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../components/HelloWorld.vue'),
            meta: {requiresAdmin: true},
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../components/HelloWorld.vue'),
            meta: {requiresAdmin: true},
        },
        {
            path: '/',
            redirect: '/dashboard',
            meta: {requiresAdmin: false},
        },
    ],
});

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore();
    auth.initFromStorage();

    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const isLoggedIn = !!auth.token;

    if(authRequired && !isLoggedIn) {
        return next('/login');
    }

    if(to.meta.requiresAdmin && auth.role !== 'admin') {
        return next('/dashboard')
    }

    next();
});