<template>
    <base-layout page-default-back-link="/home" page-title="Gripe Deets">

        <!-- <transition appear
        name="fade"
        mode="out-in">
        <form-summary
        v-if="pronounSet"
        :pronoun="samplePronoun"
        key="pronoun"
        ></form-summary>
        </transition> -->

        <!-- <p>{{ questions }}</p> -->

    <div class="sampleText">
        <div v-if="samplePronoun.length>0">
        <transition-group
        name="move-complete"
        appear
        tag="p">
            <span
            v-for="question in questions"
            :key="question"
            class="move-complete-item"
            > {{ question }}</span>
        </transition-group>
        </div>

                <transition-group
        name="move-complete"
        appear
        tag="p"
       >
            <span
            v-show="this.formPosition >1"
            v-for="nextQuestion in nextQuestions"
            :key="nextQuestion"
            class="move-complete-item"
            > {{ nextQuestion }}</span>
        </transition-group>

       
            <transition-group
        name="move-complete"
        appear
        tag="p"
       >
        <span
            v-show="this.formPosition >2"
            v-for="thirdQuestion in thirdQuestions"
            :key="thirdQuestion"
            class="move-complete-item"
            > {{ thirdQuestion }}</span>
        </transition-group>
    </div>

     <!-- <div class="text-div" v-if="runOne">
           <p class="animate drop"> {{ questions[0]}} </p>
           <p class="animate drop delay-1"> {{ questions[1]}} </p>
           <p class="animate drop delay-2"> {{ questions[2] }}</p>
        </div>

        <div class="text-div" v-show="runTwo">
            <p
            class="animate drop"
            v-for="string in arr"
            :key="string.index">
            {{ string }}
            </p>
        </div> -->


        <!-- <p
        v-if="this.formPosition ===1">
        And who's the perpetrator?
        </p> -->

        <p
        v-if="this.formPosition ===2">
        Oh dear. What did they do?
        </p>

        <!-- <transition
        name="fade">
        <p
        v-if="pronounSet">hey there</p>
        </transition> -->

        <pronoun-input
        @update:pronoun="getPronoun"
        v-if="this.formPosition === 0">
        </pronoun-input>

        <personmate-input
     
        @update:personmate="getPersonmate"
        v-if="this.formPosition === 1"
        ></personmate-input>

        <gripe-input 
        @update:gripe="getGripe"
        v-if="this.formPosition === 2">
        </gripe-input>

        <transition 
        name="fade">
        <input-summary
        v-if="this.formPosition === 3">
        </input-summary>
        </transition>

    <div v-if="this.formPosition>0">
     <ion-button expand="block" color="primary" shape="round" fill="outline" @click="prevForm">Go back</ion-button>
    </div>
    <!-- <p>your chosen gripe: {{ this.chosen.chosenGripe }} </p>
    <p>your chosen pronoun: {{ this.chosen.chosenPronoun }}</p>
    <p>your chosen personmate: {{ this.chosen.chosenPersonmate }}</p> -->

    <!-- <div v-if="this.formPosition === 3">
    <ion-button expand="block" color="primary" shape="round" fill="outline" @click="generateGripe">CONFIRM</ion-button>

    </div> -->
    <template v-slot:footer>
       
    </template>
    </base-layout>

   
</template>

<script>

    import PersonmateInput from './components/PersonmateInput.vue';
    import GripeInput from './components/GripeInput.vue';
    import PronounInput from './components/PronounInput.vue';
    import InputSummary from './components/InputSummary.vue';
    // import FormSummary from './components/FormSummary.vue'   
    
    import {
    IonButton

} from '@ionic/vue';

    export default {

        components: {
            PersonmateInput,
            GripeInput,
            PronounInput,
            IonButton,
            InputSummary,
            // FormSummary
        },

        data() {
            return {

                questions: ['So, ', 'who has a complaint?'],
                nextQuestions: ['about your'],
                thirdQuestions: ['because they'],
                
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
                objectP: "me",
                posessiveDeterminerP: "my",
                possessiveP: "mine",
                reflexiveP: "myself", 
                toBePresent: "am",
                toBePast: "was",
                toBeContracted: "I'm",
                toBePastContracted: "I've",
                pirateTitle: "this old cap'n"

               
                };
               
                    } else if (this.chosen.chosenPronoun === "we") {
                
                this.$store.state.chosenPronouns = {
                subjectP: "we",
                objectP: "us",
                posessiveDeterminerP: "our",
                possessiveP: "ours",
                reflexiveP: "ourselves",
                toBePresent: "are",
                toBePast: "were",
                toBeContracted: "We're",
                toBePastContracted: "We've",
                pirateTitle: "these fine crewmates"
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
                    this.chosen.chosenOffense = chosenGripe + '. ';
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
            }
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

</style>
