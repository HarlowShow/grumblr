<template>


    <div
    v-if="step===1"
    >

    <ion-chip
        color="success"
        @click="pushTone('polite')">
        <ion-label>😅</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
        @click="pushTone('angry')">
        <ion-label>😡</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
        @click="pushTone('paggro')">
        <ion-label>🙄</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
       @click="pushTone('pirate')">
        <ion-label>🦜</ion-label>
    </ion-chip>

  </div>

      <div
    v-if="step===2"
    >

    <ion-chip
        color="success"
        @click="pushTone('angry')">
        <ion-label>they need to know that this is NOT ON.</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
        @click="pushTone('paggro')">
        <ion-label>{{ proOne }} will be leaving them a strongly worded post-it note.</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
       @click="pushTone('pirate')">
        <ion-label>{{ proOne }} best consult {{ proTwo }} parrot before taking any further action.</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
        @click="pushTone('polite')">
        <ion-label>{{ proOne }} will bravely pretend it never happened.</ion-label>
    </ion-chip>

  </div>

   <div
    v-if="step===3"
    >

    <ion-chip
        color="success"
        @click="routin(true)">
        <ion-label>sure</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
        @click="routin(true)">
        <ion-label>whip me up sump'n real good</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
       @click="routin(false)">
        <ion-label>no.</ion-label>
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
        }
    },

    setup(){

        const store = useStore()
        const activePronouns = {...store.state.chosenPronouns};

        return {
            activePronouns
        }
     },

    emits: ['update:starters', 'update:route'],

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
     }
}
</script>