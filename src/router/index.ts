import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue'),
            meta: {requiresAdmin: false},
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/Register.vue'),
            meta: {requiresAdmin: false},
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../views/Dashboard.vue'),
            meta: {requiresAdmin: true},
        },
        {
            path: '/products',
            name: 'Products',
            component: () => import('../views/Product.vue'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/create-product',
            name: 'Create Products',
            component: () => import('../views/CreateProduct.vue'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/',
            redirect: '/dashboard',
        },
    ],
});

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore();
    auth.initFromStorage();

    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const isLoggedIn = !!auth.token;

    if(authRequired && !isLoggedIn) {
        return next('/login');
    }

    if(to.meta?.requiresAdmin && auth.role !== 'admin') {
        return next('/dashboard')
    }

    next();
});

export default router;