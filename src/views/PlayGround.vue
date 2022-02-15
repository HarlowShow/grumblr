<template>

    <base-layout page-default-back-link="/input" page-title="Edit your gripe"
    v-if="this.rendered"
    >
    <p> moodcount total: {{ moodTotal }}</p>
    <p> moodcount object: {{ moodcount }} </p>
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
                        :moodLimit="moodLimit"
                        :moodTotal="moodTotal"
                        :reverse="reverse['angry']"
                        :cache="cache"
                        @update:moodCount="updateMood"
                    >
                    </the-sliders>
                    <the-sliders
                        :tone="'polite'"
                        :sliderVal="sliderVal['polite']"
                        :moodLimit="moodLimit"
                        :moodTotal="moodTotal"
                        :reverse="reverse['polite']"
                        :updateFromCache="updateFromCache"
                        :cache="cache"
                        @update:moodCount="updateMood"
                    >
                    </the-sliders>
                    <the-sliders
                        :tone="'paggro'"
                        :sliderVal="sliderVal['paggro']"
                        :moodLimit="moodLimit"
                        :moodTotal="moodTotal"
                        :reverse="reverse['paggro']"
                        :updateFromCache="updateFromCache"
                        :cache="cache"
                        @update:moodCount="updateMood"
                        >
                    </the-sliders>
                    <the-sliders
                        :tone="'pirate'"
                        :sliderVal="sliderVal['pirate']"
                        :moodLimit="moodLimit"
                        :moodTotal="moodTotal"
                        :reverse="reverse['pirate']"
                        :updateFromCache="updateFromCache"
                        :cache="cache"
                        @update:moodCount="updateMood"
                    >
                    </the-sliders>
                  
    </div>

            <chat-bubble
                    id="mobilefooter"
                    :gridClass="'left'">
                        <template v-slot:start>
                            <the-icons :name="'raccoon-shifty'"></the-icons>
                        </template>
                        <template v-slot:end>
                              <chat-typer
                                :chatString="this.backchat"
                                ></chat-typer>
                        </template>
                        <template  v-slot:responses>
                            <button @click="testOne()">test one</button>
                            <button @click="isConfirmed=true">CONFIRM YES</button>
                            <button @click="isConfirmed=false">DON'T YOU DARE</button>
                            <button @click="moodTotalHit.dontAskAgain=true">yes, don't ask me this again</button>
                            <button @click="updateFromCache=true">make update from cache var true</button>
                        </template>
            </chat-bubble>

    


        <!-- 
         -->

         <!-- <ion-button expand="block" color="primary" shape="round" fill="outline" router-link="/finish">Finish</ion-button> -->

            
    </base-layout>
</template>

<script>


import TextSnippet from '../sections/components/TextSnippet.vue'
import TheSliders from '../sections/components/TheSliders.vue'
import ChatBubble from '../sections/components/ChatBubble.vue'
import ChatTyper from '../sections/components/ChatTyper.vue'

import TheIcons from '../sections/components/TheIcons.vue'

import speakPhrases from '../composables/phrases'
import speakTrashPanda from '../composables/trashpandachat'
// import {
//     IonFooter
// } from '@ionic/vue'

import { useStore } from 'vuex'
import { ref } from 'vue'

