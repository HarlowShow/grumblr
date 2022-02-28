<template>

    <base-layout page-default-back-link="/input" page-title="Edit your gripe">

    <div class="snippets">
        <new-snippet v-for="(value, name, index) in gripeObject"
        :initReset="this.subFirst"
        :key="index"
        :value="value"
        :name="name"
        :index="index"
        :snippet="gripeObject[name]"
        ></new-snippet>
    </div>   

   <div id="sliders">
                    <the-sliders
                        v-for="mood in allMoods"
                        :key="mood"
                        :tone="mood"
                        :isActive="activeSlider[mood]"
                        :sliderVal="sliderVal[mood]"
                        @update:getMoods="getMoods">
                    </the-sliders>
    </div>

  

            <chat-bubble
                    v-if="collapsed===false"
                    id="mobilefooter"
                    :gridClass="'left'"
                    :iconSlot="true">
                        <template v-slot:start>
                            <the-icons :name="'raccoon-shifty'"></the-icons>
                        </template>
                        <template v-slot:icon>
                        <span
                        @click="toggleChat"
                        class="close-chat"
                        >x</span>
                        </template>
                        <template v-slot:end>
                                <chat-typer
                                :chatString="this.backchat"
                                ></chat-typer>
                        </template>
                        <template  v-slot:responses>
                                <chat-response
                                :data="chatResponseOptions"
                                @update:value="goToEnd"
                                >
                                </chat-response>
                        </template>
            </chat-bubble>
            <div
             v-else
             @click="toggleChat">
            <chat-bubble
                   
                    id="mobilefooter"
                    :gridClass="'left'"
                    :iconSlot="true">
                        <template v-slot:start>
                            <the-icons :name="'chat-active'"
                            :newChat="newChat"
                            ></the-icons>
                        </template>
            </chat-bubble>
            </div>
              <!-- <button class="help" @click="toggleChatStatus">click me</button> -->
    </base-layout>
</template>

<script>

import NewSnippet from '../sections/components/NewSnippet.vue'
import TheSliders from '../sections/components/TheSliders.vue'
import ChatBubble from '../sections/components/ChatBubble.vue'
import ChatTyper from '../sections/components/ChatTyper.vue'
import ChatResponse from '../sections/components/ChatResponse.vue'

// import { IonChip } from '@ionic/vue'
import TheIcons from '../sections/components/TheIcons.vue'

import speakPhrases from '../composables/phrases'
import speakTrashPanda from '../composables/trashpandachat'

import { useStore } from 'vuex'
import { ref } from 'vue'

