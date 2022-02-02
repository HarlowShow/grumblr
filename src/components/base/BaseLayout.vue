<template>
   
   <ion-page id="ion-page">
      <ion-header>
         <ion-toolbar>
             <ion-menu-toggle><button>toggle</button></ion-menu-toggle>
             <!-- <div slot="start"><slot name="top"></slot></div> -->
             
             <ion-title >{{ pageTitle }}</ion-title>
  
                 <h3 class="close" slot="end" v-show="open===true">X</h3>
                 <!-- <button @click="openMain()">open menu</button> -->
                 
             
         </ion-toolbar>
      </ion-header>

      <ion-menu side="start" content-id="main-menu" menu-id="main"
      id="menu"
      @ionWillOpen="open=true"
      @ionWillClose="open=false"
      @ionDidClose="menuDidClose">

          <div id="main-menu">
        <ion-list class="menu-items">

            <!-- <ion-item>
                <button @click="closeMain()">close menu</button>
            </ion-item> -->

                 <ion-menu-toggle menu="main">
                     <ion-button router-link="/home">Home</ion-button>
            <!-- <ion-item @click="route('home')">
              <ion-label>Home</ion-label>
            </ion-item> -->
                  </ion-menu-toggle>


                <ion-menu-toggle menu="main">
            <ion-item> 
              <ion-label>About</ion-label>
            </ion-item>
                </ion-menu-toggle>

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
      

      <ion-content class="ion-align-self-center" id="main-page">

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
        // menuController,
        IonItem,
        IonList,
        IonMenuToggle,
        IonButton,
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
        IonMenuToggle,
        IonButton,
        // IonBackButton, 
        // IonButtons,
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