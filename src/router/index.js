import { createRouter, createWebHistory } from '@ionic/vue-router';

import SingleShare from '../views/SingleShare.vue'
import FormArea from '../views/FormArea.vue';
import PlayGround from '../views/PlayGround.vue';
import EndPage from '../views/EndPage.vue';


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/input',
 
    },
    {
      path: '/input',
      component: FormArea,
      // props: true
    },

    {
      path: '/input/:isNew',
      component: FormArea,
      // props: true
    },
  
    { path: '/playground',
      component: PlayGround,
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
