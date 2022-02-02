<template>

<area-title :title="'Oh dear. What did they do?'"
:progress="0.75">
<ion-button @click="goBack">
        <ion-icon slot="icon-only" :icon="arrowBackOutline" ></ion-icon>
    </ion-button>
</area-title>

 <div class="button-area">

        <ion-button 
        ion-activatable
        @click="[activeBtn='one', selected='dishes', gripeIsCustom='false']"
        class="btn-onboarding" :class="{ active: activeBtn === 'one' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="business"></ion-icon>Dishes in the sink
        </ion-button>

        <ion-button 
        ion-activatable
        @click="[activeBtn='two', selected='noise', gripeIsCustom='false']"
        class="btn-onboarding" :class="{ active: activeBtn === 'two' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="business"></ion-icon>Unreasonable noise
        </ion-button>

        <ion-button 
        ion-activatable
        @click="[activeBtn='three', selected='rubbish', gripeIsCustom='false']"
        class="btn-onboarding" :class="{ active: activeBtn === 'three' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="business"></ion-icon>Not taking the rubbish out
        </ion-button>

         <ion-button 
        ion-activatable
        @click="[activeBtn='four', selected='other', gripeIsCustom='true']"
        class="btn-onboarding" :class="{ active: activeBtn === 'four' }">
        <ion-ripple-effect type="unbounded"> </ion-ripple-effect>
        <ion-icon slot="start" :icon="business"></ion-icon>Other
        </ion-button>

</div>

<!-- <ion-input 
        v-if="gripeIsCustom===true"
        type="text"
        placeholder="they..."
        @ionChange="customGripe=$event.target.value"
        ></ion-input>
        <span v-if="gripeIsCustom===true">.</span> -->


        <div v-if="gripeIsCustom===true">

            <ion-label>What did they do?</ion-label>
      
            <ion-item lines="none">
                <span class="pretext">they...</span>
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
              </ion-item>

              <ion-label class="sublabel">*for best results, keep your description simple and avoid unnecessary punctuation, e.g. "had sex on the sofa", "kicked a baby", "ignored the mould problem".
              </ion-label>
        </div>
        <p v-if="invalidInput===true">Please enter a valid option</p>
          


              <ion-button id="desktop"
                    class="btn-system"
                    expand="block"
                    @click="activate(this.selected)">Confirm</ion-button>
            

  <ion-footer class="ion-no-border" id="mobile">
            <ion-toolbar class="ion-no-padding">
                    <ion-button
                    class="btn-system ion-no-margin"
                    expand="full"
                    @click="activate(this.selected)">Confirm</ion-button>
            </ion-toolbar>
    </ion-footer>

    <!-- <div class="form-area" page-default-back-link="/home">

        <ion-select v-model="selected"
        placeholder="choose your gripe">
            <ion-select-option @click="notCustom" value="dishes">
                Dishes in the sink
            </ion-select-option>
            
            <ion-select-option @click="notCustom" value="noise">
                Unreasonable noise
            </ion-select-option>
            
            <ion-select-option @click="notCustom" value="rubbish">
                Not taking the rubbish out
            </ion-select-option>
            
            <ion-select-option @click="setCustom" value="other">Something else</ion-select-option>
        </ion-select>
        
              
    </div> -->
</template>

<script>
import {
    IonButton,
    IonItem,
    IonLabel,
    IonTextarea,
    IonIcon,
    IonToolbar,
    IonRippleEffect,
    IonFooter,

} from '@ionic/vue'

import { helpCircle, business, home, storefront, man, hammer, arrowBackOutline  } from 'ionicons/icons';

import AreaTitle from './AreaTitle.vue'

import { ref } from 'vue'


export default  {

    components: { 
        IonButton,
        IonTextarea,
        AreaTitle,
        IonIcon,
        IonItem,
        IonLabel,
        IonToolbar,
        IonRippleEffect,
        IonFooter,
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
             {string: "left bodily fluids on the walls", speed: speeds.normal},
             {string: "got crumbs all over the breadbin", speed: speeds.fast},
             {string: "ate all the sticky toffee puddings", speed: speeds.normal},
        ]

        const characters = [];
        const displayText = ref([]);
        const idx = 0

        return {
            helpCircle,
            business,
            home,
            storefront,
            man,
            hammer,
            placeholders,
            characters,
            idx,
            displayText,
            arrowBackOutline
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
                this.selected = this.customGripe;
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
         border: 3px solid black;
        border-radius: 0.25rem;
        --padding-start: 10px !important;
        overflow: visible;
    }

.hidePlaceholder {
    --placeholder-opacity: 0;
}

.showPlaceholder {
    --placeholder-opacity: 100;
}

.pretext {
    padding-top: 1rem;
    padding-right: 0.2rem;
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

