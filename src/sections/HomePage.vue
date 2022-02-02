<template>
 
  <base-layout page-title="Gripe Generator">

      <div class="content">
          <ion-button expand="block" color="primary" shape="round" fill="outline" router-link="/input">Start</ion-button>
      </div>

      <div
      :class="{ shake: noActivated}">
      <!-- <the-icons
      v-if="angryTracker===0"
      name="angryone">
      </the-icons> -->
      <ion-button @click="angrier">Shake Me?</ion-button>
      <the-icons
      v-if="noActivated"
      name="angrytwo">
      </the-icons>
      </div>

      <the-sliders></the-sliders>

      <div class="sharing-icons">

          <ShareNetwork
          network="facebook"
          url='https://news.vuejs.org/issues/180'
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoFacebook"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="twitter"
          url='https://news.vuejs.org/issues/180'
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoTwitter"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="reddit"
          url='https://news.vuejs.org/issues/180'
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoReddit"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="whatsapp"
          url='https://news.vuejs.org/issues/180'
          :title="test"
          description="description goes here"
          ><ion-icon :icon="logoWhatsapp"></ion-icon>
          </ShareNetwork>
       
      </div>
    <!-- <template v-slot:footer><p>"A relationship should be based on communication, not on assumption" - marriage.com</p></template> -->
  </base-layout>
 
</template>

<script>

  // import TheTopMenu from '../components/base/TheTopMenu.vue';
  import {
       IonButton,
       IonIcon,
      //  IonMenuToggle
  } from '@ionic/vue';

  import TheIcons from './components/TheIcons.vue'
  import TheSliders from './TheSliders.vue'

  import { heart, logoFacebook, logoTwitter, logoReddit, logoWhatsapp } from 'ionicons/icons';

export default {
   components: { 
      IonButton,
      IonIcon,
      TheIcons,
      TheSliders,
      // IonMenuToggle,
      },

  setup() {

      return {
        heart,
        logoFacebook,
        logoTwitter,
        logoReddit,
        logoWhatsapp,
       
      }
    },

    data() {
      return {
        angryTracker: 0,
        noActivated: false,
        start: false,
        test: 'it be test'
      }
    },


    methods: {

      angrier() {
        this.angryTracker++
      }
    },

    watch: {

      angryTracker(newValue) {
        if (newValue>3) {
          this.noActivated = true;
        }
        console.log(this.angryTracker)
        console.log(this.noActivated)
      }
    }
}
</script>

<style scoped>
    header {
      text-align: center;
    }

    ion-button {
      max-width: 30rem;
      --padding-start: 4rem;
      --padding-end: 4rem;
    }

    .content {
      margin: 0 auto;
      padding: 1rem;
      margin-top: 1rem;
      display: flex;
      justify-content: center;
    }

    ion-icon {
      font-size: 2rem;
    }

    .sharing-icons {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      padding: 0.25rem;
    }


    .shake {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}


ion-menu-toggle {
    /* display: block !important; */
    pointer-events: auto;
}

</style>