export default {

    components: {
        // IonChip,
        ChatBubble,
        ChatTyper,
        TheIcons,
        TheSliders,
        NewSnippet,
        ChatResponse
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
            this.addingInit = true
            this.addInit()
            //! move this to the child component - at least do bug testing
        },

    data() {
        
        // phrase: position, status (boolean), phrase, tone
        //TODO: fill these out with some tut stuff
        return {

            chatResponseOptions: [
                { text: 'finished', value: 'finished'},
            ],

            collapsed: false,
            newChat: 'grey',
            doing: false,
            
            subFirst: false,
            subTrigger: false,
            addingInit: false,

            sliderVal: {
                'angry': false,
                'polite': false,
                'paggro': false,
                'pirate': false
            },

            activeSlider: {
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

            testVar: true,
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
            activeIndexes: ['op1', 'op2', 'of1', 'of2', 'co0', 'co2', 'pl0', 'pl1', 'pl2', 'so0'],
            allIndexes: ['op1', 'op2', 'of1', 'of2', 'co0', 'co2', 'pl0', 'pl1', 'pl2', 'so0'],
            moodLimit: 10,
            selectedTone: '',
            
            //? does this do anything??
            updatedPhrases: [],

            priorPhrases: {},
            //prior phrases - a copy of the OG gripe for simple deletes, no mutations
            phraseHistory: {},
            //phrase history - a log of everything that's been there, the previous step,
            //used to determine which slider[tone] moves back when the phrases are full
            usedPhrases: [
                       {
                           phrase: '',
                           tone: '',
                           position: 'op1'
                       }, 
                       
                       {
                           phrase: '',
                           tone: '',
                           position: 'op2'
                       },
                       
                       {
                           phrase: '',
                           tone: '',
                           position: 'of1'
                       },
                       
                       {
                           phrase: '',
                           tone: '',
                           position: 'of2'
                       },

                        {
                           phrase: '',
                           tone: '',
                           position: 'co0'
                       },

                       {
                           phrase: '',
                           tone: '',
                           position: 'co2'
                       },

                        {
                           phrase: '',
                           tone: '',
                           position: 'pl0'
                       },

                        {
                           phrase: '',
                           tone: '',
                           position: 'pl1'
                       },

                    {
                           phrase: '',
                           tone: '',
                           position: 'pl2'
                       },

                     {
                           phrase: '',
                           tone: '',
                           position: 'so0'
                       },
                      
            ],
         
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
            
            //* updated vars
            moodcount: {
                angry: 0,
                polite: 0,
                paggro: 0,
                pirate: 0,
                total: 0,
            },

            tracking: {
                count: {
                    angry: 0,
                    polite: 0,
                    paggro: 0,
                    pirate: 0,
                    total: 0,
                },
                prevCount: {
                    angry: 0,
                    polite: 0,
                    paggro: 0,
                    pirate: 0,
                    total: 0,  
                }
            },

            nextSliders: {
                angry: null,
                polite: null,
                paggro: null,
                pirate: null,
            },

            newSliders: {
                angry: null,
                polite: null,
                paggro: null,
                pirate: null,
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
                        prevCount: {
                            
                        },
                        activeMoods: ['polite', 'paggro'],
                        //* used for testing 
                        sampleCount: {

                        },
                      
            },

            seeDeleteOptions: [],

             next: {
                // track progress in the sequence
                step: '',
                // boolean on whether subs need to be made before adds
                subFirst: false,
                // initial values pulled from sliders
                init: {
                    tone: '',
                    val: 0,
                },
                // determine number of subs/adds for the queue
                // then create array queues based on these
                // the leeway is the number of possible adds before hitting the limit
                // to be used when the limit is hit
                difference: {
                    sub: 0,
                    add: 0,
                    leeway: 0,
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
                    val: null,
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
                if(newValue>=3&&this.chatted.angry===0) {
                    this.setBackchat('medium', 'angry')
                    this.chatted.angry=1
                    this.alertChat()
                }
                if(newValue>=8&&this.chatted.angry===1) {
                    this.setBackchat('high', 'angry')
                    this.chatted.angry=2
                    this.alertChat()
                }
                 if(newValue>=10&&this.chatted.angry===2) {
                    this.setBackchat('max', 'angry')
                    this.chatted.angry=3
                    this.alertChat()
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

            
                if(newValue>=3&&this.chatted.polite===0) {
                    this.setBackchat('medium', 'polite')
                    this.chatted.polite=1
                    this.alertChat()
                }
                if(newValue>=8&&this.chatted.polite===1) {
                    this.setBackchat('high', 'polite')
                    this.chatted.polite=2
                    this.alertChat()
                }
                 if(newValue>=10&&this.chatted.polite===2) {
                    this.setBackchat('max', 'polite')
                    this.chatted.polite=3
                    this.alertChat()
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

                if(newValue>=3&&this.chatted.paggro===0) {
                    this.setBackchat('medium', 'paggro')
                    this.chatted.paggro=1
                    this.alertChat()
                }
                if(newValue>=8&&this.chatted.paggro===1) {
                    this.setBackchat('high', 'paggro')
                    this.chatted.paggro=2
                    this.alertChat()
                }
                 if(newValue>=10&&this.chatted.paggro===2) {
                    this.setBackchat('max', 'paggro')
                    this.chatted.paggro=3
                    this.alertChat()
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

                if(newValue>=3&&this.chatted.pirate===0) {
                    this.setBackchat('medium', 'pirate')
                    this.chatted.pirate=1
                    this.alertChat()
                }
                if(newValue>=8&&this.chatted.pirate===1) {
                    this.setBackchat('high', 'pirate')
                    this.chatted.pirate=2
                    this.alertChat()
                }
                 if(newValue>=10&&this.chatted.pirate===2) {
                    this.setBackchat('max', 'pirate')
                    this.chatted.pirate=3
                    this.alertChat()
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
                  this.alertChat()
            }  else if(newVal>=3&&this.chatted.confused===1&&this.chatted.confusedReset===true) {
                  this.setBackchat('confused', 'two')
                  this.chatted.confused++
                  this.alertChat()
            }
            
            if(this.chatted.confused===1&&newVal<3) {
                this.chatted.confusedReset=true;
            }
           
        },

        // moodcount: {
        //     immediate: true,
        //     handler(newVal) {
        //         let { angry, polite, paggro, pirate, total, ...rest} = newVal
        //     console.log('MOODCOUNT WATCHED: ' + angry, polite, paggro, pirate, total, rest)
        //     },
            
        // },

        //related to backchat UI
        moodTotal(newVal){
            //if they're trying to add beyong the mood limit, warn that there will be a delete first
                if(newVal===this.moodLimit) {
                    // console.log('replace mode one')
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

        goToEnd(){
        this.$store.state.finalOutput = { ...this.gripeObject }
           this.$router.push('/finish')
        },

        alertChat(){
              if (this.newChat==='grey'&&this.collapsed===false) {
                this.newChat='red'
            }
        },

        toggleChat(){
            this.collapsed=!this.collapsed
            if (this.newChat==='red') {
                this.newChat='grey'
            }
        },

        toggleChatStatus(){
            if(this.newChat==='grey') {
                  this.newChat='red'
            } else if (this.newChat==='red') {
                this.newChat='grey'
            }
          
            // console.log('toggled' + this.newChat)
        },

        initLoaded() {
            return new Promise((resolve) => {

                if(this.firstTone&&this.secondTone){
                    // console.log(this.firstTone, this.secondTone)
                    resolve('starter tones added')
                } else {
                    setTimeout(() => {
                        resolve('starter tones did not load')
                    }, 5000)
                }
            })
        },

       //! change initial add so it runs properly through the same system
        async addInit(){
            
            await this.initLoaded()
            // console.log('resolved: ' + getStarters)

            if(this.firstTone===this.secondTone){
                let sendDouble = {
                    val: 2,
                    tone: this.firstTone
                }
                this.getMoods(sendDouble)
            } else {

                const sendFirst = {
                    val: 1,
                    tone: this.firstTone,   
                    }

                const sendSecond = {
                    val: 1,
                    tone: this.secondTone,   
                    }
            
                    this.getMoods(sendFirst)
                setTimeout(() => {
                    this.getMoods(sendSecond)
                }, 800)
            }
        },

        finishedPrevious() {
            return new Promise((resolve) => {
                if(this.doing===false){
                    resolve()
                }
            })
        },

        //* testing function as a starting point so you can pass in test values needed later on
        async getMoods({val, tone}){

            await this.finishedPrevious()
            this.doing = true
            this.next.step='getMoodsTest'
            // console.log('starting step: ' + this.next.step)
            this.tracking.prevCount = { ...this.moodcount }
            // console.log('getting moods, prev count is: ' + this.tracking.prevCount)

                this.next.init = {val, tone}
                this.tracking.count[tone] = val
                this.$store.state.classTone = tone

            //! update hypothetical (tracking) total here, actual total later on
            //! pass in the object for the tracking total, then you can reuse the function when you want to update the live total
            
            let total = this.updateTotal('tracking')
            this.tracking.count['total'] = total
           
            this.createQueue(val, tone)

            
        },

        async createQueue(val, tone) {
              this.next.step='createQueue'
            //   console.log('starting step: ' + this.next.step)

              try {
                 
            // * return true if subs needed first, otherwise false
                await this.getDifference(val, tone)
                // console.log('checkdiff is: ' + checkDiff)
            // * calc how many need adding/subbing
                await this.setDifference(val, tone)
                // console.log('setdiff is: ' + setDiff)
            // * create a queue of actions
                await this.pushDifference(tone)
                // console.log('push difference is: ' + pushDifference)

              } catch(e) {
                  console.log(e)
              } finally {
                  //? update final count here, but useful to set init count somewhere else to decide on scenarios
                //   console.log('all done! moving on')
                  this.resetNext()
                  this.manageQueue(val, tone)
                 
                
              }

        },

        async manageQueue(val, tone){
            this.queue.val = val
            this.queue.tone = tone
            this.next.step = 'manageQueue'
            // console.log('starting step: ' + this.next.step)

            //! start with just add queue to test, only try adding!

            try {
            
            //! atm the snippet stuff has no sync element to it, which might be fine but might need to put another loop/delay in there
            let toSub = this.queue.sub.length
            let toLeeway = this.queue.leeway.length
            let toAdd = this.queue.add.length

            // console.log('STARTING QUEUE, gonna do: ' + 'add' + toAdd + 'sub' + toSub + 'leeway' + toLeeway)
 
            this.leeway(toLeeway)
            await this.nextQueue('leeway')
            // console.log(leewayed)

            this.sub(toSub)
            await this.nextQueue('sub')
            // console.log(subbed)
      
            this.add(toAdd)
            await this.nextQueue('add')
            // console.log(added)
            } catch {
                console.log('error in some part of the queue bit')
            } finally {
                //* update total
                let newTotal = this.updateTotal('base')
                this.moodcount['total'] = newTotal
                //! reset currently disabled
                this.resetQueue()
                if(this.subFirst===true) {
                      this.subFirst = false
                  }
                this.updateTracking()
                this.next.step = 'ready'
                this.doing = false
               
            }
        },

        updateTracking() {
            let update = {
                count: { ...this.moodcount },
                prevCount: { ...this.moodcount },
            }
            this.tracking = update
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
                    this.moodcount[tone]++
    
                       //* get random index and pick index
                    this.randomize(this.activeIndexes);
                    let currentIndex = this.activeIndexes[0];

                    this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === tone && phrase.position === currentIndex && phrase.status === false);
                    this.selectedPhrases.sort(() => {return 0.5 - Math.random()});
                    let selectedObj = this.selectedPhrases[0]
                    let selected = this.selectedPhrases[0].phrase
                    // console.log(i + ':' + selected)
                    

                    //* mark the phrase as selected/index tracking
                    this.selectedPhrases[0].status = true;
                    this.changeTracker[currentIndex]++;
                    this.$store.state.changeTracker[currentIndex]++;
                    this.activeIndexes.shift()
                    this.queue.leeway.shift()
                    // console.log('active indexes are: ' + this.activeIndexes)
                    this.changeLog(currentIndex, selectedObj);
                   
                    setTimeout(() => {
                        this.$store.state.baseOutput[currentIndex] = selected
                        this.gripeObject[currentIndex] = selected
                       
                        //    console.log('leeway, phrase sent to snippet')
                    }, 200)
                    //* add to vuex tracking and the gripe object, which triggers the actual text change

                    if(this.queue.leeway.length===0) {
                        //! this could be a good place to update moodcount - after each step?
                        //! or do it at the end of everything?
                        this.nextQueue('leeway', leewayQ)
                    }
                 }
            } else {
                // console.log('no leeway added')
                setTimeout(() => {
                    this.nextQueue('leeway')
                }, 200)
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
                    this.moodcount[tone]++
                  
    
                       //* get random index and pick index
                    this.randomize(this.activeIndexes);
                    let currentIndex = this.activeIndexes[0];

                    this.selectedPhrases = this.phrases.filter(phrase => phrase.tone === tone && phrase.position === currentIndex && phrase.status === false);
                    this.selectedPhrases.sort(() => {return 0.5 - Math.random()});
                    let selectedObj = this.selectedPhrases[0]
                    let selected = this.selectedPhrases[0].phrase
                    // console.log(i + ':' + selected)
                    

                    //* mark the phrase as selected/index tracking
                    this.selectedPhrases[0].status = true;
                    this.changeTracker[currentIndex]++;
                    this.$store.state.changeTracker[currentIndex]++;
                    this.activeIndexes.shift()
                    this.queue.add.shift()

                    //* push into used phrases array
                    this.changeLog(currentIndex, selectedObj);
                   

                    //* add to vuex tracking and the gripe object, which triggers the actual text change
                    setTimeout(() => {
                           this.$store.state.baseOutput[currentIndex] = selected
                           this.gripeObject[currentIndex] = selected
                          
                        //    console.log('add, phrase sent to snippet')
                    }, 200)
                 

                    if(this.queue.add.length===0) {
                        //! this could be a good place to update moodcount - after each step?
                        //! or do it at the end of everything?
                        this.nextQueue('add', addQ)
                    }
                 }
            } else {
                // console.log('no add necessary')
                setTimeout(() => {
                     this.nextQueue('add')
                }, 200)
               
            }
          
        },

        sub(subQ){
                this.next.step="sub"
                this.queue.doing="sub"

            if(subQ>0) {

          
                 for(let i = 0; i < subQ; i++) {

                    if(this.activeIndexes.length===0) {
                            this.activeIndexes = this.allIndexes
                    }

                    let tone = this.queue.sub[i]
                    this.queue.tone = tone
                    this.moodcount[tone]--

                    // console.log('for loop, sub first is: ' + this.subFirst)
                    //* get potential delete options
                    let deleteOptions = this.usedPhrases.filter(phrase => phrase.tone === tone && phrase.phrase.length>0)

                    this.seeDeleteOptions = deleteOptions
                    if(deleteOptions.length>1){
                    deleteOptions.sort(() => {return 0.5 - Math.random()})
                    } else {
                        console.log('something went wrong with delete options')
                    }

                    //* find an index where a used phrase can be deleted
                    let {
                           position: deleteKey
                    } = deleteOptions[0]

                     if(this.subFirst===true) {
                                //* send message to change val on sliders where moods subbed, watcher in child pulls from vuex object
                                this.sliderVal[tone]=true
                                // console.log('slider val changed at: ' + tone)
                                this.queue.sub.shift()
                                
                            } else {
                    
                    this.$store.state.sub++
                    this.activeIndexes.push(deleteKey)

                    //* this tracking stuff is so it knows whether the remove first should be like an add replace, or like a normal sub
                    if(this.subFirst===false) {
                    this.$store.state.changeTracker[deleteKey]--
                    }
                    this.queue.sub.shift()
                    // console.log('deletePhrase: ' + deletePhrase)
                    // console.log('deleteTone: ' + deleteTone)

                    //!now update the prop in used phrases

                    const usedIndex = this.usedPhrases.findIndex( obj => {
                        return obj.position === deleteKey
                    })

                    let reset = {
                        phrase: '',
                        tone: '',
                        position: deleteKey
                    }

                    this.usedPhrases[usedIndex] = reset
                    

                    //* add to vuex and trigger the actual change
                        setTimeout(() => {
                                
                                this.$store.state.baseOutput[deleteKey] = this.priorPhrases[deleteKey];
                                this.gripeObject[deleteKey] =  this.priorPhrases[deleteKey];
                                // console.log('sub, phrase sent to snippet')
                                this.$store.state.changeTracker[deleteKey]=0

                        }, 200)

                    }

                    
                    if(this.queue.sub.length===0) {
                        //! this could be a good place to update moodcount - after each step?
                        //! or do it at the end of everything?
                        setTimeout(() => {
                            this.nextQueue('sub', subQ)
                        }, 250)
                       
                    }

                }
            } else {
                // console.log('no sub necessary')
                setTimeout(() => {
                     this.nextQueue('sub')
                }, 200)
            }
        },

        nextQueue(status){
            
            // console.log('just finished: ' + status)
            return new Promise((resolve, reject) => {

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
                  } else {
                      reject('nextQueue fn: something went wrong')
                  }
              })
        },

        getDifference(){
            return new Promise ((resolve) => {
                // * set step
                this.next.step="getDifference"
                // console.log('starting step: ' + this.next.step)
                
                // * find out if the number is going to be greater than the limit - do more elegantly when done with testing
                let hypotheticalTotal = this.tracking.count.total
                // console.log('hypothetical total is: ' + hypotheticalTotal)
                if(hypotheticalTotal>this.moodLimit) {
                    // * if the limit is reached, indicate that the mode will be adding first
                    // TODO: add another promise thingy here in a different step that lets them reject this option
                    // * sets the property for the next stage, for sorting, but will reset
                    this.next.subFirst = true
                    // * sets the property for the snippet phase
                    this.subFirst = true
                    let leeway = this.moodLimit - this.tracking.prevCount['total']
                    // console.log('leeway set at: ' + leeway)
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

                    // console.log('SET DIFFERENCE: tone is ' + tone)

                    this.next.step="setDifference"
                    // console.log('starting step: ' + this.next.step)

                    let oldVal = this.tracking.prevCount[tone]
                
                    // console.log('old val is: ' + oldVal)
                    let newVal = val
                    let numType = Math.sign(newVal-oldVal)
                    let diff = null

                    // console.log(`DIFFERENCE: old val is ${oldVal}. new val is ${newVal}`)
                    // console.log('num type is: ' + numType)
                    // * this returns whether it's negative or positive, negative is -1 and positive is 1
                    if (numType===-1||newVal===0) {
                        // * if subtract
                        diff = oldVal - newVal
                        this.next.difference.sub = diff

                        resolve(diff)
                    } else if (numType===1) {
                        //* if add
                  
                        diff = newVal - oldVal

                        //* if leeway, set add to the val that will be added after leeway
                        if(this.next.subFirst===true&&this.next.difference.leeway>0){
                           this.next.difference.add = diff - this.next.difference.leeway
                           this.next.difference.sub = this.next.difference.add
                        //    console.log('outcome: add, sub and leeway')
                        } else if(this.next.subFirst===true) {
                            this.next.difference.add = diff
                            this.next.difference.sub = diff
                                    //  console.log('outcome: sub then add')
                            } else {
                            this.next.difference.add = diff
                                //  console.log('outcome: just add')
                            }

                        resolve(diff)
                    } else {
                        //* throw error if there's no difference
                        reject('error in calculating difference')
                    }
                // console.log('diff is: ' + diff)
                })

        },

        pushDifference(tone) {

            return new Promise((resolve, reject) => {
                    
                    this.next.step="pushDifference"
                    // console.log(`at push difference step, vals are: sub, ${this.next.difference.sub} add, ${this.next.difference.add}  leeway, ${this.next.difference.leeway} `)
            
                       //* if we're just adding
                        if (this.next.difference.add>0&&this.next.subFirst===false){
                            let addArr = Array.from({
                                length: this.next.difference.add
                            }, () => (tone))
                            this.next.difference.addTones = addArr
                            this.queue.add = addArr
                            // console.log(this.next.step + ': just adding')

                            resolve('added')

                            //* if we're just subbing
                        } else if (this.next.difference.sub>0&&this.next.subFirst===false) {
                        
                            let subArr = Array.from({
                                length: this.next.difference.sub
                            }, () => (tone))
                            this.next.difference.subTones = subArr
                            this.queue.sub = subArr
                            // console.log(this.next.step + ': just subbing')

                            resolve('subbed')

                                //*if we have to sub first
                            } else if (this.next.difference.sub>0&&this.next.subFirst===true) {

                                // console.log(this.next.step + ': started doing the complicated one')

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
                                    const subMoods = this.activeMoods.filter(mood => mood!==tone);
                                    subMoods.forEach((item) => {
                                        if(item) {
                                        //* make an array of all possible
                                            options[item] = Array.from({
                                            length:  this.tracking.count[item]
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

                                    //* and assign the no. of subs to an object that will be a reference later to adjust the sliders that have moods removede
                                    //* (just the sliders, events are all done seperately)
                                    let subRecord = this.next.difference.subTones

                                    const subObject = {
                                    angry: 0,
                                    polite: 0,
                                    paggro: 0,
                                    pirate: 0
                                    }

                                    subRecord.forEach((item) => {
                                        subObject[item]++
                                    })

                                    this.$store.state.sliderSubs = {...subObject}


                            resolve('did the complicated thing')

                        } else {
                            reject('error in pushing to arrays')
                        }
                })
        },

        pushSubs(count) {
            //* select a random array from sub options, push one then slice one
            // console.log('count is: ' + count)

             const {   
                    difference: {
                                subOpts: { ...rest }
                                }
                    } = this.next

                    for(let i = 0; i < count; i++) {
                
                    // console.log('rest object is...' + rest)

                    let keys = Object.keys(rest)
                    let chosen = [keys[ keys.length * Math.random() << 0]]

                    let pushMe = rest[chosen][0]
                    // console.log(pushMe)

                    this.next.difference.subTones.push(pushMe)
                    rest[chosen].pop()

                    if(rest[chosen].length===0) {
                        delete rest[chosen]
                        // console.log('removed empty key')
                    }

                    // console.log('sub pushed')
                    }

                 this.next.difference.subOpts = { ...rest }

        },

        resetNext() {
            let reset = {

                step: 'ready',
                subFirst: false,
                init: {
                    tone: '',
                    val: null,
                },
                difference: {
                    sub: 0,
                    add: 0,
                    leeway: 0,
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
                   
                    doing: 'none'
            }
            this.queue = reset

            let empty = {
            angry: 0,
            polite: 0,
            paggro: 0,
            pirate: 0
            }

            this.$store.state.sliderSubs = { ...empty }

            let falseObj = {
            angry: false,
            polite: false,
            paggro: false,
            pirate: false,
            }

            this.sliderVal = { ...falseObj }
        },

        updateTotal(obj) {
            // console.log('update total function triggered on: ' + obj)
            let total
            let angry, polite, paggro, pirate
            if(obj==='tracking') {
                angry = this.tracking.count['angry']
                polite =  this.tracking.count['polite']
                paggro = this.tracking.count['paggro']
                pirate = this.tracking.count['pirate']
            } else if(obj==='base') {
                angry = this.moodcount['angry']
                polite = this.moodcount['polite']
                paggro = this.moodcount['paggro']
                pirate = this.moodcount['pirate']
            } else {
                'something went wrong in update total function'
            }

            // console.log(`angry: ${angry} polite: ${polite} paggro: ${paggro} pirate: ${pirate}`)
            total = angry + polite + paggro + pirate
            // console.log('total should be: ' + total)
            return total
        },

        randomFromRange(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },

        setBackchat(obj, inner) {
              let testVar = this.setChat(obj, inner)
            this.backchat = testVar
        },

        changeLog(key, newPhrase) {

            // console.log('changelog, key is: ' + key)
            // console.log('changelog, newPhrase is: ' + newPhrase)

            let { phrase, tone } = newPhrase
            //? room for improved functionality here?

            const idx = this.usedPhrases.findIndex( obj => {
                        return obj.position === key
                })

                let reset = {
                        phrase: phrase,
                        tone: tone,
                        position: key
                }
                this.usedPhrases[idx] = reset
        },
            // if(this.changeTracker[key]>1) {
            // console.log('phrase history updated');
            // this.phraseHistory[key] = this.newPhrase
            // }

        randomize(ar) {
                ar.sort(() => {return 0.5 - Math.random()});
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

</script>

<style scoped>
/* temp styling! make less ugly */

.close-chat {
    cursor: pointer;
}

.grey {
      font-size: 4rem;
     color: grey;
}

.red {
      font-size: 4rem;
      color: red;
}

.help {
    margin-top: 2rem;
}

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

