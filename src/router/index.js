import { createRouter, createWebHistory } from '@ionic/vue-router';

import HomePage from '../views/HomePage.vue'
import FormArea from '../views/FormArea.vue';

import PlayGround from '../views/PlayGround.vue';
// import TheBottomMenu from '../components/base/TheBottomMenu.vue';

import EndPage from '../views/EndPage.vue';
import TestingArea from '../views/TestingArea.vue'
// import { menuController } from '@ionic/vue';

// const afterRoute = (to) => {
//   if(to.path === '/home') {
//     console.log("you are home!")
//     this.$router.go
//   }
// }

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
 
    },
    {
      path: '/home',
      component: HomePage,


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

export default router
