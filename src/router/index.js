import { createRouter, createWebHistory } from '@ionic/vue-router';

import HomePage from '../sections/HomePage.vue';
import FormArea from '../sections/FormArea.vue';
import GripeInput from '../sections/components/GripeInput.vue';
import PlayGround from '../sections/PlayGround.vue';
// import TheBottomMenu from '../components/base/TheBottomMenu.vue';
import TestArea from '../sections/TestArea.vue';
import EndPage from '../sections/EndPage.vue';
// import { menuController } from '@ionic/vue';

const afterRoute = (to, from) => {
  if(to.path === '/home') {
    console.log("you are home!")
    console.log("you came from" + from.path)
  } else {
    console.log('you are not going home!')
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomePage,
      beforeEnter: afterRoute
    },
    {
      path: '/input',
      component: FormArea,
      beforeEnter: afterRoute,
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
  ]
})

// router.afterEach(() => {

//     console.log('aftereach worked')
//     setTimeout(() => {
//       const hiddenPage = document.getElementsByClassName("ion-page-hidden");
//       if (hiddenPage.classList.inclu) {
//         console.log(hiddenPage)
//         hiddenPage[0].classList.remove("ion-page-hidden")

//       }
//     }, 100);
//   })

// router.afterEach(() => {

// })

export default router
