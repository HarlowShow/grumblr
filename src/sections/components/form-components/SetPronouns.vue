<template>

    <div>

        <ion-chip color="success"
        @click="[selectedPronoun='me', submitPronoun(selectedPronoun)]"
        >
        <ion-icon :icon="person"></ion-icon>
        <ion-label>yes I am</ion-label>
        </ion-chip>

                <ion-chip color="success"
        @click="[selectedPronoun='we', submitPronoun(selectedPronoun)]"
        >
        <ion-icon :icon="people"></ion-icon>
        <ion-label>yes we are</ion-label>
        </ion-chip>


    </div>

<p v-if="invalidInput">Please select an option</p>
<!-- 
<div class="flex ion-justify-content-center">
 <ion-button id="desktop" class="btn-system" expand="block" @click="submitPronoun(selectedPronoun)">NEXT</ion-button>
</div>

    <ion-footer class="ion-no-border" id="mobile">
            <ion-toolbar class="ion-no-padding">
                 <ion-button class="btn-system ion-no-margin" expand="full" @click="submitPronoun(selectedPronoun)">NEXT</ion-button>
            </ion-toolbar>
    </ion-footer> -->


</template>


<script>
import {
 
    IonIcon,
    // IonRippleEffect,

    IonChip,
    IonLabel
} from '@ionic/vue';

import { person, people, arrowBackOutline } from 'ionicons/icons';


export default {

    props: {

        pronoun: {
            type: Object
        },
    },

    components: {
        // IonButton,
        IonIcon,
        // IonRippleEffect,
        // IonFooter,
        // IonToolbar,
        IonChip,
        IonLabel
        // MobileFooter,
 
    },

    setup() {

        return {
            person,
            people,
            arrowBackOutline
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
    }

    .button-area > button {
        flex: 50%;
    }

    ion-toolbar {
    display: flex;
    margin-left: -2.5rem;
    margin-right: -2.5rem;
}
    /* @media(max-width: 576px) {
        .btn-system {

        }
    } */

    ion-chip {
        padding: 1rem;
    }

</style>