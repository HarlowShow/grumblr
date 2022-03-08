<template>
   <!-- <the-side-menu></the-side-menu> -->
   <ion-page >

       <ion-header class="ion-no-border">
         <ion-toolbar>
         
          
            <!-- <ion-buttons>
               <ion-title class="logo ion-text-center">
                   </ion-title>
                </ion-buttons> -->

                <!-- <div>
                <ion-title class="logo-long">
                    <div class="btn-div">
                    </div>
                     <div class="btn-div">
                    <the-icons name="q-icon"></the-icons>
                  </div>
                </ion-title>
                </div> -->

                <div class="sharing-icons-two">
                  <div class="end-line"></div>

                      <div
                      v-if="this.$route.name!=='SingleShare'"
                      @click="presentAlertConfirm"
                      ><ion-icon :icon="homeOutline"></ion-icon></div>
              <div class="line-left"></div>
              <div class="middle">
                <h3 id="logotype">GRUMBLR</h3>
              </div>
                      <!-- <the-icons class="middle" name="grumblr-logo"></the-icons> -->
               <div class="line-right"></div>
                      <div
                      @click="openModal"
                      ><ion-icon :icon="helpOutline"></ion-icon></div>
               <div class="end-line"></div>
                </div>

                 <!-- <p>test</p> -->
             
              
         
            
             <!-- <ion-icon
             v-if="this.$route.name!=='SingleShare'"
              slot="start" :icon="homeOutline" @click="presentAlertConfirm"></ion-icon> -->
             <!-- <ion-menu-toggle><button>toggle</button></ion-menu-toggle> -->
             <!-- <div slot="start"><slot name="top"></slot></div> -->
             <!-- <ion-icon :icon="helpOutline" slot="end" @click="openModal"></ion-icon> -->
                 <!-- <h3 class="close" slot="end" v-show="open===true">X</h3> -->
                 <!-- <button @click="openMain()">open menu</button> -->
                 
             
         </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-align-self-center" id="main-page"
      :scroll-events="true"
      ref="content">

                   <slot />
             
     </ion-content>

    <!-- <ion-footer>
        <ion-toolbar>
            <slot name="footer">

               
            </slot>
        </ion-toolbar>
    </ion-footer> -->
   </ion-page>
</template>

<script>


// import ThePithyQuote from './ThePithyQuote.vue';
import TheSideModal from './TheSideModal.vue'
import { helpOutline, homeOutline } from 'ionicons/icons';
// import TheIcons from '../../sections/components/TheIcons.vue'
// import MobileFooter from './MobileFooter.vue'

import {
        IonPage,
        IonHeader,
        IonToolbar,
        // IonTitle,
        IonContent,
        // IonFooter,
        // IonMenuButton,
        modalController,
        alertController,
        IonIcon,
        // IonButtons,
     
} from '@ionic/vue';


export default {
    components: { 
        IonPage,
        IonHeader, 
        IonToolbar,
        // TheIcons,
        // IonButtons,
        // IonMenuButton,
        // IonTitle, 
        IonContent, 
        // IonFooter, 
        // ThePithyQuote, 
        IonIcon
        },
    
    //  
    props: ['page-title', 'content'],

    setup() {

        return {
            helpOutline,
            homeOutline
        }
    },

    data() {

        return {
            open: false,
        }
    },

    methods: {

        async presentAlertConfirm() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Are you sure?',
          message: 'You may lose any saved grumble',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              id: 'cancel-button',
              handler: blah => {
                console.log('Confirm Cancel:', blah)
              },
            },
            {
              text: 'Yes, leave this page',
              id: 'confirm-button',
              handler: () => {
                this.$router.push({
                    path: "/",
                    })
              },
            },
          ],
        });
      return alert.present();
    },

        async openModal() {
        const modal = await modalController.create({
          component: TheSideModal,
          cssClass: 'my-custom-class',
        //   componentProps: {
        //     title: 'New Title',
        //   },
        });
        return modal.present();
      },

    },


};
</script>

<style>

#logotype {
  font-family: 'Road Rage', cursive;
  font-size: 3rem;
}

 ion-page {
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100%;
     max-width: 60rem;
     margin: 0 auto !important;
 }

ion-icon {
    font-size: 2rem;
}

 ion-toolbar {
     --padding-bottom: 0px;
     --min-height: 60px;
     --background: #FCF5E6;
 }


.btn-div {
   position: absolute;
   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110.07 241.71'%3E%3Cpath d='M33.89,188C56,182.28,66,190.41,61.32,213.07c-2.06,9.84-5.5,25.83-11.14,27.17-12.33,2.92-28,1.45-39.45-4.15C-1.6,230-3.85,198.7,6.83,190.7,13,186.06,24.68,188.66,33.89,188Z'/%3E%3Cpath d='M54.71,37.69c-14.42,3.17-26.47,8.48-37.79,7.22C10.88,44.24,3.54,33,1.23,25.18-4.91,4.49,13.36,6.77,24.79,2.92c35.11-11.83,79.45,14.42,84.3,41.22,4.12,22.79-5.42,43.62-16.17,64.13-9.3,17.75-23.34,19-39.67,19.12-.6,0-2.49,8.4-1.47,12.27,4.46,16.94-4.6,28-21,24.81C10.88,160.6,2.8,146.64,6.48,125.63c2-11.72,2.19-23.89,2.06-35.84-.12-11,7.79-15.68,19-14.42,12.06,1.37,25.66,1.58,36.38-3,5.37-2.26,8-16.31,7.52-24.76C71.18,43.88,60.16,40.74,54.71,37.69Z'/%3E%3C/svg%3E");
   background-size: contain;
   background-repeat: no-repeat;
   background-position: 50% 100%;
   height: 75%;
   width: 20px;
   flex: 1;
 }


 ion-content#main-page {
     --padding-start: 1.5rem;
     --padding-end: 1.5rem;
     --padding-top: 1rem;
     --padding-bottom: 1rem;
     --offset-top: 100px !important;
     width: 100%;
     max-width: 50rem;
     display: flex;
     align-items: center;
     justify-content: center;
     /* margin: 0 auto !important; */
 }

@media(max-width: 576px) {
 ion-content#main-page {
     height: calc(100% - 100px);
      --padding-start: 1rem;
     --padding-end: 1rem;
     --padding-top: 1rem;
     --padding-bottom: 1rem;
    --offset-top: 0px !important;
      align-items: center;
     justify-content: center;
 }
}

.menu-items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.close {
    margin: 0;
}

.sharing-icons-two {
      display: flex;
      justify-content: space-between;
      align-content: flex-end;
      align-items: baseline;
      padding-bottom: 0;
    }

    .line-left {
      border-bottom: 5px solid black;
      width: 100%;
      margin-right: -5px;
    }


    .line-right {
      border-bottom: 5px solid black;
      width: 100%;
      margin-left: -5px;
    }

    .end-line {
      border-bottom: 5px solid black;
      width: 20px;
    }

    
</style>