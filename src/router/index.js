import { createRouter, createWebHistory } from '@ionic/vue-router';

import HomePage from '../views/HomePage.vue'
import TheArt from '../views/TheArt.vue'
import SingleShare from '../views/SingleShare.vue'
import FormArea from '../views/FormArea.vue';
import PlayGround from '../views/PlayGround.vue';
import EndPage from '../views/EndPage.vue';
import TestingArea from '../views/TestingArea.vue'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/input',
 
    },
    {
      path: '/home',
      component: HomePage,
    },
    {
      path: '/art',
      component: TheArt,
    },
    {
      path: '/input',
      component: FormArea,
      props: true
    },
  
    { path: '/playground',
      component: PlayGround,
    },

    {
      path: '/testing',
      component: TestingArea
    },

    {
      path: '/finish',
      component: EndPage,
    },

    {
      path: '/shared/:id',
      name: 'SingleShare',
      component: SingleShare,
      props: true,
    },
  ]
})

export default router
