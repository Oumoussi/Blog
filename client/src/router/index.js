import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '@/components/SignIn.vue';
import Dashboard from '@/components/HomePage.vue';

const routes = [
  { path: '/SignIn', name: 'SignIn', component: SignIn },
  { path: '/', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
