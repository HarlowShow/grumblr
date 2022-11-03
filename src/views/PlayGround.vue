<template>

    <base-layout page-default-back-link="/input">

        <div id="playground">
         
                <ion-content id="chat">
                    <chat-bubble
                    v-for="chat, index in addedChatStrings"
                    :key="index"
                            :gridClass="'left'">
                            <template v-slot:start>
                                <the-icons :name="chat.icon"></the-icons>
                            </template>
                            <template v-slot:end>
                                <!-- @scroll="setBackchat(chat.nextObj, chat.nextInner)" -->
                                <chat-typer
                                :chatString="chat.string"
                                ></chat-typer>
                            </template>
                        </chat-bubble>
                                <chat-response
                                :data="this.helpOptions"
                                :noIcon="true"
                                @update:value="navigateHelp"
                                ></chat-response>
                </ion-content>

                <transition name="footer">

                <div id="gridbottom"
                v-if="this.chatCount>0">

                            <div id="snippetarea">
                                <div class="snippets"
                                :class="grumbleBox">
                                            <new-snippet v-for="(value, name, index) in gripeObject"
                                            :key="index"
                                            :value="value"
                                            :name="name"
                                            :index="index"
                                            :snippet="gripeObject[name]"
                                            @transitioned="setInits"
                                            ></new-snippet>
                                </div>
                                <ion-icon :icon="send"
                                 @click="goToEnd"
                                 class="send-icon"
                                ></ion-icon>
                            </div>

                            <div class="emoji-container">
                                     <div class="button-holder">
                                    <button class="emoji-button" @click="cycleEmoji('angry', 'add')">
                                        <the-emoji-buttons :clickstep="this.btnStep['angry']"
                                        :type="'add'"
                                        :tone="'angry'">
                                        </the-emoji-buttons>
                                    </button>
                                    <button class="emoji-button" @click="cycleEmoji('angry', 'sub')"
                                    v-if="this.prevStep['angry']>-1">
                                        <the-emoji-buttons :clickstep="this.prevStep['angry']"
                                        :type="'sub'"
                                        :tone="'angry'">
                                        </the-emoji-buttons>
                                    </button>
                                      <!-- <div class="show-moodcount"><p>{{ this.moodcount['angry'] }}</p></div> -->
                                    </div>

                                    <div class="button-holder">
                                    <button class="emoji-button" @click="cycleEmoji('paggro', 'add')">
                                        <the-emoji-buttons :clickstep="this.btnStep['paggro']"
                                        :type="'add'"
                                        :tone="'paggro'">
                                        </the-emoji-buttons>
                                    </button>
                                    <button class="emoji-button" @click="cycleEmoji('paggro', 'sub')"
                                    v-if="this.prevStep['paggro']>-1">
                                        <the-emoji-buttons :clickstep="this.prevStep['paggro']"
                                        :type="'sub'"
                                        :tone="'paggro'">
                                        </the-emoji-buttons>
                                    </button>
                                      <!-- <div class="show-moodcount"><p>{{ this.moodcount['paggro'] }}</p></div> -->
                                    </div>

                                    <div class="button-holder">
                                    <button class="emoji-button" @click="cycleEmoji('polite', 'add')">
                                        <the-emoji-buttons :clickstep="this.btnStep['polite']"
                                        :type="'add'"
                                        :tone="'polite'">
                                        </the-emoji-buttons>
                                    </button>
                                    <button class="emoji-button" @click="cycleEmoji('polite', 'sub')"
                                    v-if="this.prevStep['polite']>-1">
                                        <the-emoji-buttons :clickstep="this.prevStep['polite']"
                                        :type="'sub'"
                                        :tone="'polite'">
                                        </the-emoji-buttons>
                                    </button>
                                      <!-- <div class="show-moodcount"><p>{{ this.moodcount['polite'] }}</p></div> -->
                                    </div>

                                    <div class="button-holder">
                                    <button class="emoji-button" @click="cycleEmoji('pirate', 'add')">
                                        <the-emoji-buttons :clickstep="this.btnStep['pirate']"
                                        :type="'add'"
                                        :tone="'pirate'">
                                        </the-emoji-buttons>
                                    </button>
                                    <button class="emoji-button" @click="cycleEmoji('pirate', 'sub')"
                                    v-if="this.prevStep['pirate']>-1">
                                        <the-emoji-buttons :clickstep="this.prevStep['pirate']"
                                        :type="'sub'"
                                        :tone="'pirate'">
                                        </the-emoji-buttons>
                                    </button>
                                    <!-- <div class="show-moodcount"><p>{{ this.moodcount['pirate'] }}</p></div> -->
                                    </div>

                            </div>
                            <div class="emoji-container">

                            </div>
                        
                            <!-- <div id="sliders">
                                        <the-sliders
                                            v-for="mood in allMoods"
                                            :key="mood"
                                            :tone="mood"
                                            :isActive="activeSlider[mood]"
                                            :sliderVal="sliderVal[mood]"
                                            @update:getMoods="getMoods">
                                        </the-sliders>
                            </div> -->
                    </div>
                    </transition>
                </div>
        
             
              <!-- <button class="help" @click="toggleChatStatus">click me</button> -->
    </base-layout>
