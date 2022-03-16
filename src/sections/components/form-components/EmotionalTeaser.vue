<template>


    <div
    v-if="step===1"
    >

    <ion-chip
       
        @click="pushTone('polite')">
        <ion-label>😅</ion-label>
    </ion-chip>

    <ion-chip
      
        @click="pushTone('angry')">
        <ion-label>😡</ion-label>
    </ion-chip>

    <ion-chip
       
        @click="pushTone('paggro')">
        <ion-label>🙄</ion-label>
    </ion-chip>

    <ion-chip
       
       @click="pushTone('pirate')">
        <ion-label>🏴‍☠️</ion-label>
    </ion-chip>

  </div>

      <div
    v-if="step===2&&teasers"
    >

    <ion-chip class="chonk-chip"
        @click="pushTone('angry')">
        <ion-label>...{{ teasers[0] }}</ion-label>
    </ion-chip>

    <ion-chip class="chonk-chip"
       
        @click="pushTone('paggro')">
        <ion-label>...{{ teasers[2] }}</ion-label>
    </ion-chip>

        <ion-chip class="chonk-chip"
      
        @click="pushTone('polite')">
        <ion-label>...{{ teasers[1] }}</ion-label>
    </ion-chip>

    <ion-chip class="chonk-chip"
       
       @click="pushTone('pirate')">
        <ion-label>...{{ teasers[3] }}</ion-label>
    </ion-chip>



  </div>

   <div
    v-if="step===3"
    >

    <ion-chip
       
        @click="routin(true)">
        <ion-label>yes</ion-label>
    </ion-chip>

    <ion-chip
       
        @click="routin(true)">
        <ion-label>ok</ion-label>
    </ion-chip>

    <ion-chip
       
       @click="routin(true)">
        <ion-label>definitely</ion-label>
    </ion-chip>

  </div>

</template>

<script>
import {
    
    // IonIcon,
    IonChip,
    IonLabel,


} from '@ionic/vue'

import { useStore } from 'vuex'

export default {
    components: {
        IonChip,
        IonLabel,
    },

    props: {
        step: {
            type: Number,
            required: true
        },
        teasers: {
            type: Array,
            required: false,
        }
    },

    setup(){

        const store = useStore()
        const activePronouns = {...store.state.chosenPronouns};

        return {
            activePronouns
        }
     },

    emits: ['update:starters', 'update:route', 'scroll'],

    methods: {

         pushTone(tone){
            if(tone){
            this.$emit('update:starters', tone)
            }
         },

        routin(arg) {
            this.$emit('update:route', arg)
        },

    },

     computed:{

         proOne(){
             return this.activePronouns.subjectP
         },

         proTwo(){
             return this.activePronouns.posessiveDeterminerP
         }
     },

     watch: {
         step: {
            immediate: true,
            handler(newVal){
             if(newVal===2){
                 
                 setTimeout(() => {
                      this.$emit('scroll')
                 }, 500)
                
             }
         }
         }
     }
}
</script>

<style scoped>
    .chonk-chip {
        padding: 1rem;
        border: 2.5px solid black;
    }

    ion-label {
        text-align: center;
    }
</style>