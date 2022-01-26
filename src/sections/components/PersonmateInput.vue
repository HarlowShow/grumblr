<template>

    <div class="form-area" page-default-back-link="/home">
       <ion-select 
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
        </ion-select>

        <ion-input 
        v-if="personmateIsCustom===true"
        type="text"
        placeholder="who was it then?"
        @ionChange="otherPersonmate=$event.target.value"
        ></ion-input>

        <p v-if="this.invalidInput === true">Please enter a valid option</p>

        <ion-button 
        expand="block" color="primary" shape="round" fill="outline"
        @click="submitPersonmate(this.tempPersonmate)">Next</ion-button>
            
    </div>
</template>

// - use .lazy and .trim

<script>

import {
    IonSelect,
    IonSelectOption,
    IonButton,
    IonInput,
 
    // actionSheetController
} from '@ionic/vue'
// import { caretForwardCircle, close, heart, trash, share } from 'ionicons/icons';

export default {

    components: { 
        IonSelect,
        IonSelectOption,
        IonButton,
        IonInput
        

        // IonActionSheet
    },

    props: {
        personmates: {
            type: Array,
            required: true,
            },

        personmate: {
            type: Object,
        },
        // chosen: {
        //     type: String,
        //     required: false
        //     }
    },

    data() {

        return {
            tempPersonmate: 'none yet',
            selectedPersonmate: 'none yet',
            otherPersonmate: 'none yet',
            personmateIsCustom: 'false',
            invalidInput: false,
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