<template>
    <ion-header>
        <ion-toolbar>

             <ion-title>WHAT'S THIS THEN?</ion-title>
          
            <ion-buttons  slot="end">
                <ion-button @click="closeModal">Close</ion-button>
            </ion-buttons>
             
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <p>Good question</p>
    </ion-content>
</template>

<script>

import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, modalController } from '@ionic/vue';

export default {
    components: {
        IonContent, 
        IonHeader, 
        IonTitle, 
        IonToolbar,
        IonButtons,
        IonButton
    },

    methods: {
        async closeModal(){
             await modalController.dismiss()
        }
    }
}
</script>