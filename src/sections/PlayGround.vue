<template>

    <base-layout page-default-back-link="/input" page-title="Edit your gripe">
    <p> {{ this.selectedPhrases }} </p>
    <p>active moods: {{ activeTones }}</p>
    <p>active index length: {{ activeIndexLength }}</p>

    <p v-for="text in output" :key="text">
        {{ text }}
    </p>
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

        


        <p> {{ moodcount }} </p>

         <!-- <ion-button expand="block" color="primary" shape="round" fill="outline" router-link="/finish">Finish</ion-button> -->

            
    </base-layout>
</template>

<script>

import { useStore } from 'vuex'
import TextSnippet from './TextSnippet.vue'
import TheSliders from './TheSliders.vue'
// import { addCircle, removeCircle } from 'ionicons/icons'

// import TextArea from './TextArea.vue';
// import {
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonIcon
// } from '@ionic/vue'

export default {
    components: {
        // IonButton,
        TextSnippet,
        TheSliders,
        // IonGrid,
        // IonRow,
        // IonCol,
        // IonIcon
        // TextArea
    },

    setup() {
        const store = useStore()
        const gripeObject = store.state.baseOutput

        return {
            gripeObject,
            // addCircle,
            // removeCircle
        }
    },

    data() {
        
        // phrase: position, status (boolean), phrase, tone
        return {
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
            moodLimit: 9,
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
            selectedTone: '',
            selectedPhrase: '',
            phrases: [],
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


            if(this.moodcount.total>=this.moodLimit) {
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
    

    mounted() {
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

            this.activePronouns = {...this.$store.state.chosenPronouns};
            this.activePersonmate = this.$store.state.chosenPersonmate;
            this.activeGripe = this.$store.state.chosenGripe;

            this.phrases = [

                {
                    position: "op1",
                    status: false,
                    phrase: "Hey shithead, ",
                    tone: "angry",

                },

                 {
                    position: "op1",
                    status: false,
                    phrase: "Hey asshole, ",
                    tone: "angry",

                },

                 {
                    position: "op1",
                    status: false,
                    phrase: "Hey twatface, ",
                    tone: "angry",

                },

                {
                    position: "op1",
                    status: false,
                    phrase: "So sorry to bother you, but ",
                    tone: "polite",

                },

                 {
                    position: "op1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} hope you don't mind ${this.activePronouns.objectP}  saying this, but `,
                    tone: "polite",

                },

                 {
                    position: "op1",
                    status: false,
                    phrase: `How are you? ${this.activePronouns.subjectPCap} hope you're well. ${this.activePronouns.subjectPCap} couldn't help but notice that `,
                    tone: "polite",

                },
                
                {
                    position: "op1",
                    status: false,
                    phrase: "So... ",
                    tone: "paggro",

                },

                 {
                    position: "op1",
                    status: false,
                    phrase: "Hmmmm... ",
                    tone: "paggro",

                },

                 {
                    position: "op1",
                    status: false,
                    phrase: "Oh dear... ",
                    tone: "paggro",

                },

                {
                    position: "op1",
                    status: false,
                    phrase: "Ahoy there, ",
                    tone: "pirate",

                },

                {
                    position: "op1",
                    status: false,
                    phrase: "Fire in the hole! Fer ",
                    tone: "pirate",

                },

                {
                    position: "op1",
                    status: false,
                    phrase: "Aye aye, ",
                    tone: "pirate",

                },

                {
                    position: "op2",
                    status: false,
                    phrase: "in your latest dick move ",
                    tone: "angry",

                },

                 {
                    position: "op2",
                    status: false,
                    phrase: `${this.activePronouns.subjectP} ${this.activePronouns.toBePresent} PISSED that`,
                    tone: "angry",

                },

                {
                    position: "op2",
                    status: false,
                    phrase: `${this.activePronouns.subjectP} ${this.activePronouns.toBePresent} RAGING because`,
                    tone: "angry",

                },

                 {
                    position: "op2",
                    status: false,
                    phrase: "it looks like ",
                    tone: "polite",

                },

                   {
                    position: "op2",
                    status: false,
                    phrase: "it seems to be the case that ",
                    tone: "polite",

                },

                   {
                    position: "op2",
                    status: false,
                    phrase: "it may be that ",
                    tone: "polite",

                },

                {
                    position: "op2",
                    status: false,
                    phrase: "whoopsie daisy! Looks like ",
                    tone: "paggro",

                },

                  {
                    position: "op2",
                    status: false,
                    phrase: "we seem to have a teeny tiny problem on our hands... ",
                    tone: "paggro",

                },

                  {
                    position: "op2",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} had the unfortunate privilege of noticing that `,
                    tone: "paggro",

                },

                {
                    position: "op2",
                    status: false,
                    phrase: "the fair winds be whisperin' that ",
                    tone: "pirate",

                },

                 {
                    position: "op2",
                    status: false,
                    phrase: "the salty brines be singin' that ",
                    tone: "pirate",

                },

                 {
                    position: "op2",
                    status: false,
                    phrase: "the high seas be singin' that ",
                    tone: "pirate",

                },

                {
                    position: "of1",
                    status: false,
                    phrase: "Fuck you! ",
                    tone: "angry",

                },

                {
                    position: "of1",
                    status: false,
                    phrase: "You REALLY had to go there, didn't you? ",
                    tone: "angry",

                },

                {
                    position: "of1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} can't believe you've done this. `,
                    tone: "angry",

                },

                 {
                    position: "of1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} really hope you don't mind ${this.activePronouns.objectP} bringing this up. `,
                    tone: "polite",

                },

                {
                    position: "of1",
                    status: false,
                    phrase: `Please don't think ill of ${this.activePronouns.objectP} for mentioning this. `,
                    tone: "polite",

                },

                {
                    position: "of1",
                    status: false,
                    phrase: `I hope you don't think ${this.activePronouns.objectP} rude for bringing this up. `,
                    tone: "polite",

                },

                {
                    position: "of1",
                    status: false,
                    phrase: `Thanks SO much for reminding ${this.activePronouns.objectP} what a responsible adult looks like. `,
                    tone: "paggro",

                },

                 {
                    position: "of1",
                    status: false,
                    phrase: `It was really so kind of you to demonstrate what it means to be a great ${this.activePersonmate}. `,
                    tone: "paggro",

                },

                 {
                    position: "of1",
                    status: false,
                    phrase: `Please don't get ${this.activePronouns.objectP} wrong, ${this.activePronouns.toBeContracted} sooooo glad to have you as ${this.activePronouns.posessiveDeterminerP} ${this.activePersonmate}. `,
                    tone: "paggro",

                },

                 {
                    position: "of1",
                    status: false,
                    phrase: "Too much grog was it? ",
                    tone: "pirate",

                },

                 {
                    position: "of1",
                    status: false,
                    phrase: `Perhaps ye be runnin' the rig with ${this.activePronouns.objectP}? `,
                    tone: "pirate",

                },

                {
                    position: "of1",
                    status: false,
                    phrase: `Perhaps ye be hornswagglin' ${this.activePronouns.objectP}? `,
                    tone: "pirate",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: "PRICK. ",
                    tone: "angry",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: "DOUCHE. ",
                    tone: "angry",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: "Un-fucking-believable. ",
                    tone: "angry",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: `(If this is an incorrect assumption on ${this.activePronouns.posessiveDeterminerP} part ${this.activePronouns.toBeContracted} truly sorry.) `,
                    tone: "polite",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: `(If ${this.activePronouns.toBeContracted} mistaken please know that ${this.activePronouns.toBeContracted} truly sorry.) `,
                    tone: "polite",

                },

                 {
                    position: "of2",
                    status: false,
                    phrase: `(${this.activePronouns.toBeContracted} so sorry for even mentioning this - ${this.activePronouns.toBeContracted} sure you're busy.) `,
                    tone: "polite",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: ":) ",
                    tone: "paggro",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: ">:) ",
                    tone: "paggro",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: "☺ ",
                    tone: "paggro",

                },

                {
                    position: "of2",
                    status: false,
                    phrase: "Ye scurvy dog! ",
                    tone: "pirate",

                },

                 {
                    position: "of2",
                    status: false,
                    phrase: "Thar she blows! ",
                    tone: "pirate",

                },

                 {
                    position: "of2",
                    status: false,
                    phrase: "Aaaaaarrrggghhhhhhhh. ",
                    tone: "pirate",

                },

                {
                    position: "co0",
                    status: false,
                    phrase: "Along with the rest of your bullshit, ",
                    tone: "angry",

                },

                {
                    position: "co0",
                    status: false,
                    phrase:  `As if having you for a ${this.activePersonmate} wasn't bad enough, `,
                    tone: "angry",

                },

                {
                    position: "co0",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} always knew you were a bit of a bellend, but `,
                    tone: "angry",

                },

                {
                    position: "co0",
                    status: false,
                    phrase: `While ${this.activePronouns.toBeContracted} sure you didn't mean anything by it, `,
                    tone: "polite",

                },

                {
                    position: "co0",
                    status: false,
                    phrase: `${this.activePronouns.toBeContractedCap} not annoyed at you at all, it's just that `,
                    tone: "polite",

                },

                 {
                    position: "co0",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} know that personal responsibility isn't really your thing, but `,
                    tone: "paggro",

                },

                {
                    position: "co0",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} can see that you're suuuuper busy with all sorts of very important things, but `,
                    tone: "paggro",

                },

                {
                    position: "co0",
                    status: false,
                    phrase: `Now ${this.activePronouns.subjectP} know that basic common decency doesn't come naturally to everyone, but `,
                    tone: "paggro",

                },

               {
                    position: "co0",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap}  grant ye that a landlubber's life aint easy, but `,
                    tone: "pirate",

                }, 

                {
                    position: "co0",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} may be old salt, but `,
                    tone: "pirate",

                }, 

                {
                    position: "co0",
                    status: false,
                    phrase: `Aye, ${this.activePronouns.toBePastContracted} got little expertise 'sides swashbucklin', but ${this.activePronouns.subjectP} know well enough that `,
                    tone: "pirate",

                }, 

                {
                    position: "co2",
                    status: false,
                    phrase: "is too much. YOU'VE REACHED THE END OF THE LINE, BUD. ",
                    tone: "angry",

                },

                {
                    position: "co2",
                    status: false,
                    phrase: "is enough to drive ANYONE insane. ",
                    tone: "angry",

                },

                {
                    position: "co2",
                    status: false,
                    phrase: `is NOT OKAY for ${this.activePronouns.objectP}. `,
                    tone: "angry",

                },

                {
                    position: "co2",
                    status: false,
                    phrase: "can sometimes be rather inconvenient. ",
                    tone: "polite",

                },

                {
                    position: "co2",
                    status: false,
                    phrase: "can be a tad inconvenient. ",
                    tone: "polite",

                },

                {
                    position: "co2",
                    status: false,
                    phrase: "is quite inconvenient. ",
                    tone: "polite",
                },

                {
                    position: "co2",
                    status: false,
                    phrase: "is... well... **SIGH** ",
                    tone: "paggro",
                },

                {
                    position: "co2",
                    status: false,
                    phrase: `is SO much fun for ${this.activePronouns.objectP} (not!) `,
                    tone: "paggro",
                },

                {
                    position: "co2",
                    status: false,
                    phrase: `is not ${this.activePronouns.posessiveDeterminerP} idea of a fun time, mmkay? `,
                    tone: "paggro",
                },

                {
                    position: "co2",
                    status: false,
                    phrase: "would have even the finest seadog hangin' their jib. ",
                    tone: "pirate",
                },

                {
                    position: "co2",
                    status: false,
                    phrase: "would have Davy Jones himself quiverin' in his boots. ",
                    tone: "pirate",
                },

                {
                    position: "co2",
                    status: false,
                    phrase: `is not what ${this.activePronouns.pirateTitle} dreamed of in a livin' arrangement. `,
                    tone: "pirate",
                },

                {
                    position: "pl0",
                    status: false,
                    phrase: "For pity's sake, ",
                    tone: "angry",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: "PHEW. Ok. So ",
                    tone: "angry",

                },

                 {
                    position: "pl0",
                    status: false,
                    phrase: "If it's not too much trouble, ",
                    tone: "polite",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: "If it's not too much bother, ",
                    tone: "polite",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: `If you don't mind ${this.activePronouns.objectP} saying so, `,
                    tone: "polite",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: "So if it's not TOO challenging for you, ",
                    tone: "paggro",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: `While ${this.activePronouns.toBeContracted} sure you have FAR more important things to do (GREAT choice of socks today by the way), `,
                    tone: "paggro",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: "So if it's not beyond your capabilities, ",
                    tone: "paggro",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: "If ye consider yerself a worthy seadog, ",
                    tone: "pirate",

                },

                 {
                    position: "pl0",
                    status: false,
                    phrase: "As long as ye be open to parley, ",
                    tone: "pirate",

                },

                {
                    position: "pl0",
                    status: false,
                    phrase: "Aye me hearty, ",
                    tone: "pirate",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `please have mercy on ${this.activePronouns.objectP} and `,
                    tone: "angry",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `please help restore ${this.activePronouns.objectP} sanity and `,
                    tone: "angry",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: "please get your shit together and ",
                    tone: "angry",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} would really appreciate it if you could `,
                    tone: "polite",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} would be very grateful if you could `,
                    tone: "polite",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `you'd be doing ${this.activePronouns.objectP} a huge favour if you could `,
                    tone: "polite",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} have a TEENY WEENY favour to ask... `,
                    tone: "paggro",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} would sooooooo grateful (and impressed!) if you could `,
                    tone: "paggro",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: "it would be so. very. amazing. if you could ",
                    tone: "paggro",

                },

                {
                    position: "pl1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} suggest ye' leave yer bilge-suckin' ways behind and `,
                    tone: "pirate",

                },

                 {
                    position: "pl1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} reckon ye'd better heave ho and `,
                    tone: "pirate",

                },

                 {
                    position: "pl1",
                    status: false,
                    phrase: `${this.activePronouns.subjectPCap} be asking ye' to batten down the hatches and `,
                    tone: "pirate",

                },

                {
                    position: "pl2",
                    status: false,
                    phrase: "stop being such a prat, yeah? Bloody hell. ",
                    tone: "angry",

                },
                
                {
                    position: "pl2",
                    status: false,
                    phrase: "be less crap next time. Got it? ",
                    tone: "angry",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: "stop inflicting your awfulness on the rest of us. Alright mate? ",
                    tone: "angry",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: "keep an eye on this in the future. Thanks so much. ",
                    tone: "polite",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: "try to stay on top of this in the future. Thanks a lot. Have a great day! ",
                    tone: "polite",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: "be a bit more vigilant next time. Thanks so much. ",
                    tone: "polite",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: "be a decent human being next time, yeah? Ta XOXOXOXO ",
                    tone: "paggro",

                }, 

                 {
                    position: "pl2",
                    status: false,
                    phrase: "be more considerate next time, k? :) ",
                    tone: "paggro",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: "kindly think of other people next time. THANKS. ",
                    tone: "paggro",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: `spare a thought fer ${this.activePronouns.pirateTitle} in the future. Savvy? `,
                    tone: "pirate",

                },

                {
                    position: "pl2",
                    status: false,
                    phrase: "straighten yer' sea legs next time. Avast! ",
                    tone: "pirate",

                }, 

                {
                    position: "pl2",
                    status: false,
                    phrase: "quit being such a son of a biscuit eater! Oh aye. ",
                    tone: "pirate",

                },
            ];
            this.priorPhrases = Object.assign({}, this.$store.state.baseOutput);
            this.phraseHistory = Object.assign({}, this.$store.state.baseOutput)
            this.updatedPhrases = this.phrases;
            // console.log("mounted mate");

    },

     computed: {
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

