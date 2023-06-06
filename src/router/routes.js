const Home = () => import('../pages/Home.vue');
const Dict = () => import('../pages/Dict.vue');

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/dict/:dict',
    name: 'Dict',
    component: Dict,
  },
];
