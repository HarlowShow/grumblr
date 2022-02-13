<template>
    <base-layout page-title="Gripe Deets">


        <div class="chat scrollable"
        ref="msgContainer">
            <!-- enter pronoun -->
            <button @click="getElPosition">scroll to bottom</button>
            <chat-bubble
            :gridClass="'left'">
                 <template v-slot:start>
                    <the-icons :name="'raccoon-shifty'"></the-icons>
                </template>
                 <template v-slot:end>
                   <chat-typer
                   :chatString="this.pandaChats[0].string"
                   @scroll="scrollToBottom(this.content)"
                   ></chat-typer>
                </template>
                <template  v-slot:responses
              
                >
                <div ref="el">
                    <set-pronouns
                    v-if="this.formPosition===0"
                    @update:pronoun="getPronoun"
                    >
                    </set-pronouns>
                </div>
                </template>
            </chat-bubble>

            <!-- pronoun response -->
            <chat-bubble
             :gridClass="'right'"
             :responseClass="true"
             v-if="this.formPosition>0">
                <template v-slot:end>
                    <p> {{ demoPronoun }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

            <!-- enter personmate -->
            <chat-bubble
            :gridClass="'left'"
            v-if="this.formPosition>0"
            >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-shifty'"></the-icons>
                    </template>
                    <template v-slot:end>
                       <chat-typer
                         @scroll="scrollToBottom(this.content)"
                        :chatString="this.pandaChats[0].stringTwo"
                        ></chat-typer>
                    </template>
                      <template  v-slot:responses>
                    <set-personmate
                        v-if="this.formPosition===1"
                       @update:personmate="getPersonmate"
                    >
                    </set-personmate>
                    </template>
            </chat-bubble>

            <!-- personmate response -->
            <chat-bubble 
             :gridClass="'right'"
             v-if="this.formPosition>1">
                <template v-slot:end>
                    <p>{{  this.chosen.chosenPersonmate }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

            <!-- enter gripe -->
            <chat-bubble :gridClass="'left'"
             v-if="this.formPosition>1"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                          <chat-typer
                            @scroll="scrollToBottom(this.content)"
                        :chatString="this.pandaChats[2].string"
                        ></chat-typer>
                    </template>
                      <template  v-slot:responses>
                          <set-gripe
                            v-if="this.formPosition===2"
                            @update:gripe="getGripe"
                          ></set-gripe>
                    </template>
            </chat-bubble>

            <!-- gripe response -->
            <chat-bubble 
             :gridClass="'right'"
             v-if="this.formPosition>2">
                <template v-slot:end>
                    <p>{{ this.chosen.demoGripe }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

            <!-- emotional teaser step 1 -->
            <chat-bubble 
            :gridClass="'left'"
             v-if="this.formPosition>2"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                        <chat-typer
                         @scroll="scrollToBottom(this.content)"
                        :chatString="this.pandaChats[3].string"
                        ></chat-typer>
                        </div>
                    </template>
                       <template  v-slot:responses>
                    <emotional-teaser
                        :step="1"
                        @update:starters="getStarterTones"
                       
                        v-if="this.formPosition===3">  
                    </emotional-teaser>
                </template>
            </chat-bubble>

            <!-- teaser 1 response -->
            <chat-bubble
                :gridClass="'right'"
                v-if="this.formPosition>3">
                <template v-slot:end>
                    <p>{{ starterOneResponse }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

            <!-- emotional teaser step 2 -->
            <chat-bubble
             :gridClass="'left'"
             v-if="this.formPosition>3"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                        <chat-typer
                         @scroll="scrollToBottom(this.content)"
                        :chatString="this.pandaChats[4].string"
                        ></chat-typer>
                        </div>
                    </template>
                       <template  v-slot:responses>
                    <emotional-teaser
                        :step="2"
                        @update:starters="getStarterTones"
                        v-if="this.formPosition===4">  
                    </emotional-teaser>
                </template>
            </chat-bubble>

            <!-- teaser 2 response -->
            <chat-bubble
                :gridClass="'right'"
                v-if="this.formPosition>4">
                <template v-slot:end>
                    <p>{{ starterTwoResponse }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

            <!-- exit teaser -->
            <chat-bubble
                :gridClass="'left'"
             v-if="this.formPosition>4"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                        <chat-typer
                        :chatString="this.pandaChats[5].string"
                         @scroll="scrollToBottom(this.content)"
                         :scrollType="setScroll"
                        ></chat-typer>
                        </div>
                    </template>
                       <template  v-slot:responses>
                    <emotional-teaser
                        :step="3"
                        v-if="this.formPosition===5"
                        @update:starters="getStarterTones"
                        > 
                    </emotional-teaser>
                </template>
            </chat-bubble>

            <!-- optional exit teaser response -->
               <chat-bubble 
                :gridClass="'right'"
                v-if="this.formPosition>5">
                <template v-slot:end>
                    <p>No.</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

            <!-- optional exit raccoon chat -->
                 <chat-bubble :gridClass="'left'"
             v-if="this.formPosition>5"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                        <chat-typer
                        :chatString="this.pandaChats[6].string"
                         @scroll="scrollToBottom(this.content)"
                        ></chat-typer>
                        </div>
                    </template>
            </chat-bubble>

            <div class="buffer">

            </div>

        </div>

    </base-layout>

 
</template>

<script>

    import SetPronouns from '../sections/components/form-components/SetPronouns.vue'
    import SetPersonmate from '../sections/components/form-components/SetPersonmate.vue'
    import SetGripe from '../sections/components/form-components/SetGripe.vue'
    // import ReviewSelection from '../sections/components/form-components/ReviewSelection.vue'
    // import ConfirmSelection from '../sections/components/form-components/ConfirmSelection.vue'
    // import InputSummary from './components/InputSummary.vue';
    import EmotionalTeaser from '../sections/components/form-components/EmotionalTeaser.vue';
    import TheIcons from '../sections/components/TheIcons.vue';
    import ChatBubble from '../sections/components/ChatBubble.vue'
    import ChatTyper from '../sections/components/ChatTyper.vue'


    import speakTrashPanda from '../composables/trashpandachat'
    import usePronouns from '../composables/pronouns'

    import { ref } from 'vue';

    export default {

        components: {
            ChatTyper,
            EmotionalTeaser,
            TheIcons,
            ChatBubble,
            SetPronouns,
            SetPersonmate,
            SetGripe,
            // ReviewSelection,
            // ConfirmSelection
        },

        setup() {
            
            const pandaChat = speakTrashPanda()
            const pandaChats = pandaChat.formChats.value
         
            const pronouns = usePronouns()

            const msgContainer = ref(HTMLDivElement)


            return {
                msgContainer,
                pandaChat,
                pandaChats,

                pronouns,
                setPronouns: pronouns.setPronouns,
            }
        },

        mounted() {
           console.log(this.msgContainer)
           this.content = this.msgContainer.parentElement
           console.log(this.content)
        },

        data() {
            return {

                setScroll: '',
                content: null,
                currentEl: null,
                
                arr: [],
                runOne: false,
                isInline: false,
                pronounSet: false,
                personmateSet: false,
                gripeSet: false,
                samplePronoun: '',
                samplePersonmate: '',
           
                formPosition: 0,
                gripeChange: false,
            

                    offenses: [
                {
                    id: 0,
                    deed: '',
                    frequency: '',
                    active: 'use my living space ',
                    badThing: 'your inconsiderate behaviour ',
                    default: false,
                },
                {
                    id: 1,
                    deed: 'you left your washing up in the sink. ',
                    frequency: '',
                    active: 'use the kitchen ',
                    badThing: 'your dirty plates ',
                    default: true,
                },
                {
                    id: 2,
                    deed: 'you were very loud last night. ',
                    frequency: '',
                    active: "get a good night's sleep ",
                    badThing: 'your heavy gait ',
                    default: true,
                },
                {
                    id: 3,
                    deed: "you didn't take the rubbish out. ",
                    frequency: '',
                    active: "use the bins ",
                    badThing: 'an overflowing bin ',
                    default: true,
                },
                {
                    id: 4,
                    deed: "you left your laundry in the machine. ",
                    frequency: '',
                    active: "do my laundry ",
                    badThing: 'your wet clothes ',
                    default: true,
                },
                 {
                    id: 5,
                    deed: "something else. ",
                    frequency: '',
                    active: "",
                    badThing: '',
                    default: true,
                    custom: ''
                },
            ],
                    
                 tempOpens: [
                    "Hey mate, ",
                    "Hiya, ",
                    `Hello there, `
                     ],

                consequences: [
                    { stringOne: 'You know, ',
                      middle: '',
                      stringTwo: 'is inconvenient. '},
                    { stringOne: 'Hate to bring this up, but ',
                      middle: '',
                      stringTwo: 'is inconvenient. '},
                    { stringOne: 'I must say, ',
                      middle: '',
                      stringTwo: 'is inconvenient. '},
                    { stringOne: 'The thing is, ',
                      middle: '',
                      stringTwo: 'is inconvenient. '
                      },
                ],

                pleas: [
                    { 
                        stringOne: 'So ',
                        stringTwo: 'please ',
                        stringThree: 'be more mindful next time. ',
                    },
                    { 
                        stringOne: 'So ',
                        stringTwo: 'please ',
                        stringThree: 'think about this in the future. ',
                    },
                    { 
                        stringOne: 'So ',
                        stringTwo: 'please ',
                        stringThree: 'be more considerate in the future. ',
                    },
                ],

// types - starter for defaults, global for recurring stuff, addon for stuff that updates later.
// areas - open, offense, consequence, plea, global
// areaIndex - 0, 1, 2

                    chosen: [

                        {chosenPronoun: 'none yet', area: 'global', areaIndex: 'global', type: 'global'},
                        {chosenPersonmate: 'none yet', area: 'global', areaIndex: 'global', type: 'global'},

                        {chosenTempOpen: 'none yet', area: 'open', areaIndex: '1', type: 'starter'},
                        {chosenText: '', area: 'open', areaIndex: '2', type: 'addon'},
                        {chosenGripe:'none yet', area: 'offense', chosenOffense: '', offenseActive: '', offenseBadThing: '', areaIndex: '0', type: 'starter'},
                        {chosenText: '', area: 'offense', areaIndex: '1', type: 'addon'},
                        {chosenText: '', area: 'offense', areaIndex: '2', type: 'addon'},
                    ],

                    starterTones: [],

                    output: {
                        op0: '',
                        op1: '',
                        op2: '',
                        of0: '',
                        of1: '',
                        of2: '',
                        co0: '',
                        co1: '',
                        co2: '',
                        pl0: '',
                        pl1: '',
                        pl2: ''
                    },


                    gripeIsCustom: false,
                    personmateIsCustom: false,

                chosenPronouns: {},

                tempChosen: {}
            };
        },

        computed: {

            defaultOffenses: function() {
                return this.offenses.filter(function(offense) {
                    return offense.default
                })
            },

            pronounResponse() {
                let response = ''
                if(this.chosen.chosenPronoun==="me") {
                    response = "just me"
                }
                if (this.chosen.chosenPronoun==="we") {
                    response = "several of us"
                }
                return response
            },

            personmateResponse() {
                let response = 'confirmation text will go here'
                return response
            },

            starterOneResponse() {
                let arg = this.starterTones[0]
                let response = ''
                switch(arg) {
                    case 'angry':
                        response = '😡'
                        break;
                    case 'polite':
                        response = '😅'
                        break;
                    case 'paggro':
                        response = '🙄'
                        break;
                    case 'pirate':
                        response = '🦜'
                }
                return response
            },

             starterTwoResponse() {
                let arg = this.starterTones[1]
                let response = ''
                switch(arg) {
                    case 'angry':
                        response = "they need to know that this is NOT ON."
                        break;
                    case 'polite':
                        response = "I'm going to make sure this doesn't ruin our relationship."
                        break;
                    case 'paggro':
                        response = "I will be leaving them a strongly worded post-it note."
                        break;
                    case 'pirate':
                        response = "I'll need to consult my parrot before taking any further action."
                }
                return response
            }

         
        },

        methods: {
//tbc here on the scroll thing
            getElPosition(){
                let currentEl = this.$refs.el
                let rect = currentEl.getBoundingClientRect()
                console.log(currentEl)
                let right  = rect.right + window.scrollY
                let height = window.innerHeight
                let pos = right/height*100
                pos = pos.toFixed(2)

                // console.log('left is: ' + left)
                // console.log('right is: ' + right)
                // console.log('content inner height: ' + height)
                // console.log('position is: ' + pos)

                if (pos>75) {
                    this.setScroll = 'instant'
                }
            },

            getPronoun(pronoun) {
                this.chosen.chosenPronoun = pronoun;
                this.formPosition++;

                if(this.chosen.chosenPronoun==="me") {
                    this.samplePronoun = "You"
                    this.demoPronoun = 'Just me'
                }
                if (this.chosen.chosenPronoun==="we") {
                    this.samplePronoun = "Several of you"
                    this.demoPronoun = 'Several of us'
                }
               
            },
            getPersonmate(personmate) {
                this.chosen.chosenPersonmate = personmate;
                this.samplePersonmate = personmate + '.'
                this.formPosition++;
        
            },
            getGripe(gripe) {
                this.chosen.chosenGripe = gripe;
                this.gripeChange=!this.gripeChange;
                this.formPosition++;
                
            },

            getStarterTones(tone) {
                this.starterTones.push(tone)
                this.$store.state.starterTones.push(tone)
                // console.log(this.$store.state.starterTones)
                // console.log(tone)
                this.formPosition++;
            },

            setTempOpen(array) {
                this.randomize(array);
                this.chosen.chosenTempOpen = array[0];
                this.output.op1 = this.chosen.chosenTempOpen;
                // console.log(array[0]);
            },

            setGripe(chosenGripe) {
                if(chosenGripe === 'dishes') {
                    this.chosen.chosenOffense = " you didn't do your washing up. ";
                    this.chosen.offenseActive = "use the kitchen ";
                    this.chosen.offenseBadThing = "your dirty plates ";
                    this.chosen.demoGripe = " didn't do their washing up. "
                   
                } else if(chosenGripe === 'noise'){
                    this.chosen.chosenOffense = " you were very loud last night. ";
                    this.chosen.offenseActive = "get a good night's sleep ";
                    this.chosen.offenseBadThing = "your noisiness ";
                    this.chosen.demoGripe = " were unreasonably loud. "

                } else if(chosenGripe === 'rubbish'){
                    this.chosen.chosenOffense = " you didn't take the rubbish out. ";
                    this.chosen.offenseActive = "use the bins ";
                    this.chosen.offenseBadThing = "an overflowing bin ";
                    this.chosen.demoGripe = " didn't take the rubbish out. "
                } else {
                    this.chosen.chosenOffense = 'you ' + chosenGripe + '. ';
                    this.chosen.offenseActive = "your inconsiderate behavour ";
                    this.chosen.offenseBadThing = "this ";
                    this.gripeIsCustom = true;
                    this.chosen.demoGripe = chosenGripe + '. ';
                }
                 this.output.of0 = this.chosen.chosenOffense;
              
            },

            setConsequence(consequence) {
                this.randomize(consequence);
                const chosenConsequence = consequence[0];
                chosenConsequence.middle = `dealing with ${this.chosen.offenseBadThing}`;
                this.output.co0 = chosenConsequence.stringOne;
                this.output.co1 = chosenConsequence.middle;
                this.output.co2 = chosenConsequence.stringTwo;
            },

            setPlea(plea) {
                this.randomize(plea);
                const chosenPlea = plea[0];
                this.output.pl0 = chosenPlea.stringOne;
                this.output.pl1 = chosenPlea.stringTwo;
                this.output.pl2 = chosenPlea.stringThree;
            }, 

            randomize(ar) {
                ar.sort(() => {return 0.5 - Math.random()});
            },

            generateGripe() {
                this.tempChosen = this.chosen;
                // console.log(this.tempChosen)
                this.setPronouns(this.chosen.chosenPronoun);
                this.setTempOpen(this.tempOpens);
                this.setGripe(this.chosen.chosenGripe);
                this.setConsequence(this.consequences);
                this.setPlea(this.pleas);
                this.$store.state.baseOutput = this.output;
                // this.formPosition++
            },

            prevForm() {
                this.formPosition--;
                // console.log('went back')
            },

            scrollToBottom(el) {
               el.scrollToBottom(150)
             
            },
        },

        watch: {

            gripeChange() {
                this.generateGripe();
            },

            // formPosition() {
               
            //         this.scrollToBottom(this.content);
                
            // }
        },
    }
</script>

<style>

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.move-complete-item {
    transition: transform 1s ease;
    display: inline-block;
    padding-right: 0.25rem;
}

.move-complete-enter {
    opacity: 0;
    transform: translateY(30px);
}

.move-complete-leave-to {
    opacity: 0;
}

.move-complete-leave-active {
    position: absolute;
}

 .animate {
  animation-duration: 1s;
  animation-name: animate-fade;
  animation-delay: 0.5s;
  animation-fill-mode: backwards;
  /* display: inline; */
  }
    
@keyframes animate-fade {
    0% { opacity: 0; }
  100% { opacity: 1; }
}


.animate.drop { 
  animation-name: animate-drop; 
  animation-timing-function: cubic-bezier(.77, .14, .91, 1.25);
}

@keyframes animate-drop {
0% {
  opacity: 0;
  transform: translate(0,-300px) scale(0.9, 1.1);
}
95% {
  opacity: 1;
  transform: translate(0, 0) scale(0.9, 1.1);
}
96% {
  opacity: 1;
  transform: translate(10px, 0) scale(1.2, 0.9);
}
97% {
  opacity: 1;
  transform: translate(-10px, 0) scale(1.2, 0.9);
}
98% {
  opacity: 1;
  transform: translate(5px, 0) scale(1.1, 0.9);
}
99% {
  opacity: 1;
  transform: translate(-5px, 0) scale(1.1, 0.9);
}
100% {
  opacity: 1;
  transform: translate(0, 0) scale(1, 1);
  }
}


.delay-1 {
  animation-delay: 0.6s;
}
    
.delay-2 {
  animation-delay: 0.7s;
}
    
.delay-3 {
  animation-delay: 0.8s;
}

.text-div {
    display: inline-flex;
}

#footer-bg {
    background-color: aqua;
}

    .btn-system {
        --background: #646081;
        --border-radius: 0.25rem;
        --text-transform: uppercase;
        letter-spacing: 0.15rem;
    }

 #mobile {
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 100vw;
    
}

.flex {
    display: flex;
}

  @media(min-width: 576px) {
        #mobile {
            display: none;
        }
         .flex {
            gap: 1rem;
        }
        .button-area {
            justify-content: center;
        }
        ion-button {
            min-width: 10rem;
            max-width: 15rem;
        }
  }

    @media(max-width: 576px) {
        #desktop {
            display: none;
        }
        .button-area {
            align-items: stretch;
        }
       
    }

.center {
    margin: 0 auto;
}

.container {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.buffer {
    height: 1rem;
}
</style>
