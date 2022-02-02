<template>

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

          <ion-item>
              <the-pithy-quote></the-pithy-quote>
          </ion-item>

          </div>
      </ion-menu>
      

</template>

<script>

import { IonMenu, IonItem, IonList, IonMenuToggle, IonButton, IonLabel,
//  IonToolbar, IonHeader
 } from '@ionic/vue'
import ThePithyQuote from './ThePithyQuote.vue'
export default {
    components: {
        IonMenu, IonItem, IonList, IonMenuToggle, IonButton, IonLabel, ThePithyQuote
        // IonToolbar, IonHeader
    },

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

    }
}
</script>