export default {

    components: {
        ChatBubble,
        ChatTyper,
        TheIcons,
        TextSnippet,
        TheSliders,
        // IonFooter
    },

    setup() {
        //set imports for phrases and selections
        //main phrases
        const phraseObject = speakPhrases()
        const store = useStore()
        const gripeObject = store.state.baseOutput

        //panda backchat
        const trashPandaObject = speakTrashPanda()
        const backchat = ref('')
        backchat.value = trashPandaObject.backtalkChat

        //set initial moods
        const initVal = ref(0)
        const firstTone = store.state.starterTones[0]
        const secondTone = store.state.starterTones[1]
           

        return {
            trashPandaObject,
            backchat: backchat.value,
            setChat: trashPandaObject.setChat,
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

            
            // console.log('first tone is ' + this.firstTone)
            // console.log('second tone is ' + this.secondTone)
            this.addingInit = true
            this.addInit(this.firstTone, 'first')
            this.rendered=true
          
               


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
            
            removedFirst: false,
            awaitingConfirmation: false,
          
            isConfirmed: null,
            rendered: null,
            addingInit: false,
            reAddPhrase: null,
            sliderVal: {
                'angry': false,
                'polite': false,
                'paggro': false,
                'pirate': false
            },
            reverse: {
                'angry': false,
                'polite': false,
                'paggro': false,
                'pirate': false
            },
            cache: {
                cachedMoodcount: null,
                cachedTone: '',
            },
            deleteThisTone: '',
            moodTotalHit: {
                dontAskAgain: false,
                justCached: false,
            },
            updateFromCache: null,
            removingFirst: false,
            sacrificialTone: '',
            tempTone: '',
         
            activeMoods: [],
            hasAngry: false,
            hasPolite: false,
            hasPaggro: false,
            hasPirate: false,
            chatted: {
                angry: false,
                polite: false,
                paggro: false,
                pirate: false,
                confused: 0,
                confusedReset: false,
            },
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
        //* this one has the comments
        'moodcount.angry': function(newValue, oldValue) {

                //* tracking for active phrases (though this probs should have been a computed)
             if(newValue>0&&this.hasAngry===false) {
                    this.activeMoods.push('angry')
                    this.hasAngry = true;
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='angry')
                    this.hasAngry = false;
                }

                //* tracking for the backchat ui stuff
                if(newValue>=3&&this.chatted.angry===false) {
                    this.setBackchat('medium', 'angry')
                    this.chatted.angry=true
                }
                if(newValue>=9&&this.chatted.angry===false) {
                    this.setBackchat('max', 'angry')
                    this.chatted.angry=true
                }

                // *if this add is one subsequent to removing first, set the tone to the initial cached tone
                // if(this.removedFirst===true) {
                //     this.selectedTone = this.cachedTone
                //     console.log('cached tone set as: ' + this.selectedTone)
                //     this.removedFirst = false
                // } else {
                //     this.selectedTone = 'angry'
                //     }

                this.selectedTone = 'angry'

                //* trigger the function that makes the changes, pass the difference thorough so it knows how many times to add/remove    
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
                //! changes here need to be applied to other watched moods
                //* if we've just removed one, add one a few seconds after that, then set the timeout to false
                if(this.removingFirst===true) {
                    console.log('removing first is true, about to add one... or not')
                    this.readd()
                    this.removingFirst=false
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

            
                if(newValue>=3&&this.chatted.polite===false) {
                    this.setBackchat('medium', 'polite')
                    this.chatted.polite=true
                }

                if(newValue>=9&&this.chatted.polite===false) {
                    this.setBackchat('max', 'polite')
                    this.chatted.polite=true
                }
                
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

                  if(this.removingFirst===true) {
                    console.log('removing first is true, about to add one... or not')
                    this.readd()
                    this.removingFirst=false
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

              if(newValue>=3&&this.chatted.paggro===false) {
                    this.setBackchat('medium', 'paggro')
                    this.chatted.paggro=true
                }

                if(newValue>=9&&this.chatted.paggro===false) {
                    this.setBackchat('max', 'paggro')
                    this.chatted.paggro=true
                }

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

                 if(this.removingFirst===true) {
                    console.log('removing first is true, about to add one... or not')
                    this.readd()
                    this.removingFirst=false
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

                if(newValue>=3&&this.chatted.pirate===false) {
                    this.setBackchat('medium', 'pirate')
                    this.chatted.pirate=true
                }

                if(newValue>=9&&this.chatted.pirate===false) {
                    this.setBackchat('max', 'pirate')
                    this.chatted.pirate=true
                }
           
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

                if(this.removingFirst===true) {
                    console.log('removing first is true, about to add one... or not')
                    this.readd()
                    this.removingFirst=false
                }
    
        },

        activeIndexLength: {
                handler() {
                // console.log('watcher triggered, length is' + this.activeIndexes.length)
                    if(this.activeIndexes.length===0) {
                            this.activeIndexes = this.allIndexes;
                            // console.log('indexes reset')
                    }  
                },
                deep: true
            },

        activeMoodLength(newVal) {
            if(newVal>=3&&this.chatted.confused===0) {
                  this.setBackchat('confused', 'one')
                  this.chatted.confused++
            }  else if(newVal>=3&&this.chatted.confused===1&&this.chatted.confusedReset===true) {
                  this.setBackchat('confused', 'two')
                  this.chatted.confused++
            }
            
            if(this.chatted.confused===1&&newVal<3) {
                this.chatted.confusedReset=true;
            }
           
        },

        //related to backchat UI
        moodTotal(newVal){
            //if they're trying to add beyong the mood limit, warn that there will be a delete first
              if(newVal>this.moodLimit) {
                    this.setBackchat('alerts', 'moodTotalReached')
                }
        },

        isConfirmed() {
            this.getConfirmation().then((val) => {
                this.awaitingConfirmation=false
               
                console.log('promise resolved as: ' + val)
                    if(val===true) {
                        this.deleteThisTone = this.selectedTone
                        console.log('delete tone is... ' + this.deleteThisTone)
                    this.removeFirst()
                    } else {
                    return;
                    }
            })
        }
        
    },

    methods: {

        readd() {
           
                        //* instead of doing a thingy here do another prop thingy that sends the cached moodcount back down to the parent component
                        //* so it loops back through the original sequence instead of forcing another awkward slider change without value change
                        this.updateFromCache = true;
                        let newCachedVal = this.moodcount[this.$store.state.cache.cachedTone]
                        newCachedVal++
                        this.$store.state.cache.cachedRangeVal = newCachedVal
                        this.moodcount[this.$store.state.cache.cachedTone] = newCachedVal   
                        console.log('starting readd, will be adding to: ' + this.$store.state.cache.cachedTone)
                        console.log('new cached val should be... ' + newCachedVal)
                        
                        // this.addingPhrase()
        },

        updateMood({val, tone, fromCache}) {

            // console.log(val, tone)
            this.moodTotalHit.justCached = fromCache
           
           
            //* check if we need to get confirmation before updating the value
            if(this.confirmReverse === true) {
                    //* pass reverse down to child component so it undoes the slider thing
                    this.$store.state.cache.cachedTone = tone
                    this.$store.state.cache.cachedMoodcount = val
                    this.tempTone = tone
                    this.reverse[tone] = true;
                    this.awaitConfirmation()
            } else if (this.confirmReverse===false&&this.moodTotalHit.justCached===true) {
                this.moodTotalHit.justCached=false

                this.moodcount[tone] =  this.$store.state.cache.cachedMoodcount
                console.log('just started cached tone update')
            } else {
                this.moodcount[tone] = val
            }

            //* if the answer is no, revert? do i need a cached moodcount so it works for the sliders?
        },

        testOne() {
            // this.backchat = 'who, this is new!'
            // console.log('backchat default is: ' + this.backchat)
            this.setBackchat('max', 'angry')
            console.log(this.$store.state.cache)
        },

        setBackchat(obj, inner) {
              let testVar = this.setChat(obj, inner)
            this.backchat = testVar
        },

        //add initial two tones (tbu)
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
                        // console.log("about to REadd phrase")
                     }
    
                    for(; difference>0; difference--) {
                        // console.log("about to add phrase")
                        setTimeout(() =>{
                            this.addPhrase()
                        },300)
                        
                    }
                }
                    if (type==='sub') {
                    for(; difference>0; difference--) {
                        // console.log("about to remove phrase")
                        setTimeout(()=> {
                            this.reverseGripe(this.selectedTone)
                            console.log('ran normal reverse gripe')
                        },300)
                    }
                }
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
              console.log('delete options: something went wrong')
              //TODO: now the tone coming through is the cached one
              console.log('you tried to delete at: ' + tone + 'from: ' + this.usedPhrases)
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
            console.log('removeFirst function triggered')
            //*set var as true to avoid adding before this
            this.removingFirst = true;
          
            let moodOptions = this.activeMoods.filter(mood => mood !==this.$store.state.cache.cachedTone)
            //*pick a tone to remove from
            moodOptions.sort(() => {return 0.5 - Math.random()});
            this.sacrificialTone = moodOptions[0]
            console.log('sacrificial tone is: ' + this.sacrificialTone)
            this.addPhrase();
        },

        awaitConfirmation() {

            //* wait for them to confirm if they want to remove another phrase

        
            this.awaitingConfirmation = true;
            console.log('waiting')

            setTimeout(() => {
                this.awaitingConfirmation = false;
                console.log('finished waiting')
                // no longer waiting - potentially do something else
            }, 20000)

                    //* change the reverse val back
                    setTimeout(() => {
                    this.reverse[this.tempTone]=false
                }, 200)
        },

        getConfirmation() {
            return new Promise((resolve) => {
                //TODO: if they go down on their own needs to resolve as false, or if the max no. changes or w/e
                //TODO: everything should be cancelled if the total goes down before that
                if (this.isConfirmed===true) {
                    resolve(true)
                } else if (this.isConfirmed===false) {
                    resolve(false)
                } else {
                    resolve(false)
                }
            });
        },


        addPhrase() {
                //* a space for bonus logic i guess
                    this.addingPhrase()

            },

            //! FTR
            //  addPhrase() {
            //     //* if we're already about to remove, skip this bit
            //     //? is it better to send the removing process through this first or send it straight to adding phrase?
            //     //? are there any use cases for pushing it through the full loop again?
            //     if(this.removingFirst===true) {
            //         this.addingPhrase()
            //     }
            //     //* check if one needs to be bumped before adding, wait for comfirmation
            //     else if(this.moodTotal>this.moodLimit&&this.dontAskAgain===false) {
            //         //* pass reverse down to child component so it undoes the slider thing
            //         this.tempTone = this.selectedTone
            //         this.reverse[this.tempTone] = true;
            //         this.awaitConfirmation()
            //     }
            //     else {
            //         //* if nothing needs bumping first
            //         this.addingPhrase()
            //     }

            // },

        selectPhrase(){
                //* get random index and pick index
                this.randomize(this.activeIndexes);
                let currentIndex = this.activeIndexes[0];

                //* get your phrases based on tone
                this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === this.selectedTone && phrase.position === currentIndex && phrase.status === false);
                // console.log('current index is' + currentIndex)

                //!shitty code that hopefully won't need to be triggered
                if(this.selectedPhrases.length===0) {
                    console.log('you ran out of fresh phrases, so your shitty code was triggered')
                    this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === this.selectedTone && phrase.position === currentIndex);
                    this.selectedPhrases.sort(() => {return 0.5 - Math.random()});
                    const selectedOption = this.selectedPhrases[0];
                    this.selectedPhrase =  this.selectedPhrases[0].phrase;
                    this.$store.state.baseOutput[currentIndex] = this.selectedPhrase;
                    this.gripeObject[currentIndex] = this.selectedPhrase
                    this.selectedPhrases[0].status = true;
                    this.changeTracker[currentIndex]++;
                    this.activeIndexes.shift();
                    this.changeLog(currentIndex, selectedOption);
                } else {
                this.selectedPhrases.sort(() => {return 0.5 - Math.random()});

                //* update the selected phrase and vuex object
                const selectedOption = this.selectedPhrases[0];
                this.selectedPhrase =  this.selectedPhrases[0].phrase;
                // console.log(this.selectedPhrase);
                this.$store.state.baseOutput[currentIndex] = this.selectedPhrase;
                this.gripeObject[currentIndex] = this.selectedPhrase

                //* mark the phrase as selected/index tracking
                this.selectedPhrases[0].status = true;
                this.changeTracker[currentIndex]++;
                this.activeIndexes.shift()
                // console.log('active indexes are: ' + this.activeIndexes)
                this.changeLog(currentIndex, selectedOption);
                }
        },

        addingPhrase() {

                //* if removing first, remove first
                //! needs mechanism for it to wait properly and not fuck it
                if(this.removingFirst === true) {
                    // this.selectPhrase()
                    console.log('removing first, chosen phrase is: ' + this.selectedPhrase)
                    //this might need to wait first too
                    this.moodcount[this.sacrificialTone]--
                    this.sliderVal[this.sacrificialTone]=!this.sliderVal[this.sacrificialTone];
                    } else {
                    this.selectPhrase()
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
            // console.log('beforeEnter')
            // console.log(el);
            },

    },

     computed: {
        confirmReverse() {
            let response = null
            if (this.moodTotalHit.justCached===true) {
                response = false
            } else if (this.moodTotalHit.dontAskAgain===true){
                response = false
            } else if (this.moodTotal===this.moodLimit) {
                response = true
            } else {
                response = false
            }
            return response 
        },
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
        activeMoodLength() {
            return this.activeMoods.length
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
    
    #mobilefooter {
        position: absolute;
        bottom: 0px;
        width: 100vw;
    }
   

</style>

