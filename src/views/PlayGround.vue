<template>

    <base-layout page-default-back-link="/input" page-title="Edit your gripe"
  
    >

    <p>{{ this.next.step }}</p>
    <div class="flex">
    <button @click="getMoodsTest({val: 5, tone: 'paggro'}, 3)">ADD: paggro 3 --> 5</button>
        <button @click="getMoodsTest({val: 5, tone: 'pirate'}, 5)">OVERCLOCK: pirate 0 --> 5</button>
    <button @click="getMoodsTest({val: 1, tone: 'paggro'}, 1)">MINUS: paggro 3 --> 1</button>
    </div>

     <ion-chip
            color="success"
            v-for="(value, name) in moodcount"
            :key="name">
            {{ name }} {{ value}}
    </ion-chip>

    <div v-if="this.testing"
    class="flex"
    >

 
        <div>
            <ul>
                <li v-for="(value, mood) in testing.count"
                :key="mood">
                <p>{{ mood }}: {{ value }}</p>
                </li>
            </ul>
            <p> total: {{ testingMoodTotal }}</p>
        </div>

       
            
  
    </div>
       <p>active moods: {{ testing.activeMoods }}</p>

    <!-- <p> {{ this.selectedPhrases }} </p>
 
    <p>active index length: {{ activeIndexLength }}</p>

    <p v-for="text in output" :key="text">
        {{ text }}
    </p> -->
    <!-- <p>delete options: {{ deleteOptions }}</p>
    <p>used phrases: {{ usedPhrases }}</p> -->
<!-- <p>prior phrases: {{ priorPhrases }}</p> -->


    <div class="snippets">
        <new-snippet v-for="(value, name, index) in gripeObject"
        :initReset="this.queue.removingFirst"
        :key="index"
        :value="value"
        :name="name"
        :index="index"
        :snippet="gripeObject[name]"
        :tone="this.queue.tone"
        ></new-snippet>
    </div>   

    <!-- <div class="snippets">
        <text-snippet v-for="(value, name, index) in gripeObject"
        :initReset="removingFirst"
        :key="index"
        :value="value"
        :name="name"
        :index="index"
        :snippet="gripeObject[name]"
        :tone="this.selectedTone"
        ></text-snippet>
    </div>    -->

    <div id="sliders">

                    <the-sliders
                        v-for="mood in allMoods"
                        :key="mood"
                        :tone="mood"
                        :sliderVal="sliderVal[mood]"
                        @update:getMoods="getMoods"
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
                           
                        </template>
            </chat-bubble>

    


        <!-- 
         -->

         <!-- <ion-button expand="block" color="primary" shape="round" fill="outline" router-link="/finish">Finish</ion-button> -->

            
    </base-layout>
</template>

<script>


