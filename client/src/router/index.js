import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const redirectToDashboardIfLoggedIn = (to, from, next) => {
  if (localStorage.token) {
    next('/dashboard');
  } else {
    next();
  }
};

const redirectToHomeIfNotLoggedIn = (to, from, next) => {
  if (localStorage.token) {
    next();
  } else {
    next('/');
  }
};

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
{
  path: '/signup',
  name: 'Signup',
  component: Signup,
  beforeEnter: redirectToDashboardIfLoggedIn,
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  beforeEnter: redirectToDashboardIfLoggedIn,
},
{
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  beforeEnter: redirectToHomeIfNotLoggedIn,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
