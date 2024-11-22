import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },
  {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
          { path: '/main', component: () => import('pages/Main.vue') },
          { path: '/info', component: () => import('pages/Info.vue') },
          { path: '/settings', component: () => import('pages/Settings.vue') }
      ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