// import TextSnippet from '../sections/components/TextSnippet.vue'
import NewSnippet from '../sections/components/NewSnippet.vue'
import TheSliders from '../sections/components/TheSliders.vue'
import ChatBubble from '../sections/components/ChatBubble.vue'
import ChatTyper from '../sections/components/ChatTyper.vue'
import { IonChip } from '@ionic/vue'

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
        IonChip,
        ChatBubble,
        ChatTyper,
        TheIcons,
        // TextSnippet,
        TheSliders,
        NewSnippet,
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
            //! move this to the child component
      

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
            reverse: {
                'angry': false,
                'polite': false,
                'paggro': false,
                'pirate': false
            },
            //? useful?
            moodTotalHit: {
                dontAskAgain: false,
                justCached: false,
            },

            removingFirst: false,
            sacrificialTone: '',
            tempTone: '',
         
            activeMoods: [],
            allMoods: [ 'angry', 'polite', 'paggro', 'pirate'],
            hasAngry: false,
            hasPolite: false,
            hasPaggro: false,
            hasPirate: false,
            chatted: {
                angry: 0,
                polite: 0,
                paggro: 0,
                pirate: 0,
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

            testing: {
                        afterVal: 0,
                        afterTone: 0,
                        count: {
                            angry: 0,
                            polite: 1,
                            paggro: 3,
                            pirate: 0,
                            total: 4,
                        },
                        prevCount: {},
                        activeMoods: ['polite', 'paggro'],
                        //* used for testing 
                        sampleCount: {

                        },
                      
            },

            reversable: {
                angry: null,
                polite: null,
                paggro: null,
                pirate: null,
            },

             next: {
                // track progress in the sequence
                step: null,
                // boolean on whether subs need to be made before adds
                subFirst: null,
                // initial values pulled from sliders
                init: {
                    tone: '',
                    val: null,
                },
                // determine number of subs/adds for the queue
                // then create array queues based on these
                // the leeway is the number of possible adds before hitting the limit
                // to be used when the limit is hit
                difference: {
                    sub: null,
                    add: null,
                    leeway: null,
                    leewayTones: [],
                    subTones: [],
                    addTones: [],
                    subOpts: {

                        angry: [],
                        polite: [],
                        paggro: [],
                        pirate: [],
                    }
                }
               
            },

            queue: {
                    leeway: [],
                    sub: [],
                    add: [],
                    leewayed: false,
                    subbed: false,
                    added: false,
                    doing: 'none',
                    removingFirst: false,
                    tone: '',
            }
        };
    },

    watch: 
    {
        //* this one has the comments
        'moodcount.angry': function(newValue) {

                //* tracking for active phrases (though this probs should have been a computed)
                //! move this somewhere else
                if(newValue>0&&this.hasAngry===false) {
                    this.activeMoods.push('angry')
                    this.hasAngry = true;
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='angry')
                    this.hasAngry = false;
                }

                //* tracking for the backchat ui stuff
                //? move this too? into a separate function?
                if(newValue===3&&this.chatted.angry===0) {
                    this.setBackchat('medium', 'angry')
                    this.chatted.angry=1
                }
                if(newValue===8&&this.chatted.angry===1) {
                    this.setBackchat('max', 'angry')
                    this.chatted.angry=2
                }
        },

         'moodcount.polite': function(newValue) {
             
            if(newValue>0&&this.hasPolite===false) {
                    this.activeMoods.push('polite')
                    this.hasPolite=true
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='polite')
                    this.hasPolite=false
                }

            
                if(newValue===3&&this.chatted.polite===0) {
                    this.setBackchat('medium', 'polite')
                    this.chatted.polite=1
                }

                if(newValue===8&&this.chatted.polite===1) {
                    this.setBackchat('max', 'polite')
                    this.chatted.polite=2
                }
            
        },

            'moodcount.paggro': function(newValue) {
           
             if(newValue>0&&this.hasPaggro===false) {
                    this.activeMoods.push('paggro')
                    this.hasPaggro=true;
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='paggro')
                    this.hasPaggro=false;
                }

              if(newValue===3&&this.chatted.paggro===0) {
                    this.setBackchat('medium', 'paggro')
                    this.chatted.paggro=1
                }

                if(newValue===8&&this.chatted.paggro===1) {
                    this.setBackchat('max', 'paggro')
                    this.chatted.paggro=2
                }
            
        },

            'moodcount.pirate': function(newValue) {
                
               if(newValue>0&&this.hasPirate===false) {
                    this.activeMoods.push('pirate')
                    this.hasPirate=true;
                } else if (newValue<=0) {
                    this.activeMoods = this.activeMoods.filter(mood => mood !=='pirate')
                    this.hasPirate=false;
                }

                if(newValue===3&&this.chatted.pirate===0) {
                    this.setBackchat('medium', 'pirate')
                    this.chatted.pirate=1
                }

                if(newValue===8&&this.chatted.pirate===1) {
                    this.setBackchat('max', 'pirate')
                    this.chatted.pirate=2
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
                if(newVal===this.moodLimit) {
                    console.log('replace mode one')
                    this.$store.state.replace = true
                } else if (newVal < this.moodLimit) {
                    this.$store.state.replace = false
                }
              if(newVal>this.moodLimit) {
                    this.setBackchat('alerts', 'moodTotalReached')
                }
        },

        
    },

    methods: {

        resetNext() {
            let reset = {

                step: 'ready',
                subFirst: null,
                init: {
                    tone: '',
                    val: null,
                },
                difference: {
                    sub: null,
                    add: null,
                    leeway: null,
                    leewayTones: [],
                    subTones: [],
                    addTones: [],
                    subOpts: {

                        angry: [],
                        polite: [],
                        paggro: [],
                        pirate: [],
                    }
                }
            }
            this.next = reset
        },

        resetQueue() {
            let reset = {
                    leeway: [],
                    sub: [],
                    add: [],
                    leewayed: false,
                    subbed: false,
                    added: false,
                    removingFirst: false,
                    doing: 'none'
            }
            this.queue = reset
        },


        //? is it worth passing vals into a local object instead of keeping everyting global? quite poss
        //* testing function as a starting point so you can pass in test values needed later on
        getMoods({val, tone}, afterVal){
            this.next.step='getMoodsTest'
            console.log('starting step: ' + this.next.step)

            this.next.init = {val, tone}
            this.testing.afterVal = afterVal
            this.testing.afterTone = tone

            //! set testing vars. Remember to remove these after

            //* copy initial count for the previous vals test
            this.testing.prevCount = {...this.testing.count}

            //* update with new value
            this.testing.count[tone] = afterVal
            console.log('assigned test count')

            this.testing.count.total = this.testing.count.angry + this.testing.count['polite'] + this.testing.count['paggro'] + this.testing.count['pirate']
            this.createQueue(val, tone)

            
        },
        // * get the moods from the sliders
        getMoodsARCHIVE({val, tone}) {
            // * set step
            this.next.step='getMoods'
            console.log('starting step: ' + this.next.step)

            this.next.init = {val, tone}
           
            this.createQueue(val, tone)
        },

        async createQueue(val, tone) {
              this.next.step='createQueue'
              console.log('starting step: ' + this.next.step)

              try {
                 
            // * return true if subs needed first, otherwise false
                const checkDiff = await this.getDifference(val, tone)
                console.log('checkdiff is: ' + checkDiff)
            // * calc how many need adding/subbing
                const setDiff = await this.setDifference(val, tone)
                console.log('setdiff is: ' + setDiff)
            // * create a queue of actions
                const pushDifference = await this.pushDifference()
                console.log('push difference is: ' + pushDifference)

              } catch(e) {
                  console.log(e)
              } finally {
                  //? update final count here, but useful to set init count somewhere else to decide on scenarios
                  console.log('all done! moving on')
                  this.resetNext()
                  this.manageQueue()
                
              }

        },

        async manageQueue(){
            this.next.step = 'manageQueue'
            console.log('starting step: ' + this.next.step)

            //! start with just add queue to test, only try adding!

            try {
                
            //! atm the snippet stuff has no sync element to it, which might be fine but might need to put another loop/delay in there
            let toSub = this.queue.sub.length
            let toLeeway = this.queue.leeway.length
            let toAdd = this.queue.add.length
           
            this.leeway(toLeeway)
            const leewayed = await this.nextQueue('leeway')
            console.log(leewayed)

            this.sub(toSub)
            const subbed = await this.nextQueue('sub')
            console.log(subbed)
      
            this.add(toAdd)
            const added = await this.nextQueue('add')
            console.log(added)
            } catch {
                console.log('error in some part of the queue bit')
            } finally {
                console.log('queue managed!')
            }

            //! finally: this.resetQueue()
        },

       leeway(leewayQ){
            this.next.step="leeway"
            this.queue.doing="leeway"

            if(leewayQ>0) {
          
                 for(let i = 0; i < leewayQ; i++) {

                        //* tracking that lets the snippet know when to be pushing/pulling
                    this.$store.state.add++

                    let tone = this.queue.leeway[0]
                    this.queue.tone = tone
    
                       //* get random index and pick index
                    this.randomize(this.activeIndexes);
                    let currentIndex = this.activeIndexes[0];

                    this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === tone && phrase.position === currentIndex && phrase.status === false);
                    this.selectedPhrases.sort(() => {return 0.5 - Math.random()});
                    let selectedObj = this.selectedPhrases[0]
                    let selected = this.selectedPhrases[0].phrase
                    console.log(i + ':' + selected)
                    

                    //* mark the phrase as selected/index tracking
                    this.selectedPhrases[0].status = true;
                    this.changeTracker[currentIndex]++;
                    this.activeIndexes.shift()
                    // console.log('active indexes are: ' + this.activeIndexes)
                    this.changeLog(currentIndex, selectedObj);
                    this.queue.leeway.shift()

                    //* add to vuex tracking and the gripe object, which triggers the actual text change
                    this.$store.state.baseOutput[currentIndex] = selected
                    this.gripeObject[currentIndex] = selected

                    if(this.queue.leeway.length===0) {
                        //! this could be a good place to update moodcount - after each step?
                        //! or do it at the end of everything?
                        this.nextQueue('leeway')
                    }
                 }
            } else {
                console.log('no leeway added')
                setTimeout(() => {
                    this.nextQueue('leeway')
                }, 100)
            }
          
        },

        add(addQ){
            this.next.step="add"
            this.queue.doing="add"

            if(addQ>0) {
          
                 for(let i = 0; i < addQ; i++) {

                        //* tracking that lets the snippet know when to be pushing/pulling
                    this.$store.state.add++

                    let tone = this.queue.add[0]
                    this.queue.tone = tone
    
                       //* get random index and pick index
                    this.randomize(this.activeIndexes);
                    let currentIndex = this.activeIndexes[0];

                    this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === tone && phrase.position === currentIndex && phrase.status === false);
                    this.selectedPhrases.sort(() => {return 0.5 - Math.random()});
                    let selectedObj = this.selectedPhrases[0]
                    let selected = this.selectedPhrases[0].phrase
                    console.log(i + ':' + selected)
                    

                    //* mark the phrase as selected/index tracking
                    this.selectedPhrases[0].status = true;
                    this.changeTracker[currentIndex]++;
                    this.activeIndexes.shift()
                    this.queue.add.shift()

                    //* push into used phrases array
                    this.changeLog(currentIndex, selectedObj);
                   

                    //* add to vuex tracking and the gripe object, which triggers the actual text change
                    this.$store.state.baseOutput[currentIndex] = selected
                    this.gripeObject[currentIndex] = selected

                    if(this.queue.add.length===0) {
                        //! this could be a good place to update moodcount - after each step?
                        //! or do it at the end of everything?
                        this.nextQueue('add')
                    }
                 }
            } else {
                console.log('no add necessary')
                setTimeout(() => {
                     this.nextQueue('add')
                }, 100)
               
            }
          
        },

        sub(subQ){
                this.next.step="sub"
                this.queue.doing="sub"

            if(subQ>0) {
          
                 for(let i = 0; i < subQ; i++) {
                    this.$store.state.sub++

                    let tone = this.queue.sub[0]
                    this.queue.tone = tone

                    let deleteOptions = this.usedPhrases.filter(phrase => phrase.tone === tone && phrase.status === true)
                    
                    this.selectedPhrases.sort(() => {return 0.5 - Math.random()});
                    //* find an index where a used phrase can be deleted
                    let deleteKey = deleteOptions[0].position
                    this.activeIndexes.push(deleteKey)
                    //* add to vuex and trigger the actual change
                    this.$store.state.baseOutput[deleteKey] = this.priorPhrases[deleteKey];
                    this.gripeObject[deleteKey] =  this.priorPhrases[deleteKey];

                     if(this.queue.sub.length===0) {
                        //! this could be a good place to update moodcount - after each step?
                        //! or do it at the end of everything?
                        this.nextQueue('sub')
                    }

                }
            } else {
                console.log('no sub necessary')
                setTimeout(() => {
                     this.nextQueue('sub')
                }, 100)
            }
        },

        nextQueue(status){
            
            console.log('just finished: ' + status)
            return new Promise((resolve) => {
                  if(status==='leeway'){
                      this.queue.doing = 'none'
                      this.queue.leewayed = true
                  resolve(status)
                  } else if (status==='sub'){
                      this.queue.doing = 'none'
                      this.queue.subbed = true
                  resolve(status)
                  } else if(status==='add'){
                      this.queue.doing = 'none'
                      this.queue.added = true
                  resolve(status)
                  }
              })
        },

        getDifference(){
            return new Promise ((resolve) => {
                // * set step
                this.next.step="getDifference"
                console.log('starting step: ' + this.next.step)
                
                // * find out if the number is going to be greater than the limit - do more elegantly when done with testing
                let hypotheticalTotal = this.testing.count.total
                console.log('hypothetical total is: ' + hypotheticalTotal)
                if(hypotheticalTotal>this.moodLimit) {
                    // * if the limit is reached, indicate that the mode will be adding first
                    // TODO: add another promise thingy here in a different step that lets them reject this option
                    this.next.subFirst = true
                    let leeway = this.moodLimit - this.testing.prevCount.total
                    // console.log('leeway: ' + leeway)
                    this.next.difference.leeway = leeway
                } else {
                    this.next.subFirst = false
                }
                resolve(this.next.subFirst)
            })
        },

        setDifference(val, tone){
            return new Promise ((resolve, reject) => {

                    this.next.step="setDifference"
                    console.log('starting step: ' + this.next.step)

                    let oldVal = this.testing.prevCount[tone]
                    // console.log('old val is: ' + oldVal)
                    let newVal = val
                    let numType = Math.sign(newVal-oldVal)
                    let diff = null
                    // console.log('num type is: ' + numType)
                    // * this returns whether it's negative or positive, negative is -1 and positive is 1
                    if (numType===-1||newVal===0) {
                        // * if subtract
                        diff = oldVal - newVal
                        this.next.difference.sub = diff

                        resolve(diff)
                    } else if (numType===1) {
                        //* if add
                        //! testing, adding var to active moods
                        this.testing.activeMoods.push(tone)
                        diff = newVal - oldVal

                        //* if leeway, set add to the val that will be added after leeway
                        if(this.next.subFirst===true&&this.next.difference.leeway){
                           this.next.difference.add = diff - this.next.difference.leeway
                           this.next.difference.sub = this.next.difference.add
                        } else {
                     
                            this.next.difference.add = diff
                            }

                        resolve(diff)
                    } else {
                        //* throw error if there's no difference
                        reject('error in calculating difference')
                    }
                // console.log('diff is: ' + diff)
                })

        },

        pushDifference() {

            return new Promise((resolve, reject) => {
                    
                    this.next.step="pushDifference"
                    // console.log('starting step: ' + this.next.step)
                    let tone = this.next.init.tone

                       //* if we're just adding
                        if (this.next.difference.add>0&&this.next.subFirst===false){
                            let addArr = Array.from({
                                length: this.next.difference.add
                            }, () => (tone))
                            this.next.difference.addTones = addArr
                            this.queue.add = addArr
                            console.log(this.next.step + ': just adding')

                            resolve('added')

                            //* if we're just subbing
                        } else if (this.next.difference.sub>0&&this.next.subFirst===false) {
                        
                            let subArr = Array.from({
                                length: this.next.difference.sub
                            }, () => (tone))
                            this.next.difference.subTones = subArr
                            this.queue.sub = subArr
                            console.log(this.next.step + ': just subbing')

                            resolve('subbed')

                            //*if we have to sub first
                        } else if (this.next.difference.sub>0&&this.next.subFirst===true) {

                            console.log(this.next.step + ': started doing the complicated one')

                            if (this.next.difference.leeway>0) {
                            //* if there's leeway, fill leeway array with add tones
                        
                            let arr = Array.from({
                                length: this.next.difference.leeway
                            }, () => (tone))
                            this.next.difference.leewayTones = arr
                            this.queue.leeway = arr
                        }
                        
                            //* create an object showing how many times each active mood can be used
                            const options = {}
                                //! active moods array updated here for test purposes, will need implementing properly in main thing
                                //! remember that this assumes all are greater than zero, so it might bug out if you stray from test scenario
                                const subMoods = this.testing.activeMoods.filter(mood => mood!==tone);
                                subMoods.forEach((item) => {
                                    if(item) {
                                    //* make an array of all possible
                                        options[item] = Array.from({
                                        length:  this.testing.count[item]
                                        }, () => (item))
                                
                                    }
                                })

                                //* assign the arrays to the difference object then run the function that pushes a random mood x times
                                //* this is for the sub array
                                this.next.difference.subOpts = {...options}
                                let subCount = this.next.difference.sub
                                this.pushSubs(subCount)
                                this.queue.sub = this.next.difference.subTones

                                //* finally, fill the add array with the chosen tone
                                    
                                let finalAddArr = Array.from({
                                    length: this.next.difference.add
                                }, () => (tone))
                                this.next.difference.addTones = finalAddArr
                                this.queue.add = finalAddArr
                        
                            resolve('did the complicated thing')

                        } else {
                            reject('error in pushing to arrays')
                        }
                })
        },

        pushSubs(count) {
            //* select a random array from sub options, push one then slice one
            console.log('count is: ' + count)
            for(let i = 0; i < count; i++) {
                const {   
                    difference: {
                                subOpts: { ...rest }
                                }
                    } = this.next

                console.log(rest)

                let keys = Object.keys(rest)
                let chosen = [keys[ keys.length * Math.random() << 0]]

                let pushMe = rest[chosen][0]
                console.log(pushMe)

                this.next.difference.subTones.push(pushMe)
                rest[chosen].pop()

                if(rest[chosen].length===0) {
                    delete rest[chosen]
                    console.log('removed empty key')
                }
      
                this.next.difference.subOpts = { ...rest }
                console.log('sub pushed')
            }

        },


        updateMood({val, tone}) {
                this.moodcount[tone] = val
        },

        testOne() {
            // this.backchat = 'who, this is new!'
            // console.log('backchat default is: ' + this.backchat)
            this.setBackchat('max', 'angry')
            console.log(this.$store.state.cache)
        },

        randomFromRange(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
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
            this.$store.state.moodcountTotal--
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
            this.removingFirst = true
            console.log('removeFirst function triggered')
            //*set var as true to avoid adding before this
          
            let moodOptions = this.activeMoods.filter(mood => mood !==this.selectedTone)
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

                //TODO: if the mood limit is max, pick the sacrificial tone

                //TODO: otherwise, go onto the next bit normally

                    this.addingPhrase()
                    //! then above function should maybe direct them to separate functions, so it's a loop
                    //! although if it's doing the remove one it should be waiting on the other one - can assign a waiting var and use it like the isConfirm, but make it way less convoluted

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
                if(this.$store.state.replace === true) {
                    // this.selectPhrase()
                    console.log('sacrificial tone is: ' + this.sacrificialTone)
                    console.log('removing first, chosen phrase is: ' + this.selectedPhrase)
                    //this might need to wait first too
                    this.moodcount[this.sacrificialTone]--
                    this.sliderVal[this.sacrificialTone]=!this.sliderVal[this.sacrificialTone];
                    // this.$store.state.moodcountTotal--
                    } else {
                    this.selectPhrase()
                    this.$store.state.add++
                    this.moodcount.total++;
                    this.$store.state.moodcountTotal++
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
        // confirmReverse() {
        //     let response = null
        //     if (this.moodTotalHit.justCached===true) {
        //         response = false
        //     } else if (this.moodTotalHit.dontAskAgain===true){
        //         response = false
        //     } else if (this.moodTotal===this.moodLimit) {
        //         response = true
        //     } else {
        //         response = false
        //     }
        //     return response 
        // },
        moodTotal(){
            return this.moodcount.angry+this.moodcount.polite+this.moodcount.paggro+this.moodcount.pirate;
        },
        testingMoodTotal(){
            return this.testing.count.angry+this.testing.count.polite+this.testing.count.paggro+this.testing.count.pirate;
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

