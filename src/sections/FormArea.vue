<template>
    <base-layout page-title="Gripe Deets">

        <div class="chat">

             <chat-bubble
             :gridClass="'left'">
                 <template v-slot:start>
                    <the-icons :name="'raccoon-shifty'"></the-icons>
                </template>
                 <template v-slot:end>
                    <p>Pssst... hey. This is gonna feel like a real conversation when I can be bothered to write it. Now, how many of you schmuckos have a complaint today?</p>
                </template>
                <template  v-slot:responses>
                     <set-pronouns
                     v-if="this.formPosition===0"
                    @update:pronoun="getPronoun"
                    >
                    </set-pronouns>
                </template>
             </chat-bubble>

            <chat-bubble 
             :gridClass="'right'"
             :responseClass="true"
             v-if="this.formPosition>0">
                <template v-slot:start>
                    <p> {{ pronounResponse }}</p>
                </template>
                 <template v-slot:end>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

            <chat-bubble :gridClass="'left'"
            v-if="this.formPosition>0"
            >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-shifty'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <p>I see. Who did this then?</p>
                    </template>
                      <template  v-slot:responses>
                    <set-personmate
                        v-if="this.formPosition===1"
                       @update:personmate="getPersonmate"
                    >
                    </set-personmate>
                    </template>
            </chat-bubble>

             <chat-bubble 
             :gridClass="'right'"
             v-if="this.formPosition>1">
                <template v-slot:start>
                    <p>{{ personmateResponse }}</p>
                </template>
                 <template v-slot:end>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>


            <chat-bubble :gridClass="'left'"
             v-if="this.formPosition>1"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <p>Aw naw mate. What did this bugger do then?</p>
                    </template>
                      <template  v-slot:responses>
                          <set-gripe
                            v-if="this.formPosition===2"
                            @update:gripe="getGripe"
                          ></set-gripe>
                    </template>
                </chat-bubble>

             <chat-bubble 
             :gridClass="'right'"
             v-if="this.formPosition>1">
                <template v-slot:start>
                    <p>{{ personmateResponse }}</p>
                </template>
                 <template v-slot:end>
                      <the-icons :name="'user'"></the-icons>
                </template>
            </chat-bubble>

              <chat-bubble :gridClass="'left'"
             v-if="this.formPosition>2"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                       <p>Oh deary me.</p>
                    <review-selection
                     :tempSelection="tempChosen"
                     >
                    </review-selection>
                    </template>
                       <template  v-slot:responses>
                    <confirm-selection
                      v-if="this.formPosition===3"
                    ></confirm-selection>
                </template>
                </chat-bubble>
             
        </div>

        <!-- <pronoun-input
        @update:pronoun="getPronoun"
        v-if="this.formPosition === 0">
        </pronoun-input> -->

        <!-- <personmate-input
     
        @update:personmate="getPersonmate"
        @backClick="prevForm"
        v-if="this.formPosition === 1"
        ></personmate-input> -->

        <!-- <gripe-input 
        @update:gripe="getGripe"
        @backClick="prevForm"
        v-if="this.formPosition === 2">
        </gripe-input> -->

        <!-- <input-summary
        @backClick="prevForm"
        v-if="this.formPosition === 3"
        :tempSelection="tempChosen"
        >
        </input-summary> -->

        <emotional-teaser
        @backClick="prevForm"
        v-if="this.formPosition === 4"
        >  
        </emotional-teaser>

    <!-- <template v-slot:footer>
        <div id="footer-bg">
            <p>example :)</p>
        </div>
    </template> -->

<!-- <mobile-footer :content="'five'"></mobile-footer> -->

      <!-- <ion-footer class="ion-no-border">
    <ion-toolbar>

        <ion-button>footer button</ion-button>
      
      </ion-toolbar>
  </ion-footer> -->

    </base-layout>

 
</template>

