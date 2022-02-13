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
        <ion-label> I will be leaving them a strongly worded post-it note.</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
       @click="pushTone('pirate')">
        <ion-label>I'll need to consult my parrot before taking any further action.</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
        @click="pushTone('polite')">
        <ion-label>I'm going to make sure this doesn't ruin our relationship.</ion-label>
    </ion-chip>

  </div>

   <div
    v-if="step===3"
    >

    <ion-chip
        color="success"
        @click="routin">
        <ion-label>sure</ion-label>
    </ion-chip>

    <ion-chip
        color="success"
        @click="routin">
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

    emits: ['update:starters'],

    methods: {

         pushTone(tone){
            if(tone){
            this.$emit('update:starters', tone)
            }
         },

        routin(arg) {
            this.$emit('update:starters')
            if(arg===false) {
                setTimeout(()=>{
                    arg=true
                    this.routin(arg)
                }, 3000)
            } else {
            this.$router.push('playground')
            }
        },

    },

    // computed: {

    //     connector() {
    //     return 'and'
    //     },

    //     firstChoice() {
    //         let choice = ''
    //         switch(this.activeBtn) {
    //             case 'one':
    //                 choice = "I'm annoyed"
    //                 break;
    //             case 'two':
    //                 choice = "I'm pretty ok with it"
    //                 break;
    //             case 'three':
    //                 choice = "I'm quietly seething"
    //                 break;
    //             case 'four':
    //                 choice = "I'm swarthy AF"
    //         }
    //         return choice
    //     },

    //     secondChoice() {
    //         let choice = ''
    //         switch(this.activeBtnTwo) {
    //             case 'one':
    //                 choice = "they need to know that this is NOT ON."
    //                 break;
    //             case 'two':
    //                 choice = "I'm going to make sure this doesn't ruin our relationship."
    //                 break;
    //             case 'three':
    //                 choice = "I will be leaving them a note about it."
    //                 break;
    //             case 'four':
    //                 choice = "I'll need to consult my parrot before taking any further action."
    //         }
    //         return choice
    //     },

    //     displayConnector() {
    //         let choice = ''
    //         if (this.chosen===true&&this.chosenTwo===true) {
    //             choice = 'and '
    //         } else {
    //             choice = '...'
    //         }
    //         return choice
    //     }
    // },
}
</script>