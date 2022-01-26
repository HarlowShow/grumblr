<template>

<area-title :title="'And who dunnit?'"
:progress="0.5"></area-title>

    <div class="button-area">

        <ion-button 
        ion-activatable
        @click="[activeBtn='one', tempPersonmate='flatmate']"
        class="btn-onboarding" :class="{ active: activeBtn === 'one' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="business"></ion-icon>A flatmate
        </ion-button>

                <ion-button 
        ion-activatable
        @click="[activeBtn='two', tempPersonmate='housemate']"
        class="btn-onboarding" :class="{ active: activeBtn === 'two' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="home"></ion-icon>A housemate
        </ion-button>

                <ion-button 
        ion-activatable
        @click="[activeBtn='three', tempPersonmate='neighbour']"
        class="btn-onboarding" :class="{ active: activeBtn === 'three' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="storefront"></ion-icon>A neighbour
        </ion-button>

                <ion-button 
        ion-activatable
        @click="[activeBtn='four', tempPersonmate='landlord']"
        class="btn-onboarding" :class="{ active: activeBtn === 'four' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="hammer"></ion-icon>A landlord
        </ion-button>

                <ion-button 
        ion-activatable
        @click="[activeBtn='five', tempPersonmate='someone else']"
        class="btn-onboarding" :class="{ active: activeBtn === 'five' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="man"></ion-icon>Someone else
        </ion-button>

       <!-- <ion-select 
        placeholder="Select One"
        v-model="tempPersonmate"
        @ionChange="validateLength(tempPersonmate)"
        >
            <ion-select-option value="flatmate">A flatmate
            </ion-select-option>

            <ion-select-option value="housemate">A housemate
            </ion-select-option>

            <ion-select-option value="neighbour">A neighbour
            </ion-select-option>

            <ion-select-option value="stinky landlord">A stinky landlord
            </ion-select-option>

            <ion-select-option value="someone else">Someone else
            </ion-select-option>
        </ion-select> -->
            </div>

      
        <div v-if="personmateIsCustom===true">
            <ion-label>Who was it?</ion-label>
      
            <ion-item lines="none">
            <ion-input 
            type="text"
            @ionChange="otherPersonmate=$event.target.value"
            >
            </ion-input>
            <vue-custom-tooltip  slot="end" label="test"><ion-icon :icon="helpCircle"></ion-icon></vue-custom-tooltip>
              
              </ion-item>
              
              </div>

        <p v-if="this.invalidInput === true">Please enter a valid option</p>

        <ion-button 
        expand="block" color="primary" shape="round" fill="outline"
        @click="submitPersonmate(this.tempPersonmate)">Next</ion-button>
            

</template>

// - use .lazy and .trim

<script>

import AreaTitle from './AreaTitle.vue'

import {
    // IonSelect,
    // IonSelectOption,
    IonButton,
    IonInput,
    IonLabel,
    IonIcon,
    IonItem
 
    // actionSheetController
} from '@ionic/vue'

import { helpCircle, business, home, storefront, man, hammer  } from 'ionicons/icons';


export default {

    components: { 
        // IonSelect,
        // IonSelectOption,
        IonButton,
        IonInput,
        AreaTitle,
        IonLabel,
        IonIcon,
        IonItem

    },

    setup() {

        return {
            helpCircle,
            business,
            home,
            storefront,
            man,
            hammer
        }
    },

    data() {

        return {
            tempPersonmate: 'none yet',
            selectedPersonmate: 'none yet',
            otherPersonmate: 'none yet',
            personmateIsCustom: 'false',
            invalidInput: false,
            activeBtn: '',
        };
    },

    methods: {

    validateLength(choice) {
            console.log(choice);
             if (choice.length < 1 || choice === 'none yet') {
                this.invalidInput = true;
                console.log("invalid input");
                return this.choice;
            } else {
            this.invalidInput = false;
            }
        },

    validateSubmission() {
        console.log("function happened")
            if (this.personmateIsCustom === true) {
                this.selectedPersonmate = this.otherPersonmate;
            } else {
               this.selectedPersonmate = this.tempPersonmate;
            }
            this.validateLength(this.selectedPersonmate);
    },

    submitPersonmate(personmate) {
            this.validateSubmission();

            if(this.invalidInput === false) {
                console.log("input was valid")
                personmate = this.selectedPersonmate;

            this.$emit('update:personmate', personmate)
            this.$store.state.chosenPersonmate = this.selectedPersonmate;
            }
        },
    },

    watch: {

        tempPersonmate(value) {
        if (value==="someone else") {
            this.personmateIsCustom = true;
        } else {
            this.personmateIsCustom = false;
                }
        },
    }
}
</script>

<style scoped>
ion-icon {
      font-size: 1.5rem;
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
        flex-wrap: wrap;
        padding-bottom: 1rem;
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

    ion-label {
        font-family: 'Readex pro', sans-serif;
        font-weight: 400;
        line-height: 1.5;
    }

    /* ion-input {
        border: 3px solid black;
        border-radius: 0.25rem;
        --padding-start: 10px !important;
        --padding-end: 10px;
    } */

    ion-item {
         border: 3px solid black;
        border-radius: 0.25rem;
        --padding-start: 10px !important;
        overflow: visible;
    }
</style>