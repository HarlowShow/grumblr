<template>

<area-title :title="'So, who has a complaint?'"
:progress="0.25"></area-title>

<div class="button-area">

    <ion-button 
    ion-activatable
    @click="[activeBtn='one', selectedPronoun='me']"
    class="btn-onboarding" :class="{ active: activeBtn === 'one' }">
    <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
    <ion-icon slot="start" :icon="person"></ion-icon>Just me
    </ion-button>

    <ion-button 
     @click="[activeBtn='two', selectedPronoun='we']"
    class="btn-onboarding" :class="{ active: activeBtn === 'two' }">
     <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
    <ion-icon slot="start" :icon="people"></ion-icon>Several of us
    </ion-button>
</div>

    <p v-if="invalidInput">Please select an option</p>
    <ion-button class="btn-system" expand="block" @click="submitPronoun(selectedPronoun)">NEXT</ion-button>

</template>

<script>
import {
    IonButton,
    IonIcon,
    IonRippleEffect
} from '@ionic/vue';

import { person, people } from 'ionicons/icons';
import AreaTitle from './AreaTitle.vue'

export default {

    props: {

        pronoun: {
            type: Object
        },
    },

    components: {
        IonButton,
        IonIcon,
        IonRippleEffect,
        AreaTitle
 
    },

    setup() {

        return {
            person,
            people
        }
    },

    data() {
        return {
            selectedPronoun: 'none yet',
            invalidInput: false,
            activeBtn: '',
        };
    },

    emits: ['update:pronoun'],

    methods: {

        validate() {
             if (this.selectedPronoun === 'none yet') {
                this.invalidInput = true;
                return this.selectedPronoun
            }
            this.invalidInput = false;
        },

        submitPronoun(pronoun) {
            this.validate();
            if(this.invalidInput === false) {
            this.$emit('update:pronoun', pronoun)
            }
        },
    },
}
</script>

<style scoped>

        ion-icon {
      font-size: 1rem;
      padding-right: 0.3rem;
    }

    .btn-onboarding {
        --background: #C7CEEA;
        text-transform: none;
        --color: #2C2E32;
        overflow: hidden;
        --background-activated: #C7CEEA;
        --background-hover: #B89EDF;
        --background-hover-opacity: 80%;
        --border-radius: 0.25rem;
        width: 100%;
    }

    .active {
        --background: #B89EDF;
        --border-style: solid;
        --border-color: #9876BA;
    }

    .button-area {
        display: flex;
        align-items: stretch;
    }

    .button-area > button {
        flex: 50%;
    }

    .btn-system {
        --background: #646081;
        --border-radius: 0.25rem;
        --text-transform: uppercase;
        letter-spacing: 0.15rem;
    }

</style>