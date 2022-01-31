<template>
    <div class="progress-bar">

        <ion-progress-bar :value="progress"></ion-progress-bar>
    </div>
    <ion-grid class="title">
        <ion-row>
            <ion-col>
                <slot></slot>
            </ion-col>
            <ion-col size="8">  <h3>{{ title }}</h3></ion-col>
            <ion-col></ion-col>
        </ion-row>
     
    </ion-grid>
</template>

<script>
import { IonProgressBar, IonGrid, IonCol, IonRow} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

export default {
    props: ['title', 'progress'],
    components: {
        IonProgressBar,
        IonGrid,
        IonCol, 
        IonRow,
        // IonIcon,
        // IonButton
    },

    setup() {

        return {
            arrowBackOutline
        }
    },
}
</script>

<style scoped>
    .title {
        margin-top: 1rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    h3 {
        color: #2C2E32;
    }
</style>