<script>

    // import PersonmateInput from './components/PersonmateInput.vue';
    // import GripeInput from './components/GripeInput.vue';
    // import PronounInput from './components/PronounInput.vue';
    import SetPronouns from './components/SetPronouns.vue'
    import SetPersonmate from './components/SetPersonmate.vue'
    import SetGripe from './components/SetGripe.vue'
    import ReviewSelection from './components/ReviewSelection.vue'
    import ConfirmSelection from './components/ConfirmSelection.vue'
    // import InputSummary from './components/InputSummary.vue';
    import EmotionalTeaser from './components/EmotionalTeaser.vue';
    import TheIcons from './components/TheIcons.vue';
    import ChatBubble from './components/ChatBubble.vue'

    // import { IonMenuToggle } from '@ionic/vue'
    // import MobileFooter from '../components/base/MobileFooter.vue'
    // import FormSummary from './components/FormSummary.vue'   

    export default {

        components: {
            // PersonmateInput,
            // GripeInput,
            // PronounInput,
            // InputSummary,
            EmotionalTeaser,
            TheIcons,
            ChatBubble,
            SetPronouns,
            SetPersonmate,
            SetGripe,
            ReviewSelection,
            ConfirmSelection
            // IonMenuToggle
            // IonFooter,
            // IonToolbar
            // MobileFooter
            // FormSummary
        },

        data() {
            return {

                questions: ['So, ', 'who has a complaint?'],
                nextQuestions: ['about your'],
                thirdQuestions: ['because they'],
                test: false,
                
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

                    personmates: [ 
                { 
                    id: 0,
                    text: "a flatmate",
                    value: "flatmate"
                },
                    
                { 
                    id: 1,
                    text: "a housemate",
                    value: "housemate"
                },

                { 
                    id: 3,
                    text: "a neighbour",
                    value: "neighbour"
                },

                                { 
                    id: 4,
                    text: "a stinky landlord",
                    value: "stinky landlord"
                },

                { 
                    id: 5,
                    text: "someone else",
                    value: "other"
                },
            ],
            

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

                // pronouns: [
                //     {
                //     id: 0,
                //     text:"just me",
                //     value: "me"
                //     },
                //     {
                //     id: 1,
                //     text:"myself and others",
                //     value: "we"
                //     },
                // ],
                    
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
            }

        
        },

        methods: {

            animateOne() {

                this.pronounSet = ! this.pronounSet
                this.isInline = !this.isInline
                this.questions.pop()
                
                    // setTimeout(()=> {
                    this.questions.push("have a complaint.")
                    this.questions[0]='   '
                    // }, 30);

                    setTimeout(()=> {
                    this.questions.unshift(this.samplePronoun)
                    }, 50);

                    this.questions.shift();   
                

               
                this.runOne = true;
            },

            animateTwo() {
                this.questions.pop()
                this.questions.push("have a complaint")
            
           
                this.nextQuestions.push(this.samplePersonmate)
                this.arr=this.questions.concat(this.nextQuestions)
                console.log(this.arr)

                this.runTwo = true;

            },

            animateThree() {

                const newString = this.samplePersonmate.slice(0, -1)
                this.nextQuestions.pop()
                this.nextQuestions.push(newString)
                this.thirdQuestions.push(this.chosen.demoGripe)
            },

            getPronoun(pronoun) {
                this.chosen.chosenPronoun = pronoun;
                this.formPosition++;
                this.pronounSet = !this.pronounSet

                if(this.chosen.chosenPronoun==="me") {
                    this.samplePronoun = "You"
                }
                if (this.chosen.chosenPronoun==="we") {
                    this.samplePronoun = "Several of you"
                }
                this.animateOne()
            },
            getPersonmate(personmate) {
                this.chosen.chosenPersonmate = personmate;
                this.samplePersonmate = personmate + '.'
                this.formPosition++;
                this.animateTwo()
            },
            getGripe(gripe) {
                this.chosen.chosenGripe = gripe;
                this.gripeChange=!this.gripeChange;
                this.formPosition++;
                
            },
            setPronouns() {
                if(this.chosen.chosenPronoun === "me") {

                this.$store.state.chosenPronouns = {
                subjectP: "I",
                subjectPCap: "I",
                objectP: "me",
                objectPCap: "Me",
                posessiveDeterminerP: "my",
                posessiveDeterminerPCap: "My",
                possessiveP: "mine",
                possessivePCap: "Mine",
                reflexiveP: "myself", 
                reflexivePCap: "Myself", 
                toBePresent: "am",
                toBePast: "was",
                toBeContracted: "I'm",
                toBeContractedCap: "I'm",
                toBePastContracted: "I've",
                toBePastContractedCap: "I've",
                pirateTitle: "this old cap'n",
                pirateTitleCap: "This old cap'n"

               
                };
               
                    } else if (this.chosen.chosenPronoun === "we") {
                
                this.$store.state.chosenPronouns = {
                subjectP: "we",
                subjectPCap: "We",
                objectP: "us",
                objectPCap: "Us",
                posessiveDeterminerP: "our",
                posessiveDeterminerPCap: "Our",
                possessiveP: "ours",
                possessivePCap: "Ours",
                reflexiveP: "ourselves",
                reflexivePCap: "Ourselves",
                toBePresent: "are",
                toBePast: "were",
                toBeContracted: "we're",
                toBeContractedCap: "We're",
                toBePastContracted: "we've",
                toBePastContractedCap: "We've",
                pirateTitle: "these fine crewmates",
                pirateTitleCap: "These fine crewmates"
                };
           
            } else {
                console.log("no pronouns chosen");
                }
                console.log("sample pronoun is" + this.samplePronoun)
                
            },

            setTempOpen(array) {
                this.randomize(array);
                this.chosen.chosenTempOpen = array[0];
                this.output.op1 = this.chosen.chosenTempOpen;
                console.log(array[0]);
            },

            setGripe(chosenGripe) {
                if(chosenGripe === 'dishes') {
                    console.log('it was dishes');
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
                 this.animateThree()
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
                console.log(this.tempChosen)
                this.setPronouns();
                this.setTempOpen(this.tempOpens);
                this.setGripe(this.chosen.chosenGripe);
                this.setConsequence(this.consequences);
                this.setPlea(this.pleas);
                this.$store.state.baseOutput = this.output;
                // this.formPosition++
            },

            prevForm() {
                this.formPosition--;
                console.log('went back')
            },
        },

        watch: {

            gripeChange() {
                this.generateGripe();
            }
        }
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
</style>
