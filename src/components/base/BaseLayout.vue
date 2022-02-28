<template>
   <!-- <the-side-menu></the-side-menu> -->
   <ion-page >

       <ion-header>
         <ion-toolbar class="ion-text-center">
             <ion-title >GRUMBLR</ion-title>
             <ion-menu-button slot="start"></ion-menu-button>
             <!-- <ion-menu-toggle><button>toggle</button></ion-menu-toggle> -->
             <!-- <div slot="start"><slot name="top"></slot></div> -->
             <ion-icon :icon="helpOutline" slot="end" @click="openModal"></ion-icon>
                 <h3 class="close" slot="end" v-show="open===true">X</h3>
                 <!-- <button @click="openMain()">open menu</button> -->
                 
             
         </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-align-self-center" id="main-page"
      :scroll-events="true"
      ref="content">

                   <slot />
             
     </ion-content>

    <ion-footer>
        <ion-toolbar>
            <ThePithyQuote id="desktop"/>
            <slot name="footer"></slot>
        </ion-toolbar>
    </ion-footer>
   </ion-page>
</template>

<script>


import ThePithyQuote from './ThePithyQuote.vue';
import TheSideModal from './TheSideModal.vue'
import { helpOutline } from 'ionicons/icons';
// import MobileFooter from './MobileFooter.vue'

import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonFooter,
        IonMenuButton,
        modalController,
        IonIcon
     
} from '@ionic/vue';


export default {
    components: { 
        IonPage,
        IonHeader, 
        IonToolbar, 
        IonMenuButton,
        IonTitle, 
        IonContent, 
        IonFooter, 
        ThePithyQuote, 
        IonIcon
        },
    
    //  
    props: ['page-title', 'content'],

    setup() {

        return {
            helpOutline
        }
    },

    data() {

        return {
            open: false,
        }
    },

    methods: {

        async openModal() {
        const modal = await modalController.create({
          component: TheSideModal,
          cssClass: 'my-custom-class',
          componentProps: {
            title: 'New Title',
          },
        });
        return modal.present();
      },

        menuDidClose(){
            console.log('menu closed')
        },

        async route(page) {
            try {
                await this.startUpdate(page)
                console.log('update started')
            }

            catch(error) {
                console.log('there was an error')
            }

            finally {
                  console.log('final thing')
            }
          

            // 

        },

        runUpdate(page){
            this.$router.push(page)
            console.log("Update has been run!")
        },

        startUpdate(page){
              setTimeout(()=>{
            this.runUpdate(page)},500)
        }



    },

    watch: {
        '$route' () {
            console.log('route thing happened')
        }
    }

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

<style>

 ion-page {
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100%;
     max-width: 60rem;
     /* margin: 0 auto !important; */
 }

 ion-icon {
    font-size: 1rem;
 }

 ion-toolbar {
     --padding-end: 10px;
 }

 ion-content {
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

ion-menu-toggle {
    display: block !important;
    pointer-events: auto;
}

/* @media(min-width: 576px) {
 #mobile {
     display: none;
 }
} */
</style>