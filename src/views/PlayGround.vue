<template>

    <base-layout page-default-back-link="/input" page-title="Edit your gripe">
    <!-- <p> {{ this.selectedPhrases }} </p>
    <p>active moods: {{ activeTones }}</p>
    <p>active index length: {{ activeIndexLength }}</p>

    <p v-for="text in output" :key="text">
        {{ text }}
    </p> -->
    <!-- <p>delete options: {{ deleteOptions }}</p>
    <p>used phrases: {{ usedPhrases }}</p> -->
<!-- <p>prior phrases: {{ priorPhrases }}</p> -->


    <div class="snippets">
        <text-snippet v-for="(value, name, index) in gripeObject"
        :initReset="removingFirst"
        :key="index"
        :value="value"
        :name="name"
        :index="index"
        :snippet="gripeObject[name]"
        :tone="this.selectedTone"
        ></text-snippet>
    </div>   

    <div id="sliders">

                    <the-sliders
                    :tone="'angry'"
                    :sliderVal="sliderVal['angry']"
                    @update:moodCount="updateMoodAngry"
                    >
                    </the-sliders>
                    <the-sliders
                    :tone="'polite'"
                     :sliderVal="sliderVal['polite']"
                    @update:moodCount="updateMoodPolite"
                    >
                    </the-sliders>
                    <the-sliders
                        :tone="'paggro'"
                        :sliderVal="sliderVal['paggro']"
                        @update:moodCount="updateMoodPaggro"
                        >
                    </the-sliders>
                    <the-sliders
                    :tone="'pirate'"
                    :sliderVal="sliderVal['pirate']"
                    @update:moodCount="updateMoodPirate"
                    >
                    </the-sliders>
                  
    </div>

            <chat-bubble
                    :gridClass="'left'">
                        <template v-slot:start>
                            <the-icons :name="'raccoon-shifty'"></the-icons>
                        </template>
                        <template v-slot:end>
                            <p>How about this?</p>
                        </template>
                        <template  v-slot:responses>
                            

                        </template>
            </chat-bubble>

    


        <!-- <p> moodcount object: {{ moodcount }} </p>
        <p> moodcount computed: {{ moodTotal }}</p> -->

         <!-- <ion-button expand="block" color="primary" shape="round" fill="outline" router-link="/finish">Finish</ion-button> -->

            
    </base-layout>
</template>

<script>


import TextSnippet from '../sections/components/TextSnippet.vue'
import TheSliders from '../sections/components/TheSliders.vue'
import ChatBubble from '../sections/components/ChatBubble.vue'
import TheIcons from '../sections/components/TheIcons.vue'

import speakPhrases from '../composables/phrases'
// import {
//     IonFooter
// } from '@ionic/vue'

import { useStore } from 'vuex'
import { ref } from 'vue'

