<template>
   <!-- <the-side-menu></the-side-menu> -->
   <ion-page >

       <ion-header>
         <ion-toolbar>
             <ion-menu-button slot="start"></ion-menu-button>
             <!-- <ion-menu-toggle><button>toggle</button></ion-menu-toggle> -->
             <!-- <div slot="start"><slot name="top"></slot></div> -->
                <!-- <h1>Trash Talk Panda</h1> -->
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
// import { mail, paperPlane, heart, trash, warning, archive } from 'ionicons/icons';
// import MobileFooter from './MobileFooter.vue'

import {
        IonPage,
        IonHeader,
        IonToolbar,
        // IonTitle,
        IonContent,
        // IonBackButton,
        // IonButtons,
        IonFooter,
        IonMenuButton
        // IonMenu,
        // menuController,
        // IonItem,
        // IonList,
        // IonMenuToggle,
        // IonButton,
        // IonLabel,
     
} from '@ionic/vue';

// import TheSideMenu from './TheSideMenu.vue'


export default {
    components: { 
        IonPage,
        IonHeader, 
        IonToolbar, 
        IonMenuButton,
        // IonTitle, 
        IonContent, 
        IonFooter, 
        ThePithyQuote, 
        // IonMenu,
        // IonItem,
        // IonList,
        // IonLabel,
        // IonMenuToggle,
        // IonButton,
        // IonBackButton, 
        // IonButtons,
        // TheSideMenu
        },
    
    //  
    props: ['page-title', 'content'],

    data() {

        return {
            open: false,
        }
    },

    // mounted() {
    //      menuController.enable(true, 'main');

    // },

    methods: {

        menuDidClose(){
            console.log('menu closed')
        },

        // test(){
        //     menuController.enable(true, 'main');
        //     menuController.close('main');
        // },
        
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