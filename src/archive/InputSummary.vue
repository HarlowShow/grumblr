<template>

<area-title
:progress="1">

</area-title>
    <h4> {{ pronoun }} have a problem with {{ personmate }} because they {{ gripe }}</h4>

    
        <transition
        name="fade"
        style="transition-delay: 1s">
            <h3>Is that right?</h3>
        </transition>

        <div id="desktop">

        <ion-button @click="goBack"
        color="primary"
        >
        GO BACK
        <ion-icon slot="start" :icon="arrowBackOutline"></ion-icon>
        </ion-button>

        <ion-button
        class="btn-system"
        expand="block"
        @click="routin">CONFIRM</ion-button>

        </div>

     <ion-footer class="ion-no-border" id="mobile">
            <ion-toolbar class="ion-no-padding">

                    <ion-button @click="goBack"
                    class="ion-no-margin btn-row"
                    color="primary"
                    >
                        GO BACK
                         <ion-icon slot="start" :icon="arrowBackOutline"></ion-icon>
                    </ion-button>
                    <ion-button 

                    class="btn-system ion-no-margin btn-row"
                    @click="routin">CONFIRM</ion-button>

            </ion-toolbar>
    </ion-footer>

</template>

<script>

import {
    IonButton,
    IonIcon,
    IonToolbar,
    IonFooter,

} from '@ionic/vue'

import AreaTitle from '../sections/components/AreaTitle.vue'
import { arrowBackOutline } from 'ionicons/icons'
export default {

    components: {
            IonButton,
            AreaTitle,
            IonIcon,
            IonToolbar,
            IonFooter,
    },
    props: {
        tempSelection: {
            type: Object,
            required: true
        },
    },

    emits: ['backClick'],

    setup() {
        return {
            arrowBackOutline
        }
    },

    computed: {
        pronoun() {
                let pro = ''
                if(this.tempSelection.chosenPronoun === "me") {
                    pro = "You"
                }
                if (this.tempSelection.chosenPronoun === "we"){
                    pro = "More than one of you"
                } return pro
            },
        personmate() {
            let pers = ''
            if (this.$store.state.personmateIsNamed===true) {
                pers = this.tempSelection.chosenPersonmate
            } else {
                pers = 'your ' + this.tempSelection.chosenPersonmate
            }
            return pers
            },
        gripe() {
            // let offenseText = this.$store.state.baseOutput.of0.slice(4)
            //     return offenseText
            return this.tempSelection.demoGripe
            },
    },
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