<template>

        <div class="options">

        <ion-chip
     
        @click="[selected='dishes', , gripeIsCustom='false', activate(this.selected)]">
            <ion-icon :icon="water"></ion-icon>
        <ion-label>didn't do the washing up</ion-label>
        </ion-chip>

          <ion-chip
       
        @click="[selected='noise', , gripeIsCustom='false', activate(this.selected)]">
            <ion-icon :icon="musicalNotes"></ion-icon>
        <ion-label>were unecessarily noisy</ion-label>
        </ion-chip>

        <ion-chip
       
        @click="[selected='rubbish', , gripeIsCustom='false', activate(this.selected)]">
            <ion-icon :icon="trash"></ion-icon>
        <ion-label>didn't take the rubbish out</ion-label>
        </ion-chip>

        <ion-chip
       
        @click="[selected='other', , gripeIsCustom='true', this.$store.state.customGripe = true]">
            <ion-icon :icon="addCircle"></ion-icon>
        <ion-label>something else</ion-label>
        </ion-chip>

        </div>


        <div v-if="gripeIsCustom===true">
            <ion-item lines="none">
         
                <div class="first">
                <p 
                class="pretext">they... </p>
                </div>
                <div class="second">
            <ion-textarea 
            class="input"
            :class="[{ hidePlaceholder : focus==='true'},{ showPlaceholder : focus==='false'}]"
            type="text"
            @ionChange="customGripe=$event.target.value"
            @ionFocus="focus='true'"
            @ionBlur="resetPlaceholders"
            auto-grow="true"
            inputmode="text"
            :placeholder="placeholderArray"
            >
               
            </ion-textarea>
            </div>
            
                <div class="third">
                <ion-icon 
                :icon="checkmarkCircle"
               
                @click="activate(this.selected)"
                ></ion-icon>
            
            </div>
              </ion-item>
        </div>
        <p v-if="invalidInput===true">Please enter a valid option</p>
          
</template>

<script>
import {
    // IonButton,
    IonChip,
    IonItem,
    IonLabel,
    IonTextarea,
    IonIcon,
    // IonToolbar,
    // IonFooter,

} from '@ionic/vue'

import { helpCircle, musicalNotes, water, trash, addCircle, arrowBackOutline, checkmarkCircle  } from 'ionicons/icons';

// import AreaTitle from './AreaTitle.vue'

import { ref } from 'vue'


