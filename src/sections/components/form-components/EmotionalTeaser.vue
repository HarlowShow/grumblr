<template>
    <area-title :title="'Just awful. And how do you feel about that?'"
    :progress="1">
    <ion-icon @click="goBack" :icon="arrowBackOutline" ></ion-icon>
</area-title>


    <div class="button-area"
    v-if="chosen===false"
    >
    <ion-button 
        ion-activatable
        @click="[activeBtn='one', chosen=true]"
        class="btn-onboarding" :class="{ active: activeBtn === 'one' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>...I'm annoyed
    </ion-button>

    <ion-button 
     
        ion-activatable
        @click="[activeBtn='two', chosen=true]"
        class="btn-onboarding" :class="{ active: activeBtn === 'two' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>...I'm pretty ok with it
    </ion-button>

    <ion-button 
     
        ion-activatable
        @click="[activeBtn='three', chosen=true]"  
        class="btn-onboarding" :class="{ active: activeBtn === 'three' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>...I'm quietly seething
    </ion-button>

    <ion-button 
      
        ion-activatable
        @click="[activeBtn='four', chosen=true]"  
        class="btn-onboarding" :class="{ active: activeBtn === 'four' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>...I'm swarthy AF
    </ion-button>
    </div>

    <div>
        <p>  <span v-if="chosen===true">{{ firstChoice }} {{displayConnector}}</span>
        <span v-if="chosenTwo===true">{{ secondChoice }}</span></p>
    </div>


    <div v-if="chosen===true">
        <ion-button 
    
        ion-activatable
        @click="[activeBtnTwo='one', chosenTwo=true]"
        class="btn-onboarding" :class="{ active: activeBtnTwo === 'one' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>{{ connector }} they need to know that this is NOT ON.
    </ion-button>

    <ion-button 
   
        ion-activatable
        @click="[activeBtnTwo='two', chosenTwo=true]"
        class="btn-onboarding" :class="{ active: activeBtnTwo === 'two' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>{{ connector }} I'm going to make sure this doesn't ruin our relationship.
    </ion-button>

    <ion-button 
   
        ion-activatable
        @click="[activeBtnTwo='three', chosenTwo=true]"  
        class="btn-onboarding" :class="{ active: activeBtnTwo === 'three' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>{{ connector }} I will be leaving them a note about it.
    </ion-button>

    <ion-button 
   
        ion-activatable
        @click="[activeBtnTwo='four', chosenTwo=true]"  
        class="btn-onboarding" :class="{ active: activeBtnTwo === 'four' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="water"></ion-icon>{{ connector }} I'll need to consult my parrot before taking any further action.
    </ion-button>
    </div>

</template>

<script>
import {
    IonButton,
    // IonItem,
    // IonLabel,
    // IonTextarea,
    IonIcon,
    // IonToolbar,
    IonRippleEffect,
    // IonFooter,

} from '@ionic/vue'
import AreaTitle from '../AreaTitle.vue'

import      {    
            // helpCircle,
            // musicalNotes,
            water,
            // trash,
            // addCircle,
            arrowBackOutline  
            } from 'ionicons/icons';

export default {
    components: {
        AreaTitle,
        IonIcon,
        IonRippleEffect,
        IonButton,
    },
    
    setup() {

        return {
            arrowBackOutline,
            water
        }
    },

    data() {

        return {
            activeBtn: null,
            activeBtnTwo: null,
            chosen: false,
            chosenTwo: false,
        }
    },

    emits: ['backClick'],

    methods: {
          goBack() {
              if(this.chosen===true&&this.chosenTwo===true) {
                  this.chosenTwo=false
              } else if (this.chosen===true) {
                  this.chosenTwo=false
                  this.chosen=false
              } else {
            console.log('goback')
            this.$emit('backClick')
              }
        },
    },

    computed: {

        connector() {
        return 'and'
        },

        firstChoice() {
            let choice = ''
            switch(this.activeBtn) {
                case 'one':
                    choice = "I'm annoyed"
                    break;
                case 'two':
                    choice = "I'm pretty ok with it"
                    break;
                case 'three':
                    choice = "I'm quietly seething"
                    break;
                case 'four':
                    choice = "I'm swarthy AF"
            }
            return choice
        },

        secondChoice() {
            let choice = ''
            switch(this.activeBtnTwo) {
                case 'one':
                    choice = "they need to know that this is NOT ON."
                    break;
                case 'two':
                    choice = "I'm going to make sure this doesn't ruin our relationship."
                    break;
                case 'three':
                    choice = "I will be leaving them a note about it."
                    break;
                case 'four':
                    choice = "I'll need to consult my parrot before taking any further action."
            }
            return choice
        },

        displayConnector() {
            let choice = ''
            if (this.chosen===true&&this.chosenTwo===true) {
                choice = 'and '
            } else {
                choice = '...'
            }
            return choice
        }
    },
}
</script>

<style scoped>
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
</style>