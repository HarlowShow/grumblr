<template>

    <div class="options">
        <ion-chip
        color="success"
        @click="[tempPersonmate='flatmate', submitPersonmate(this.tempPersonmate, this.customNamed)]"
        >
        <ion-icon :icon="business"></ion-icon>
        <ion-label>a flatmate</ion-label>
        </ion-chip>

        <ion-chip
        color="success"
        @click="[tempPersonmate='housemate', submitPersonmate(this.tempPersonmate, this.customNamed)]"
        >
        <ion-icon :icon="home"></ion-icon>
        <ion-label>a housemate</ion-label>
        </ion-chip>

        <ion-chip
        color="success"
        @click="[tempPersonmate='neighbour', submitPersonmate(this.tempPersonmate, this.customNamed)]"
        >
        <ion-icon :icon="storefront"></ion-icon>
        <ion-label>a neighbour</ion-label>
        </ion-chip>

        
        <ion-chip
        color="success"
        @click="[tempPersonmate='landlord', submitPersonmate(this.tempPersonmate, this.customNamed)]"
        >
        <ion-icon :icon="hammer"></ion-icon>
        <ion-label>a landlord</ion-label>
        </ion-chip>

         
        <ion-chip
        color="success"
        @click="[tempPersonmate='other', submitPersonmate(this.tempPersonmate, this.customNamed)]"
        >
        <ion-icon :icon="man"></ion-icon>
        <ion-label>someone else</ion-label>
        </ion-chip>

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

        <!-- <div id="desktop" class="flex ion-justify-content-center">
        <ion-button
        class="btn-system"
        expand="block"
        @click="submitPersonmate(this.tempPersonmate, this.customNamed)">Next</ion-button>
        </div>
            

  <ion-footer class="ion-no-border" id="mobile">
            <ion-toolbar class="ion-no-padding">
                  <ion-button 
                    class="btn-system ion-no-margin"
                    expand="full"
                    @click="submitPersonmate(this.tempPersonmate, this.customNamed)">NEXT</ion-button>
            </ion-toolbar>
    </ion-footer> -->

</template>

// - use .lazy and .trim

<script>

// import AreaTitle from './AreaTitle.vue'

import {
    // IonSelect,
    // IonSelectOption,
    // IonButton,
    IonInput,
    IonLabel,
    IonIcon,
    IonItem,
    // IonRippleEffect,
    // IonFooter,
    // IonToolbar,
    IonCheckbox,
    IonChip,
 
    // actionSheetController
} from '@ionic/vue'

import { helpCircle, business, home, storefront, man, hammer, arrowBackOutline  } from 'ionicons/icons';


export default {

    components: { 
        // IonSelect,
        // IonSelectOption,
        // IonButton,
        IonInput,
        // AreaTitle,
        IonLabel,
        IonChip,
        IonIcon,
        IonItem,

        // IonFooter,
        // IonToolbar,
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
        if (value==="other") {
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

.options {
    display: flex;
    flex-wrap: wrap;
    align-items: space-evenly;
}

.options > ion-chip {
    white-space: nowrap;
}

/* #arrow {
    --border-radius: 100%
} */

</style>