export default  {

    components: { 
        // IonButton,
        IonChip,
        IonTextarea,
        // AreaTitle,
        IonIcon,
        IonItem,
        IonLabel,
        // IonToolbar,
        // IonFooter,
    },

    props: {

         gripe: {
             type: String,
         }
        
    },

    emits: ['update:gripe', 'backClick'],

     setup() {

        const speeds = {
        pause: 500,
        slow: 120,
        normal: 70,
        fast: 40
        }

        const placeholders = [
             {string: "insulted my cousin", speed: speeds.slow, classes: ["green"]},
             {string: "invaded Ukraine", speed: speeds.normal},
             {string: "got crumbs all over the breadbin", speed: speeds.fast},
             {string: "ate all the sticky toffee puddings", speed: speeds.normal},
        ]

        const characters = [];
        const displayText = ref([]);
        const idx = 0

        return {
            helpCircle,
            musicalNotes,
            water,
            trash,
            addCircle,
            placeholders,
            characters,
            idx,
            displayText,
            arrowBackOutline,
            checkmarkCircle
        }
    },

    data() {
        return {
            selected: '',
            gripeIsCustom: false,
            customGripe: '',
            invalidInput: 'false',
            activeBtn: '',
            inputPlaceholder: 'place held!',
            optionItem: 0,
            focus: false,
            begunPull: false,
            pushing: false,
            pulling: false,
            paused: false,
            resetted: false,
            chosenSpeed: 70,
        };
    },

    methods: {

        goBack() {
            
            console.log('goback')
            this.$emit('backClick')

        },

        activate(gripe) {

            if(this.gripeIsCustom === true) {
                this.selected = this.customGripe
            }
            gripe = this.selected;
            
            if(gripe.length>1){
            this.$emit('update:gripe', gripe);
            this.$store.state.chosenGripe = this.selected;

            
            } else {
                this.invalidInput = true;
            }
        },

        startPush(string){
            let length = string.length;
            // console.log('string length is' + length)

            if (length>this.optionItem&&this.pulling === false&&this.focus === false) {
                this.pushing = true;
                this.resetted = false;
                setTimeout(()=> {
                this.pushLetter(string)
                }, this.chosenSpeed)
            } else if (length===this.optionItem&&this.resetted===false) {
                this.begunPull = true;
                this.pulling = true;
                setTimeout(()=> {
                this.pullLetter(string)
                }, this.chosenSpeed)
            } else if (length===0 && this.begunPull === true) {
                // console.log('cycle done')
                this.pulling = false;
                this.next();
            }
        },
        pushLetter(string) {
            this.displayText.push(string[this.optionItem])
            this.optionItem++;
            this.startPush(string);
        },

        pullLetter(string) {
            this.pushing = false;
            if(this.focus===false) {
            this.displayText.pop()
            string.pop()
            this.optionItem--
            // console.log('length is' + string.length)
            // console.log('option item is' + this.optionItem)
            this.startPush(string)
            }
        },

        next() {
            if(this.idx<this.placeholders.length-1) {
                        this.idx++
            } else {
                this.idx = 0
            }
        
            let currentPlaceholder = this.placeholders[this.idx];
            this.chosenSpeed = currentPlaceholder.speed;
            let pString = currentPlaceholder.string.split("");
            // console.log(pString)
            this.startPush(pString);
        },

        resetPlaceholders() {
    
            if(this.customGripe.length===0) {
                this.displayText = [];
                this.optionItem = 0;
                this.resetted = true;
                this.focus = false;
                this.pulling=false;
                this.next()
            }
        },

        // setCustom() {
        //     this.gripeIsCustom = true;
        // },

        // notCustom() {
        //     this.gripeIsCustom = false;
        // }

    },

watch: {
    selected(value) {
        if (value==="other") {
            this.gripeIsCustom = true;
            } else {
                this.gripeIsCustom = false;
        }
    },

    gripeIsCustom(value) {
        if (value===true) {

            let currentPlaceholder = this.placeholders[this.idx];
            this.chosenSpeed = currentPlaceholder.speed
            console.log(currentPlaceholder)
            let pString = currentPlaceholder.string.split("");
            console.log(pString)
            this.startPush(pString);
        }
    },

},
computed: {

        placeholderArray() {
            let arr = this.displayText.join("")
            return arr
        }
    }
}
</script>

<style scoped>

ion-icon {
      font-size: 1.5rem;
      z-index: 500;
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

    .sublabel {
        font-size: 0.9rem;
    }

    /* ion-input {
        border: 3px solid black;
        border-radius: 0.25rem;
        --padding-start: 10px !important;
        --padding-end: 10px;
    } */

    ion-item {
        --border-radius: 20px;
        --background: rgb(238,249,242);
        align-items: center;
         --color: black;
        --border-width: 2.5px;
        --border-style: solid;
        --border-color: black;
    
    }

    ion-textarea {
        --padding-top: 21px;
        
    }

    .second {
        width: 100%
    }

.hidePlaceholder {
    --placeholder-opacity: 0;
}

.showPlaceholder {
    --placeholder-opacity: 100;
}

.pretext {
   font-size: 1rem;
   text-align: end;
   padding-right: 2px;
}

ion-toolbar {
    display: flex;
    margin-left: -2.5rem;
    margin-right: -2.5rem;
}

  vue-custom-tooltip {
      z-index: 1000;
     
  }
</style>