export default {

    components: {
        ChatBubble,
        TheIcons,
        TextSnippet,
        TheSliders,
        // IonFooter
    },

    setup() {
        //set imports for phrases and selections
        const phraseObject = speakPhrases()
        const store = useStore()
        const gripeObject = store.state.baseOutput

        //set initial moods
        const initVal = ref(0)
        const firstTone = store.state.starterTones[0]
        const secondTone = store.state.starterTones[1]
           

        return {
            phraseObject,
            gripeObject,
            phrases: phraseObject.phrases,
            initVal: initVal.value,
            firstTone,
            secondTone
        }

    },

    
    mounted(){
            this.priorPhrases = Object.assign({}, this.$store.state.baseOutput);
            this.phraseHistory = Object.assign({}, this.$store.state.baseOutput)
            this.updatedPhrases = this.phrases;

            
            console.log('first tone is ' + this.firstTone)
            console.log('second tone is ' + this.secondTone)
            this.addingInit = true
            this.addInit(this.firstTone, 'first')
          
               


            //added experimental if statement, reminder to maybe remove at some point
            for (const mood in this.moodcount){
                if(this.removingFirst===false){
                this.$watch(
                    () => this.moodcount[mood],
                    (newVal) => {
                        // console.log('newVal is' + newVal)
                        if (newVal>0) {
                            this.reversable[mood] = true;
                            // console.log(this.reversable);
                        }
                        if (newVal === 0) {
                            this.reversable[mood] = false;
                        }
                    }
                );
            }
            }

            
            // console.log("mounted mate");
        },

    data() {
        
        // phrase: position, status (boolean), phrase, tone
        return {
            addingInit: false,
            reAddPhrase: null,
            sliderVal: {
                'angry': false,
                'polite': false,
                'paggro': false,
                'pirate': false
            },
            removingFirst: false,
            sacrificialTone: '',
            cahchedTone: '',
         
            activeMoods: [],
            hasAngry: false,
            hasPolite: false,
            hasPaggro: false,
            hasPirate: false,
            activePronouns: {},
            activePersonmate: '',
            activeGripe: '',
            selectedPhrases: [],
            activeIndexes: ['op1', 'op2', 'of1', 'of2', 'co0', 'co2', 'pl0', 'pl1', 'pl2'],
            allIndexes: ['op1', 'op2', 'of1', 'of2', 'co0', 'co2', 'pl0', 'pl1', 'pl2'],
            moodLimit: 9,
            selectedTone: '',
            selectedPhrase: '',
            // phrases: [],
            updatedPhrases: [],

            priorPhrases: {},
            //prior phrases - a copy of the OG gripe for simple deletes, no mutations
            phraseHistory: {},
            //phrase history - a log of everything that's been there, the previous step,
            //used to determine which slider[tone] moves back when the phrases are full
            usedPhrases: [],
            //add phrases that have been used, currently for deleting
            deleteOptions: [],
            //filtered array for more precise delete options

            rangeVal: 0,
            prevRangeVal: 0,

            changeTracker: {
                        op0: 0,
                        op1: 0,
                        op2: 0,
                        of0: 0,
                        of1: 0,
                        of2: 0,
                        co0: 0,
                        co1: 0,
                        co2: 0,
                        pl0: 0,
                        pl1: 0,
                        pl2: 0
                    },
            
            moodcount: {
                angry: 0,
                polite: 0,
                paggro: 0,
                pirate: 0,
                total: 0,
            },

            reversable: {
                angry: null,
                polite: null,
                paggro: null,
                pirate: null,
            },

        };
    },

    watch: 
    {

        'moodcount.angry': function(newValue, oldValue) {

             if(newValue>0&&this.hasAngry===false) {
                    this.activeMoods.push('angry')
                    this.hasAngry = true;
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='angry')
                    this.hasAngry = false;
                }
           
            if (this.removingFirst===true) {
                console.log('doing nothing about that')
                setTimeout (() =>{
                      this.removingFirst = false;
                }, 400)
              
            } else {
 
                this.selectedTone = 'angry'
        
                let difference = 0

                if(newValue>oldValue) {
                    difference = newValue - oldValue;
                    let type = 'add'
                    this.runChanges(difference, type);
                    
                }
                if(oldValue>newValue) {
                    difference = oldValue - newValue;
                    let type = 'sub'
                    this.runChanges(difference, type);

                }
            }
        },

         'moodcount.polite': function(newValue, oldValue) {
             
            if(newValue>0&&this.hasPolite===false) {
                    this.activeMoods.push('polite')
                    this.hasPolite=true
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='polite')
                    this.hasPolite=false
                }

            if (this.removingFirst===true) {
                console.log('doing nothing about that')
                 setTimeout (() =>{
                      this.removingFirst = false;
                }, 400)
            } else {
                
                this.selectedTone = 'polite'
                
    
                let difference = 0

                if(newValue>oldValue) {
                    difference = newValue - oldValue;
                    let type = 'add'
                    this.runChanges(difference, type);
                    
                }
                if(oldValue>newValue) {
                    difference = oldValue - newValue;
                    let type = 'sub'
                    this.runChanges(difference, type);

                }
            }
            
        },

            'moodcount.paggro': function(newValue, oldValue) {
           
             if(newValue>0&&this.hasPaggro===false) {
                    this.activeMoods.push('paggro')
                    this.hasPaggro=true;
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='paggro')
                    this.hasPaggro=false;
                }

            if (this.removingFirst===true) {
                console.log('doing nothing about that')
                 setTimeout (() =>{
                      this.removingFirst = false;
                }, 400)
            } else {

                 this.selectedTone = 'paggro'
               

                let difference = 0

                if(newValue>oldValue) {
                    difference = newValue - oldValue;
                    let type = 'add'
                    this.runChanges(difference, type);
                    
                }
                if(oldValue>newValue) {
                    difference = oldValue - newValue;
                    let type = 'sub'
                    this.runChanges(difference, type);

                }
            }
        },

            'moodcount.pirate': function(newValue, oldValue) {

               if(newValue>0&&this.hasPirate===false) {
                    this.activeMoods.push('pirate')
                    this.hasPirate=true;
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='pirate')
                    this.hasPirate=false;
                }
           
            if (this.removingFirst===true) {
                console.log('doing nothing about that')
                  setTimeout (() =>{
                      this.removingFirst = false;
                }, 400)
            } else {
                this.selectedTone = 'pirate'
             

                let difference = 0

                if(newValue>oldValue) {
                    difference = newValue - oldValue;
                    let type = 'add'
                    this.runChanges(difference, type);
                    
                }
                if(oldValue>newValue) {
                    difference = oldValue - newValue;
                    let type = 'sub'
                    this.runChanges(difference, type);

                }
            }
        },

        activeIndexLength: {
                handler() {
                console.log('watcher triggered, length is' + this.activeIndexes.length)
                    if(this.activeIndexes.length===0) {
                            this.activeIndexes = this.allIndexes;
                            console.log('indexes reset')
                    }  
                },
                deep: true
            }
        
    },

    methods: {

        addInit(tone, pos){
            if (pos==='first') {
             this.moodcount[tone]++
             this.addInit(this.secondTone)
            } else {
                //embarrassingly bad code, gotta go back and put in promises etc.
                setTimeout(() =>{
                    this.moodcount[tone]++
                    this.addingInit=false
                }, 1000)
            }
        },

        runChanges(difference, type){
                // console.log('difference is ' + difference)

                if (type==='add') {
                     if (this.reAddPhrase===true) {
                        console.log("about to REadd phrase")
                     }
    
                    for(; difference>0; difference--) {
                        console.log("about to add phrase")
                        setTimeout(() =>{
                            this.addPhrase()
                        },300)
                        
                    }
                }

                if (type==='sub') {
                    for(; difference>0; difference--) {
                        console.log("about to remove phrase")
                        setTimeout(()=> {
                            this.reverseGripe(this.selectedTone)
                        },300)
                    }
                }
        },

        updateMoodAngry(moodCount) {
            console.log('moodcount is' + moodCount)
            this.moodcount['angry'] = moodCount 
        },

        updateMoodPolite(moodCount) {
            console.log('moodcount is' + moodCount)
            this.moodcount['polite'] = moodCount 
        },

         updateMoodPaggro(moodCount) {
            console.log('moodcount is' + moodCount)
            this.moodcount['paggro'] = moodCount 
        },

         updateMoodPirate(moodCount) {
            console.log('moodcount is' + moodCount)
            this.moodcount['pirate'] = moodCount 
        },

        setTone(tone) {
             this.selectedTone = tone;
        },

        reverseGripe(tone) {

            this.$store.state.sub++
            this.moodcount.total--
            // this.moodcount[tone]--
            // if (this.removingFirst === true) {
            //      this.deleteOptions = this.usedPhrases.filter(phrase => phrase.tone === tone && phrase.status === true);
            // }
            this.deleteOptions = this.usedPhrases.filter(phrase => phrase.tone === tone && phrase.status === true);
            if(this.deleteOptions.length===0){
              console.log('something went wrong')
            }
            // let deleteThisPhrase = this.deleteOptions[0];
          
            //need to set status here.
            let deleteKey = this.deleteOptions[0].position;
            // console.log('delete key: ' + deleteKey)
            // console.log('delete option is' + this.deleteOptions[0])
            this.deleteOptions[0].status=false;
           
            this.$store.state.baseOutput[deleteKey] = this.priorPhrases[deleteKey];
            this.gripeObject[deleteKey] =  this.priorPhrases[deleteKey];
            this.activeIndexes.push(deleteKey);

            // if(this.removingFirst === true) {
            //     console.log('gripe got removed, adding next one')
            //     this.reAddPhrase=true;
            //     this.moodcount[this.cachedTone]++
            //     this.removingFirst = false
            // }
          
            // this.deleteOptions[deleteKey] = deleteThisPhrase;
            // const selectedOption = deleteThisPhrase;
            // const currentIndex = deleteKey;
            // this.changeLog(currentIndex, selectedOption);
           
        },

        removeFirst() {
            this.removingFirst = true;
            this.cachedTone = this.selectedTone;
            let moodOptions = this.activeMoods.filter(mood => mood !==this.cachedTone)

            moodOptions.sort(() => {return 0.5 - Math.random()});
            this.sacrificialTone = moodOptions[0]
        },

        addPhrase() {


            if(this.moodTotal>=this.moodLimit) {
                console.log('moodcount too high, beginning swapsies')
                this.removeFirst()
            }

            // if(this.activeIndexes.length>0) {

                this.randomize(this.activeIndexes);
                let currentIndex = this.activeIndexes[0];

                this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === this.selectedTone && phrase.position === currentIndex && phrase.status === false);
                console.log('current index is' + currentIndex)
                //come back to this bit. where you left off, because you're trying to iterate through a non iterable
                if(this.selectedPhrases.length===0) {
                    console.log('you ran out of fresh phrases, selected tone is: ' + this.selectedTone)
                    console.log('current index is' + currentIndex)
                 
                    this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === this.selectedTone && phrase.position === currentIndex);
                    this.selectedPhrases.sort(() => {return 0.5 - Math.random()});
                    console.log('selected phrases are' + this.selectedPhrases)
    

                const selectedOption = this.selectedPhrases[0];
                this.selectedPhrase =  this.selectedPhrases[0].phrase;
                // console.log(this.selectedPhrase);
                this.$store.state.baseOutput[currentIndex] = this.selectedPhrase;
                this.gripeObject[currentIndex] = this.selectedPhrase

                this.selectedPhrases[0].status = true;
                this.changeTracker[currentIndex]++;
                this.activeIndexes.shift();
                console.log('active indexes are: ' + this.activeIndexes)
                this.changeLog(currentIndex, selectedOption);
                } else {
                this.selectedPhrases.sort(() => {return 0.5 - Math.random()});

                const selectedOption = this.selectedPhrases[0];
                this.selectedPhrase =  this.selectedPhrases[0].phrase;
                // console.log(this.selectedPhrase);
                this.$store.state.baseOutput[currentIndex] = this.selectedPhrase;
                this.gripeObject[currentIndex] = this.selectedPhrase

                this.selectedPhrases[0].status = true;
                this.changeTracker[currentIndex]++;
                this.activeIndexes.shift()
                console.log('active indexes are: ' + this.activeIndexes)
                this.changeLog(currentIndex, selectedOption);
                }

                if(this.removingFirst === true) {
                this.moodcount[this.sacrificialTone]--
                this.sliderVal[this.sacrificialTone]=!this.sliderVal[this.sacrificialTone];
                } else {
                this.$store.state.add++
                this.moodcount.total++;
                }

        },

        changeLog(key, newPhrase) {
             this.usedPhrases.push(newPhrase);

            // if(this.changeTracker[key]>1) {
            // console.log('phrase history updated');
            // this.phraseHistory[key] = this.newPhrase
            // }
           

        },

        randomize(ar) {
                ar.sort(() => {return 0.5 - Math.random()});
            },

            beforeEnter(el){
            el.style.opacity = 0;
            console.log('beforeEnter')
            console.log(el);
            },

    },

     computed: {
        moodTotal(){
            return this.moodcount.angry+this.moodcount.polite+this.moodcount.paggro+this.moodcount.pirate;
        },
        activeIndexLength(){
            return this.activeIndexes.length
        },
        initReset() {
            return this.removingFirst
        },
        activeTones() {
            return this.activeMoods
        },
        currentTone() {
            return this.selectedTone
        },
        output() {
            return this.$store.state.baseOutput;
        },
        priors() {
            return this.priorPhrases;
        },
        addCount(){
            return this.$store.state.add;
        },
        oldAddCount(){
            return this.$store.state.oldAdd
        },
        subCount() {
            return this.$store.state.sub;
        },
        oldSubCount(){
            return this.$store.state.oldSub;
        }
    },
}

