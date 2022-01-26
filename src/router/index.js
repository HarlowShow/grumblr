import { createRouter, createWebHistory } from '@ionic/vue-router';

import HomePage from '../sections/HomePage.vue';
import FormArea from '../sections/FormArea.vue';
import GripeInput from '../sections/components/GripeInput.vue';
import PlayGround from '../sections/PlayGround.vue';
import TheBottomMenu from '../components/base/TheBottomMenu.vue';
import TestArea from '../sections/TestArea.vue';
import EndPage from '../sections/EndPage.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomePage
    },
    {
      path: '/input',
      component: FormArea,
      props: true
    },
    {
      path: '/test',
      component: TestArea,
    },
    {
      path: '/home/gripe',
      component: GripeInput
    },
    { path: '/playground',
      component: PlayGround,
    },

    {
      path: '/finish',
      component: EndPage,
    },

    {
      path: '/tabs/',
      component: TheBottomMenu,
      children: [
        {
          path: '',
          redirect: 'tab1'
        },
        {
          path: 'tab1',
          component: () => import('../sections/components/PronounInput.vue')
        },
        {
          path: 'tab2',
          component: () => import('../sections/components/PersonmateInput.vue')
        },
        {
          path: 'tab3',
          component: () => import('../sections/components/GripeInput.vue')
        },
      ]
    }
  ]
})

export default router
