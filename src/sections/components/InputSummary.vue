<template>
    <!-- <p> {{ pronoun }} have a problem with your {{ personmate }} because they {{ gripe }}</p> -->

    
        <transition
        name="fade"
        style="transition-delay: 1s">
        <div>
            <p>Is that right?</p>
            <ion-button 
            expand="block" color="primary" shape="round" fill="outline"
            @click="routin">Confirm
            </ion-button>
        </div>
        </transition>
    
</template>

<script>

import {
    IonButton,
} from '@ionic/vue'

export default {

    components: {
            IonButton,
    },
    // props: {
    //     tempSelection: {
    //         type: Object,
    //         required: true
    //     },
    // },


    // computed: {
    //     pronoun() {
    //             let pro = ''
    //             if(this.tempSelection.chosenPronoun === "me") {
    //                 pro = "You"
    //             }
    //             if (this.tempSelection.chosenPronoun === "we"){
    //                 pro = "More than one of you"
    //             } return pro
    //         },
    //     personmate() {
    //         return this.tempSelection.chosenPersonmate
    //         },
    //     gripe() {
    //         let offenseText = this.$store.state.baseOutput.of0.slice(4)
    //             return offenseText
    //         },
    // },
    methods: {
        routin() {
             this.$router.push('playground')
        }
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
</style>