<template>

<area-title :title="'And who dunnit?'"
:progress="0.5">
        <ion-icon @click="goBack" :icon="arrowBackOutline" ></ion-icon>
</area-title>

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
      
            <ion-item lines="none" id="input">
            <ion-input 
            type="text"
            @ionChange="otherPersonmate=$event.target.value"
            >
            </ion-input>
            <vue-custom-tooltip  slot="end" label="test"><ion-icon :icon="helpCircle"></ion-icon></vue-custom-tooltip>
              
              </ion-item>

              <ion-item lines="none">
            <ion-checkbox @ionChange="isChecked($event.target.checked)"></ion-checkbox>
            <ion-label>this is a person's name</ion-label>
            </ion-item>
              </div>

        <p v-if="this.invalidInput === true">Please enter a valid option</p>

        <ion-button id="desktop"
        class="btn-system"
        expand="block"
        @click="submitPersonmate(this.tempPersonmate, this.customNamed)">Next</ion-button>
            

  <ion-footer class="ion-no-border" id="mobile">
            <ion-toolbar class="ion-no-padding">
                  <ion-button 
                    class="btn-system ion-no-margin"
                    expand="full"
                    @click="submitPersonmate(this.tempPersonmate, this.customNamed)">NEXT</ion-button>
            </ion-toolbar>
    </ion-footer>

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
    IonItem,
    IonRippleEffect,
    IonFooter,
    IonToolbar,
    IonCheckbox
 
    // actionSheetController
} from '@ionic/vue'

import { helpCircle, business, home, storefront, man, hammer, arrowBackOutline  } from 'ionicons/icons';


export default {

    components: { 
        // IonSelect,
        // IonSelectOption,
        IonButton,
        IonInput,
        AreaTitle,
        IonLabel,
        IonIcon,
        IonItem,
        IonRippleEffect,
        IonFooter,
        IonToolbar,
        IonCheckbox
    },

    setup() {

        return {
            helpCircle,
            business,
            home,
            storefront,
            man,
            hammer,
            arrowBackOutline
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
            customNamed: false,
        };
    },

    emits: ['update:personmate', 'backClick'],

    methods: {

        goBack() {
            console.log('goback')
            this.$emit('backClick')
        },

        isChecked(event) {
            this.customNamed = event;
            console.log(this.customNamed)
        },

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

        submitPersonmate(personmate, custom) {
                this.validateSubmission();

                if(this.invalidInput === false) {
                    console.log("input was valid")
                    personmate = this.selectedPersonmate;

                this.$emit('update:personmate', personmate)

                if(this.customNamed===true) {
                    this.$store.state.personmateIsNamed = true;
                }
                
                this.$store.state.namedPersonmate = custom;
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

    #input {
         border: 3px solid black;
        border-radius: 0.25rem;
        --padding-start: 10px !important;
        overflow: visible;
    }


ion-toolbar {
    display: flex;
    margin-left: -2.5rem;
    margin-right: -2.5rem;
}

/* #arrow {
    --border-radius: 100%
} */

</style>