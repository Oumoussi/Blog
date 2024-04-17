import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '@/components/SignUp.vue';
import SignIn from '@/components/SignIn.vue';
import Dashboard from '@/components/HomePage.vue';
import BlogCategory from '@/components/BlogCategory.vue';
import BlogAbout from '@/components/BlogAbout.vue';

const routes = [
  { path: '/SignUp', name: 'SignUp', component: SignUp },
  { path: '/SignIn', name: 'SignIn', component: SignIn },
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/Category', name: 'BlogCategory', component: BlogCategory },
  { path: '/About', name: 'BlogAbout', component: BlogAbout }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
