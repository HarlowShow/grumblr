<template>
        <ion-chip
        color="success"
        @click="routin">
        <ion-label>Yes</ion-label>
        </ion-chip>

        <ion-chip
        color="success"
        @click="goBack">
        <ion-label>Nah m8</ion-label>
        </ion-chip>

</template>

<script>

import {
    // IonButton,
    // IonIcon,
    // IonToolbar,
    // IonFooter,
    IonChip,
    IonLabel

} from '@ionic/vue'

// import { arrowBackOutline } from 'ionicons/icons'
export default {

    components: {
            // IonButton,
            IonChip,
            IonLabel
            // IonIcon,
            // IonToolbar,
            // IonFooter,
    },

    emits: ['backClick'],

    // setup() {
    //     return {
    //         arrowBackOutline
    //     }
    // },

    methods: {
        routin() {
             this.$router.push('playground')
        },

     goBack() {
            console.log('goback')
            this.$emit('backClick')
        },
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

ion-toolbar {
    display: flex;
    flex: 1;
    margin-left: -2rem;
    margin-right: -4rem;
}

ion-button {
    width: 40%;
}

.btn-row {
    --border-radius: 0px !important;
}

#desktop {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}

</style>