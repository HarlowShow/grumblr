import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createStore } from 'vuex';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';
import BaseLayout from './components/base/BaseLayout.vue';
// import TheTopMenu from './components/base/TheTopMenu.vue';
import VueSocialSharing from 'vue-social-sharing';
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'

const store = createStore({
  state() {
    return {
      baseOutput: {},
      finalOutput: {},
      gripeString: '',
      chosenPronouns: {},
      personmateArticle: '',
      chosenPersonmate: '',
      chosenGripe: '',
      chosenName: '',
      nameIsDefault: true,
      namedPersonmate: '',
      personmateIsNamed: false,
      add: 0,
      sub: 0,
      oldAdd: 0,
      oldSub: 0,
      starterTones: [],
      moodcount: {
        angry: 0,
        polite: 0,
        paggro: 0,
        pirate: 0,
      },
      moodcountTotal: null,
      replace: null,
      changeTracker: {
        'op1': 0,
        'op2': 0,
        'of1': 0,
        'of2': 0,
        'co0': 0,
        'co2': 0,
        'pl0': 0,
        'pl1': 0,
        'pl2': 0
      },
      activeMood: '',
      sliderSubs: {
        angry: 0,
        polite: 0,
        paggro: 0,
        pirate: 0
      },
      classTone: 'default',
      customGripe: false,
    };
  },
});

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(VueSocialSharing)
  .use(VueCustomTooltip);
  
app.component('base-layout', BaseLayout);
// app.component('the-top-menu', TheTopMenu);

router.isReady().then(() => {
  app.mount('#app');
});