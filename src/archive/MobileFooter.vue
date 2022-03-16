<template>
    <ion-footer class="ion-no-border">
    <ion-toolbar>

        <ion-button>{{ content }}</ion-button>
      
      </ion-toolbar>
  </ion-footer>
  
  <!-- <ion-footer>
    <ion-toolbar>
      <ion-title>Footer</ion-title>
    </ion-toolbar>
  </ion-footer>


<ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title>Footer</ion-title>
    </ion-toolbar>
  </ion-footer> -->
</template>

<script>

import { IonFooter, IonButton, IonToolbar } from '@ionic/vue';
export default {
    
    components: {
        IonFooter, IonButton, IonToolbar
    },

    props: ['content']
}
</script>

<style scoped>

  @media(max-width: 576px) {
        ion-footer {
            display: none;
        }
  }
</style>