<template>
   
   <ion-page>
      <ion-header>
         <ion-toolbar>
             <div slot="start"><slot name="top"></slot></div>
             
             <ion-title >{{ pageTitle }}</ion-title>
  
                 <h3 class="close" slot="end" v-show="open===true">X</h3>
                 <!-- <button @click="openMain()">open menu</button> -->
                 
             
         </ion-toolbar>
      </ion-header>

      <ion-menu side="start" content-id="main-content" menu-id="main"
      @ionWillOpen="open=true"
      @ionWillClose="open=false">

          <div id="main-content">
        <ion-list class="menu-items">

            <!-- <ion-item>
                <button @click="closeMain()">close menu</button>
            </ion-item> -->

            <ion-item @click="route('home')">
              <ion-label>Home</ion-label>
            </ion-item>
            <ion-item>
             
              <ion-label>About</ion-label>
            </ion-item>
            <ion-item>
            
              <ion-label>Favorites</ion-label>
            </ion-item>
            <ion-item>
           
              <ion-label>Archived</ion-label>
            </ion-item>
            <ion-item>
            
              <ion-label>Trash</ion-label>
            </ion-item>
            <ion-item>
            
              <ion-label>Spam</ion-label>

            </ion-item>
          </ion-list>

          <ThePithyQuote id="mobile"/>
          </div>
      </ion-menu>
      

      <ion-content class="ion-align-self-center">

                   <slot />
             
     </ion-content>

    <ion-footer>
        <ion-toolbar>
            <ThePithyQuote id="desktop"/>
        </ion-toolbar>
    </ion-footer>
   </ion-page>
</template>

<script>


import ThePithyQuote from './ThePithyQuote.vue';
// import { mail, paperPlane, heart, trash, warning, archive } from 'ionicons/icons';
// import MobileFooter from './MobileFooter.vue'

import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        // IonBackButton,
        // IonButtons,
        IonFooter,
        IonMenu,
        menuController,
        IonItem,
        IonList,
        // IonButton,
        IonLabel,

      
   
       
} from '@ionic/vue';


export default {
    components: { 
        IonPage,
        IonHeader, 
        IonToolbar, 
        IonTitle, 
        IonContent, 
        IonFooter, 
        ThePithyQuote, 
        IonMenu,
        IonItem,
        IonList,
        IonLabel,
        // IonButton,
        // IonBackButton, 
        // IonButtons,
        },
    
    //  
    props: ['page-title', 'content'],

    // setup() {
    //     window.menuController = menuController;

    //     return {
    //         menuController
    //     }
    // },

    data() {

        return {
            open: false,
        }
    },

    methods: {
        
        route(page) {
            
            console.log(page)
            this.$router.push(page)

        },

          openMain() {
            menuController.enable(true, 'main');
            menuController.open('main');
        },

            closeMain() {
            menuController.enable(true, 'main');
            menuController.close('main');
            menuController.enable(true, 'main');
        },

    },

    // setup() {
    //     return {
    //         mail, 
    //         paperPlane, 
    //         heart, 
    //         trash, 
    //         warning, 
    //         archive
    //     }
    // },
};
</script>

<style scoped>

 ion-page {
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100%;
     max-width: 60rem;
     margin: 0 auto !important;
 }

 ion-content {
     --padding-start: 2rem;
     --padding-end: 2rem;
     --padding-top: 1rem;
     --padding-bottom: 1rem;
     width: 100%;
     max-width: 50rem;
     display: flex;
     align-items: center;
     justify-content: center;
     margin: 0 auto !important;
 }

@media(max-width: 576px) {
 ion-footer {
     display: none;
 }
 ion-content {
     height: calc(100% - 100px);
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

/* @media(min-width: 576px) {
 #mobile {
     display: none;
 }
} */
</style>