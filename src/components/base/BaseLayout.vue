<template>
    <ion-page>
      <ion-header>
         <ion-toolbar>
             <ion-buttons slot="start">
                 <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
             </ion-buttons>
             
             <ion-title>{{ pageTitle }}</ion-title>
             <ion-buttons slot="end">
                 <slot name="actions-end"></slot>
             </ion-buttons>
         </ion-toolbar>
      </ion-header>

      <ion-content class="ion-align-self-center">
       
                   <slot />
             
     </ion-content>

    <ion-footer>
        <ion-toolbar>
            <!-- <slot name="footer"></slot> -->
            <ThePithyQuote/>
        </ion-toolbar>
    </ion-footer>
   </ion-page>
</template>

<script>


import ThePithyQuote from './ThePithyQuote.vue'

import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonBackButton,
        IonButtons,
        IonFooter,
       
} from '@ionic/vue';


export default {
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonFooter, ThePithyQuote },
    props: ['page-title', 'page-default-back-link'],
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
 ion-toolbar {
     display: none;
 }
}
</style>