// activeIndexes: ['op1', 'op2', 'of0', 'of1', 'of2', 'co0', 'co2', 'pl0', 'pl1', 'pl2'],
// phrase: `How are you? ${this.activePronouns.subjectP} hope you're well. ${this.activePronouns.subjectP} couldn't help but notice that `,
</script>

<style scoped>
/* temp styling! make less ugly */

.angry {
    color: var(--ion-color-angry);
}

.pirate {
    color: var(--ion-color-pirate);
}

.polite {
    color: var(--ion-color-polite);
}

.paggro {
    color: var(--ion-color-paggro);
}
    #buttons {
     --ion-grid-padding-xs: 0.25rem;
     --ion-grid-padding-sm: 0.5rem;
     --ion-grid-padding-m: 2rem;
     --ion-grid-padding-lg: 4rem;
     --ion-grid-padding-xl: 5rem;

    }

    .buttons {
        display: grid;
        grid-template-columns: repeat(2, minmax(10px, 1fr));
        grid-template-rows: auto;
    }

    ion-range::part(bar) {
        pointer-events: none;
    }

    ion-range::part(bar-active) {
        pointer-events: none;
    }

    .range-bar {
        pointer-events: none;
    }

    .fade-in-enter-active {
    transition: opacity 300ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }

    .fade-in-leave-active {
    transition: opacity 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .fade-in-enter,
    .fade-in-leave-to {
    opacity: 0;
    }

    .snippets {
        margin: 0 auto;
        padding: 0.5rem;

    }

     /* @media(max-width: 576px) {
         .snippets {
             min-height: 50%;
        
         }
     } */

    ion-icon {
        font-size: 2.2rem;
    }

    #sliders {
        /* display: grid; */
        align-items: center;
        justify-content: center;
        /* grid-template-rows: repeat(3, min-content); */
        /* grid-template-columns: minmax(min-content, 1.5fr) 8fr minmax(min-content, 1.5fr); */
    }
</style>