</template>

<script lang="js">
// import TestSnippet from '../sections/components/TestSnippet.vue'

import NewSnippet from '../sections/components/NewSnippet.vue'
// import TheSliders from '../sections/components/TheSliders.vue'
import ChatBubble from '../sections/components/ChatBubble.vue'
import ChatTyper from '../sections/components/ChatTyper.vue'
import TheEmojiButtons from '../sections/components/TheEmojiButtons.vue'
import ChatResponse from '../sections/components/ChatResponse.vue'
import TheSideModal from '../components/base/TheSideModal.vue'

// import { IonChip } from '@ionic/vue'
import TheIcons from '../sections/components/TheIcons.vue'
import { send } from 'ionicons/icons'
import { IonIcon, IonContent, modalController } from '@ionic/vue'

import speakPhrases from '../composables/phrases'
import speakTrashPanda from '../composables/trashpandachat'
import useHelpText from '../composables/helptext'

import { useStore } from 'vuex'
import { ref } from 'vue'

export default {

    components: {
        // IonChip,
        ChatBubble,
        ChatTyper,
        TheIcons,
        // TheSliders,
        NewSnippet,
        ChatResponse,
        IonIcon,
        IonContent,
        TheEmojiButtons,

        // TestSnippet
    },

    setup() {
        //set imports for phrases and selections
        //main phrases
        const checkRender = ref(false)
        const phraseObject = speakPhrases()
        const store = useStore()
        const gripeObject = store.state.baseOutput

        //panda backchat
        const trashPandaObject = speakTrashPanda()
        const backchat = ref('')
        backchat.value = trashPandaObject.backtalkChat

        //help text
        const helpTextObject = useHelpText()
        // const helpchat = ref('')

        //set initial moods
        const initVal = ref(0)
        const firstTone = store.state.starterTones[0]
        const secondTone = store.state.starterTones[1]    

        return {
            helpTextObject,
            helpOptions: helpTextObject.activeHelpOptions,
            helpActions: helpTextObject.playgroundHelpText,
            trashPandaObject,
            backchat: backchat.value,
            setChat: trashPandaObject.setChat,
            phraseObject,
            gripeObject,
            phrases: phraseObject.phrases,
            initVal: initVal.value,
            firstTone,
            secondTone,
            checkRender,
            send
        }

    },

    mounted(){
        
            this.priorPhrases = Object.assign({}, this.$store.state.baseOutput);
            this.phraseHistory = Object.assign({}, this.$store.state.baseOutput)
            this.updatedPhrases = this.phrases;
             //! moved to after first transitions - come back to it if necessary
            // this.checkRender=true;
            // this.addingInit = true
            // this.addInit()
            setTimeout(() => {this.scrollFix()}, 200)
           
        },

    data() {
        
        // phrase: position, status (boolean), phrase, tone
        //TODO: fill these out with some tut stuff
        return {
        
        emojiButtons: [
            { tone: 'reverse', type: 'special'},
            { tone: 'upsidedown', type: 'special'},
        ],

        btnStep: {
          angry: 0,
          paggro: 0,
          polite: 0,
          pirate: 0,
          reverse: 0,
          upsidedown: 0,
        },
        prevStep: {
          angry: -1,
          paggro: -1,
          polite: -1,
          pirate: -1,
          reverse: -1,
          upsidedown: -1,
        },

            starterStrings: [
                {value: 'one', grumbleIndex: 'one'},
                {value: 'two', grumbleIndex: 'two'},
                {value: 'hurray', grumbleIndex: 'three'},
                {value: 'adieu', grumbleIndex: 'four'}
            ],

            starterStringObject: [

            ],

            stringIndex: 0,

            chatResponseOptions: [
                { text: 'finished', value: 'finished'},
            ],

            addedChatStrings: [

                {string: "Here you go. Click on the buttons under your grumble to change the text.", icon: 'reg-reg', nextObj: 'starter', nextInner: 'two'},
            ],

            chatCount: 1,

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
                // if(newValue>=8&&this.chatted.angry===1) {
                //     this.setBackchat('high', 'angry')
                //     this.chatted.angry=2
                //     this.alertChat()
                // }
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
                // if(newValue>=8&&this.chatted.polite===1) {
                //     this.setBackchat('high', 'polite')
                //     this.chatted.polite=2
                //     this.alertChat()
                // }
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
                // if(newValue>=8&&this.chatted.paggro===1) {
                //     this.setBackchat('high', 'paggro')
                //     this.chatted.paggro=2
                //     this.alertChat()
                // }
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
                // if(newValue>=8&&this.chatted.pirate===1) {
                //     this.setBackchat('high', 'pirate')
                //     this.chatted.pirate=2
                //     this.alertChat()
                // }
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
                //   this.setBackchat('confused', 'one')
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

        navigateHelp(chosenval){
            
            //find action and do the corresponding method
            const actions = this.helpActions.filter((opt) => opt.responseTo===chosenval)
                if(actions.length>0){
                let action = actions[0]

                if(action.stringMethod){
                    action.stringMethod()
                    this.addedChatStrings.push(
                        {
                            string: action.string,
                            icon: 'reg-reg',
                            nextObj: 'starter',
                            nextInner: 'two'
                        }
                    )
                } else if (action.actionMethod){
                    action.actionMethod()
                } else if (action.routeMethod){
                    this.$router.push(action.routeMethod)
                }
            }
        },

        scrollFix(){
            window.scrollTo(0,1);
        },

        cycleEmoji(tone, type){
        if(type==='special'||type==='special-sub'){
            this.handleSpecial(tone, type);
        }
        if(type==='add'){
          if(this.btnStep[tone]<10){
        //* tracking for button appearance and enable/disable
          this.btnStep[tone]++
          this.prevStep[tone]++
        //* add to moodcount
          let newVal = this.moodcount[tone] + 1
          let newTone = tone
          this.getMoods({
              val: newVal,
              tone: newTone
          })
          } 
        } else if (type==='sub'){
          if(this.btnStep[tone]>0){
          this.btnStep[tone]--
          this.prevStep[tone]--
          }

          let newVal = this.moodcount[tone] - 1
          let newTone = tone
          this.getMoods({
              val: newVal,
              tone: newTone
          })
          
        }
      },

      handleSpecial(tone, type){
          let mode = ''
          if(type==='special-sub'){
              mode = 'sub'
          } else {
              mode = 'add'
          }
          switch(tone){
              case 'reverse':
                  if(mode==='sub'){
                    this.btnStep[tone]--
                    this.prevStep[tone]--
                  } else if (mode==='add'){
                    this.btnStep[tone]++
                    this.prevStep[tone]++
                  }
                break;
                case 'upsidedown':
                    if(mode==='sub'){
                    this.btnStep[tone]--
                    this.prevStep[tone]--
                  } else {
                    this.btnStep[tone]++
                    this.prevStep[tone]++
                  }
                break;
          }
      },

        pushSnippet(idx){
            //* FOR STARTER CHATS ONLY
            if(idx<this.starterStrings.length){
                this.starterStringObject.push(this.starterStrings[idx])
            } else if (idx===this.starterStrings.length){
            //    console.log('placeholder for once strings pushed')    
            }
        },

        setInits(){
                    this.checkRender=true;
                    this.addingInit = true
                    this.addInit()
        },

        loadNext(){
            //* UI - wait for a sec then load next chat element
            setTimeout(() => {
                this.chatCount++
            }, 500)
        },

        goToEnd(){
        const classProps = this.getClassProperties()
        this.$store.state.boxProps = { ...classProps };
        this.$store.state.finalOutput = { ...this.gripeObject }
           this.$router.push('/finish')
        },

        getClassProperties(){
            const props = {
                reverse: false,
                upsidedown: false,
            }
            if(this.btnStep['reverse']>0){
                props.reverse = true
            }
            if(this.btnStep['upsidedown']>0){
                props.upsidedown = true
            }
            return props
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
                this.btnStep[this.firstTone]+=2
                this.prevStep[this.firstTone]+=2
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
                    this.btnStep[this.firstTone]++
                    this.prevStep[this.firstTone]++
                setTimeout(() => {
                    this.getMoods(sendSecond)
                    this.btnStep[this.secondTone]++
                    this.prevStep[this.secondTone]++
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
                //   console.log(e)
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
                // console.log('error in some part of the queue bit')
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
                    }

                    //* find an index where a used phrase can be deleted
                    let {
                           position: deleteKey
                    } = deleteOptions[0]

                     if(this.subFirst===true) {
                                //* send message to change val on sliders where moods subbed, watcher in child pulls from vuex object
                                this.btnStep[tone]--
                                this.prevStep[tone]--
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
          
            if(obj, inner){
            let chosenChat = this.setChat(obj, inner)
            this.backchat = chosenChat

            //* once, trigger snippets rendering after default two is loaded
                if(obj==='starter'&&inner==='two'){
                    setTimeout(() => {
                         this.pushSnippet(0)
                    }, 1000)
                   
                }

                 setTimeout(() => {
                        this.addedChatStrings.push(
                        {
                            string: this.backchat,
                            icon: 'reg-reg'
                        }
                    )
                   
                }, 500)
            } else {
                this.chatCount++
            }
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

        async openModal() {
        const modal = await modalController.create({
          component: TheSideModal,
          cssClass: 'my-custom-class',
        //   componentProps: {
        //     title: 'New Title',
        //   },
        });
        return modal.present();
      },

    },

     computed: {

        grumbleBox(){
            return {
                'reverse': this.btnStep['reverse']>0,
                'upsidedown': this.btnStep['upsidedown']>0
            }
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

</script>

<style scoped>
/* temp styling! make less ugly */

.reverse {
-moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}

.upsidedown {
-moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}

.show-moodcount {
    text-align: center;
}

.emoji-container {
    display: flex;
    justify-content: start;
}

.button-holder {
    display: flex;
    flex-direction: column;
    min-height: 7rem;
    /* justify-items: flex-start; */
}

.emoji-button {
    background-color: transparent;
}

.snippety {
    animation: snippetenter 2s forwards;
}

@keyframes snippetenter {
    to {
        color: blue;
    }
}

.footer-enter-from {
    transform: translateY(400px);
}

.footer-enter-active {
    transition: 1.5s ease-out;
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

    #snippetarea {
        padding: 1rem;
        margin-bottom: 1rem;
        display: grid;
        grid-template-columns: auto min-content;
        grid-template-rows: auto;
        grid-column-gap: 0.3rem;
    }

    .send-icon {
        align-self: end;
    }

    .snippets {
        background-color: #ffffff;
        border-radius: 10px;
        border: 3px solid rgb(189, 189, 189);
        /* box-shadow: 0px 4px 0px 0px #000000, 5px 5px 15px 5px rgba(0,0,0,0); */
        padding: 1rem;
        min-width: 60%;
        
    }

    ion-icon {
        font-size: 2.2rem;
    }


    #sliders {
       margin-top: 1rem;
       padding-top: 1rem;
    }

    #playground {
        display: flex;
        height: 100%;
        width: 100%;
        /* position: fixed; */
        flex-direction: column;
        justify-content: space-between;
    }

    #gridtop{
        background-color: rgb(224, 224, 255);
       
    }

    #gridbottom{
        position: sticky;
        bottom: 0%;
        min-height: 40vh;
        padding: 2rem;
        width: 100%;
        max-width: 752px;
        border-top: 3px solid black;
        background-color: #e9e9e9;
    }

    @media(max-width: 576px) {
        p {
            font-size: 0.8rem;
        }

        #gridbottom{
            min-height: 60vh;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            padding-top: 0.5rem;
            padding-bottom: 0;
        }
        #snippetarea {
            padding: 0;
        }
    }

    /* @media(min-width: 576px) {
        p {
            font-size: 1.5rem;
        }
    } */

    #inner-grid {
        display: grid;
        grid-template-rows: auto min-content;
    }

    ion-content#chat {
        /* max-height: 40vh; */
        --padding-start: 1rem;
        --padding-end: 1rem;
        overflow: auto;
    }
   

</style>

