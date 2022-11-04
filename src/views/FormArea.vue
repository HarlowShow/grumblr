<template>
    <base-layout page-title="Gripe Deets">

        <div class="chat scrollable"
        ref="msgContainer"
        >

    <!-- <button @click="getElPosition">get el position</button> -->
           <!-- <p>{{ checkStrings }}</p>
           <p>FORM POSITION: {{ this.formPosition }}</p> -->


             <!-- enter PRONOUN -->
            <chat-bubble
            :gridClass="'left'"
            v-if="this.formPosition>-2">
                 <template v-slot:start>
                    <the-icons :name="'reg-reg'"></the-icons>
                </template>
                 <template v-slot:end>
                     <!-- Q: who's grumbling -->
                     <!-- @scroll="scrollToBottom(this.content)" -->
                   <chat-typer
                   :chatString="this.pandaChats[0].string"
                    :scrollType="setScroll"
                   ></chat-typer>
                </template>

                    <!-- chips - choose pronoun -->
                <template  v-slot:responses>
                <div>
                    <set-pronouns
                    v-if="this.formPosition===-1"
                    @update:pronoun="getPronoun"
                    >
                    </set-pronouns>
                    <!-- <ion-button
                    @click="generateDemoGripe">Skip</ion-button> -->
                </div>
                </template>

            </chat-bubble>
            <!-- CLICK, set form, position to 0 -->
            <!-- pronoun response -->
            <chat-bubble
             :gridClass="'right'"
             :responseClass="true"
             v-if="this.formPosition>-1">
                <template v-slot:end>
                    <p> {{ demoPronoun }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

            <!-- enter NAME TYPE +/ NAME -->
            <chat-bubble
            :gridClass="'left'"
              v-if="this.formPosition>-1">
                 <template v-slot:start>
                    <the-icons :name="'reg-reg-two'"></the-icons>
                </template>
                            <template v-slot:end>
                                <!-- Q: choose name -->
                            <chat-typer
                            :chatString="this.pandaChats[1].string"
                           
                                :scrollType="setScroll"
                            ></chat-typer>
                            </template>
                <template  v-slot:responses>
                <div>
                                     <!-- chips - choose name -->
                                    <text-input
                                    v-if="this.formPosition===0"
                                    @update:value="setName"
                                    :inputType="'short'"
                                    :examples="['(or leave this blank)']"
                                    :exampleType="'sentence'"
                                    :maxLength="45"
                                    ></text-input>
                </div>
                </template>
            </chat-bubble>
            <!-- CLICK, set form, position to 1 -->
            <!-- their name response -->
            <chat-bubble
             :gridClass="'right'"
             v-if="this.formPosition>=1">
                <template v-slot:end>
                    <p>{{ this.chosen.demoName }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

            <!-- enter PERSONMATE -->
            <chat-bubble
            :gridClass="'left'"
            :additionalBubbles="bubbleCount['personmateInvalid']"
            v-if="this.formPosition>0&&this.nameSet===true"
            >
                    <template v-slot:start>
                    <the-icons :name="'reg-reg'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <!-- Q: enter personmate -->
                       <chat-typer
                        
                        :scrollType="setScroll"
                        :chatString="this.nameFollowUp"
                        ></chat-typer>
                    </template>
                    <template v-slot:end-next>
                                <!-- form validation message -->
                            <chat-typer
                            v-if="personmateInvalid===true"
                                
                                :scrollType="setScroll"
                                :chatString="`Work with me here.`"
                                ></chat-typer>
                    </template>
                     <template v-slot:end-next-two>
                        <chat-typer
                            v-if="personmateInvalid===true && this.bubbleCount['personmateInvalid'] > 1"
                                
                                :scrollType="setScroll"
                                :chatString="`Enter a response to continue.`"
                                ></chat-typer>
                   </template>
                      <template  v-slot:responses>
                                     <!-- chips - choose/enter personmate -->
                     <text-input
                     v-if="this.formPosition===1"
                                    @update:value="getPersonmate"
                                    :inputType="'short'"
                                    :examples="['flatmate', 'neighbour', 'landlord', 'world leader']"
                                    :exampleType="'list'"
                                    :maxLength="45"
                                    ></text-input>
                    </template>
            </chat-bubble>
            <!-- CLICK, set form, position to 2 -->
            <!-- personmate response -->
            <chat-bubble 
             :gridClass="'right'"
             v-if="this.formPosition>1">
                <template v-slot:end>
                    <p>{{  this.chosen.chosenPersonmate }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

            <!-- enter gripe -->
            <chat-bubble :gridClass="'left'"
             v-if="this.formPosition>1&&this.nameSet===true"
             :additionalBubbles="bubbleCount['customGripe']"
             >
                    <template v-slot:start>
                    <the-icons :name="'reg-eyebrow'"></the-icons>
                    </template>
                    <template v-slot:end>
                           <!-- Q: enter gripe -->
                          <chat-typer
                            
                            :scrollType="setScroll"
                            :chatString="this.personmateFollowUp"
                        ></chat-typer>
                    </template>
                      <template  v-slot:responses>
                          <!-- chips - choose gripe. Includes text input -->
                          <set-gripe
                            v-if="this.formPosition===2"
                            @update:gripe="getGripe"
                            @addBubble="this.bubbleCount['customGripe']++"
                          ></set-gripe>
                    </template>
                    <template v-slot:end-next>
                                    <!-- Additional info: chat guidelines on custom gripe -->
                                    <chat-typer
                                        v-if="this.$store.state.customGripe===true&&this.formPosition>1"

                                        :chatString="this.pandaChats[3].stringTwo"
                                       
                                        :scrollType="setScroll"
                                    ></chat-typer>
                    </template>
            </chat-bubble>
            <!-- CLICK, set form, position to 3 -->
            <!-- gripe response -->
            <chat-bubble 
             :gridClass="'right'"
             v-if="this.formPosition>2">
                <template v-slot:end>
                    <p>{{ this.chosen.demoGripe }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

             <!-- check sentence -->
             <chat-bubble
                :gridClass="'left'"
                :additionalBubbles="bubbleCount['confirmChoices']"
                v-if="this.formPosition>2">
                 <template v-slot:start>
                    <the-icons :name="'reg-reg-two'"></the-icons>
                </template>

                <template v-slot:end>
                    <!-- Q: check sentence 1-->
                   <chat-typer
                   :chatString="sentenceToCheckPreamble"
                   @scroll="this.bubbleCount['confirmChoices']++"
                    :scrollType="setScroll"
                   ></chat-typer>
                </template>

               
                 <!-- Q: check sentence 2-->
                <template v-slot:end-next>
                    <chat-typer
                   :chatString="sentenceToCheck"
                  
                    :scrollType="setScroll"
                   ></chat-typer>

                </template>
                
                 <!-- Additional Q - options to change -->
                <template v-slot:end-next-two>
                    <chat-typer
                    v-if="choicesConfirmed===false&&this.formPosition>2"
                    :chatString="this.pandaChats[4].string"
                   
                    :scrollType="setScroll">
                    </chat-typer>
                   </template>

                

                <template v-slot:responses>
                <div>
                     <!-- chips - options to swap choices -->
                    <chat-response
                      v-if="choicesConfirmed===false&&this.formPosition===3"
                     :data="checkStrings"
                     :subtext="true"
                     :noIcon="true"
                     @update:value="swapChoices">
                     </chat-response>
                     <!-- chips - yes/no, confirm choices -->
                     <chat-response
                     v-else-if="this.formPosition===3"
                     :data="confirmResponses"
                     @update:value="confirmChoices">
                     </chat-response>
                </div>
                </template>
            </chat-bubble>
             <!-- CLICK, set form, position to 4 -->
            <!-- check sentence response -->
            <chat-bubble
             :gridClass="'right'"
             :responseClass="true"
             v-if="this.formPosition>3">
                <template v-slot:end>
                    <p>{{ this.chosen.confirmResponseDemo }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

            <!-- emotional teaser step 1 -->
            <chat-bubble 
            :gridClass="'left'"
             v-if="this.formPosition>3"
             >
                    <template v-slot:start>
                    <the-icons :name="'reg-reg-two'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                            <!-- Q: get tone 1 -->
                        <chat-typer
                        
                        :scrollType="setScroll"
                        :chatString="this.pandaChats[5].string"
                        ></chat-typer>
                        </div>
                    </template>
                       <template  v-slot:responses>
                           <!-- chips - choose tone 1 -->
                    <emotional-teaser
                        :step="1"
                        @update:starters="getStarterTones"
                        v-if="this.formPosition===4">  
                    </emotional-teaser>
                </template>
            </chat-bubble>

            <!-- teaser 1 response -->
            <chat-bubble
                :gridClass="'right'"
                v-if="this.formPosition>4"
                :additionalBubbles="this.bubbleCount['setTeasers']"
                >
                <template v-slot:end>
                    <p>{{ starterOneResponse }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
                <!-- teaser 2 response (appears after being set in component below) -->
                 <template v-slot:end-next
                   v-if="this.formPosition>5">
                    <p>{{ starterTwoResponse }}</p>
                </template>
            </chat-bubble>

            <!-- emotional teaser step 2 -->
                <div class="teaser-responses">
                    <emotional-teaser
                         v-if="this.formPosition===5"
                      
                        :step="2"
                        :teasers="teaserSentences"
                        @update:starters="getStarterTones">  
                    </emotional-teaser>
                </div>

            <!-- exit teaser -->
            <chat-bubble
                :gridClass="'left'"
             v-if="this.formPosition>5"
             >
                    <template v-slot:start>
                    <the-icons :name="'reg-reg'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                        <chat-typer
                         :chatString="this.pandaChats[7].string"
                        
                         :scrollType="setScroll"
                        ></chat-typer>
                        </div>
                    </template>
                       <template  v-slot:responses>
                    <emotional-teaser
                        :step="3"
                        v-if="this.formPosition===6"
                        @update:starters="getStarterTones"
                        @update:route="routin"
                        > 
                    </emotional-teaser>
                </template>
            </chat-bubble>

            <!-- optional exit teaser response -->
               <chat-bubble 
                :gridClass="'right'"
                v-if="this.formPosition>6">
                <template v-slot:end>
                    <p>No.</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

            <!-- optional exit raccoon chat -->
                 <chat-bubble :gridClass="'left'"
             v-if="this.formPosition>6"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                        <chat-typer
                        :chatString="this.pandaChats[6].string"
                        
                          :scrollType="setScroll"
                        ></chat-typer>
                        </div>
                    </template>
            </chat-bubble>

            <div class="buffer">

            </div>

        </div>
        <!-- <div v-else> <p>Loading... {{ isResetting }}</p> </div> -->

    </base-layout>

 
</template>

<script>

    import { accessibility, earth, infinite, sad, ellipse, checkmarkCircle, closeCircle } from 'ionicons/icons'
    import { onIonViewWillEnter } from '@ionic/vue';
    import SetPronouns from '../sections/components/form-components/SetPronouns.vue'
    // import SetPersonmate from '../sections/components/form-components/SetPersonmate.vue'
    import SetGripe from '../sections/components/form-components/SetGripe.vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router';
    // import ReviewSelection from '../sections/components/form-components/ReviewSelection.vue'
    // import ConfirmSelection from '../sections/components/form-components/ConfirmSelection.vue'
    // import InputSummary from './components/InputSummary.vue';
    import EmotionalTeaser from '../sections/components/form-components/EmotionalTeaser.vue';
    import TheIcons from '../sections/components/TheIcons.vue';
    import ChatBubble from '../sections/components/ChatBubble.vue'
    import ChatTyper from '../sections/components/ChatTyper.vue'
    import ChatResponse from '../sections/components/ChatResponse.vue'
    import TextInput from '../sections/components/UI/TextInput.vue'


    import speakTrashPanda from '../composables/trashpandachat'
    import usePronouns from '../composables/pronouns'

    import { ref, } from 'vue';

    export default {

        components: {
            // IonButton,
            ChatTyper,
            EmotionalTeaser,
            TheIcons,
            ChatBubble,
            SetPronouns,
            // SetPersonmate,
            SetGripe,
            TextInput,
            ChatResponse
            // ReviewSelection,
            // ConfirmSelection
        },


        setup() {
            const store = useStore();
            const router = useRouter();
            onIonViewWillEnter(() => {
                console.log('Home page will enter');
                if(store.state.shouldReset === true) {
                    console.log('should rerender');
                    store.state.shouldReset = false;
                    router.go(0);
                }
            })

            const pandaChat = speakTrashPanda()
            const pandaChats = pandaChat.formChats.value
         
            const pronouns = usePronouns()

            const msgContainer = ref(HTMLDivElement)


            return {
                msgContainer,
                pandaChat,
                pandaChats,
                accessibility,
                earth,
                infinite,
                sad,
                ellipse,
                checkmarkCircle,
                closeCircle,
                nameFollowUp: pandaChat.nameFollowUp,
                personmateFollowUp: pandaChat.personmateFollowUp,
                gripeFollowUp: pandaChat.gripeFollowUp,
                pronouns,
                setPronouns: pronouns.setPronouns,
            }
        },

        mounted() {
           this.content = this.msgContainer.parentElement
        },

        data() {
            return {

                editing: false,
                confirmedSet: false,
                bubbleCount: {
                    confirmChoices: 0,
                    customGripe: 0,
                    personmateInvalid: 0,
                    setTeasers: 0,
                },
                personmateInvalid: false,

                checkStrings: [
                    {text: '', value: 'name', icon: ellipse, subtext: 'name'},
                    {text: '', value: 'gripe', icon: ellipse, subtext: 'what they did'},
                    {text: '', value: 'pronoun', icon: ellipse, subtext: 'I or we'},
                    {text: '', value: 'personmate', icon: ellipse, subtext: 'relationship to you'},
                    {text: 'change everything', value: 'all', icon: ellipse},
                    {text: 'change nothing', value: 'none', icon: ellipse}
                ],

                nameTypeResponses: [
                    { text: 'someone', value: 'someone', icon: accessibility},
                    // { text: 'everyone', value: 'everyone', icon: sad},
                    { text: 'something', value: 'something', icon: infinite},
                    // { text: 'everything', value: 'everything', icon: earth},
                ],

                gripeResponses: [

                ],

                nameSet: false,
                named: false,

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
           
                formPosition: -1,
                gripeChange: false,
            
                confirmResponses: [
                    { text: 'close enough', value: true, icon: checkmarkCircle},
                    { text: 'no, change something', value: false, icon: closeCircle}
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
                    
                 tempOpens: [
                    `Hey 
                    `,
                    `Hiya 
                    `,
                    `Hello 
                    `
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
                        {chosenNameType: '', nameTypeFollowUp: '', personmateFollowUp: '', nameTypeExamples: []},
                        {chosenName: null},
                        {confirmResponse: '', confirmResponseDemo: ''}
                    ],

                    starterTones: [],
                    starterConjunctions: {
                            e: '',
                            f: '',
                            g: '',
                            h: '',
                        },
                    teaserSentences: [],

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
                        pl2: '',
                        so0: '',
                    },

                    choicesConfirmed: null,


                    gripeIsCustom: false,
                    personmateIsCustom: false,

                chosenPronouns: {},

                tempChosen: {}
            };
        },

        computed: {

            proOne(){
            let pro
                    if(this.chosen.chosenPronoun==="we"){
                    
                        pro = 'We'
                    } else {
                  
                        pro = 'I'
                    }
                    return pro
            },

            proOneLower(){
            let pro
                    if(this.chosen.chosenPronoun==="we"){
                    
                        pro = 'we'
                    } else {
                  
                        pro = 'I'
                    }
                    return pro
            },
            proTwo(){
            let pro
                    if(this.chosen.chosenPronoun==="we"){
                    
                        pro = 'our'
                    } else {
                  
                        pro = 'my'
                    }
                    return pro
            },

            sentenceToCheckPreamble(){
                let sentence = "You know, that's a pretty serious allegation to make. Just imagine saying it out loud..."
                return sentence 
            },

            sentenceToCheck(){ 
                let sentence = `"${this.stringA} ${this.gripeFollowUp} ${this.stringC} ${this.stringD}" Does that even make sense to you?`

                return sentence
            },

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
                        response = '🏴‍☠️'
                }
                return response
            },

             starterTwoResponse() {
                let arg = this.starterTones[1]
                let response = ''

                switch(arg) {
                    case 'angry':
                        response = `${this.starterConjunctions['e']} they need to know that this is NOT ON.`
                        break;
                    case 'polite':
                        response = `${this.starterConjunctions['f']} ${this.proOneLower} will bravely pretend it never happened`
                        break;
                    case 'paggro':
                        response = `${this.starterConjunctions['g']} ${this.proOneLower} will be leaving them a strongly worded post-it note.`
                        break;
                    case 'pirate':
                        response = `${this.starterConjunctions['h']} ${this.proOneLower} best consult ${this.proTwo} parrot before taking any further action.`
                }
                return response
            }

         
        },

        methods: {

            async routin(shouldRoute){
                if(shouldRoute===true){
                    Promise.all([
                        this.confirmSet(),
                        this.checkStarters(),
                    ]).then(() => {
                        this.$router.push('/playground')
                    })
                    .catch(() => {
                        console.log('something went wrong with routing promise')
                    })
                } else if (shouldRoute === 'demo') {
                    this.$router.push('/playground')
                }
            },

            swapChoices(choice){
               
                this.chosen.confirmResponse = choice
                //  console.log('choice to be swapped is: ' + choice)

                if(choice==='none') {
                    this.choicesConfirmed=true
                    this.chosen.confirmResponseDemo = 'change nothing'
                    this.formPosition++
                } else if (choice==='all') {
                    this.formPosition=-1
                    this.editing=true
                } else if (choice==='name'){
                    this.formPosition=0
                    this.editing=true
                } else if (choice==='gripe'){
                    this.formPosition=2
                    this.editing=true
                } else if (choice==='pronoun'){
                    this.formPosition=-1
                    this.editing=true
                } else if (choice==='personmate'){
                    this.formPosition=1
                    this.editing=true
                } else {
                    this.formPosition++
                }

                this.bubbleCount['confirmChoices']=0

                return choice
            },

            confirmChoices(response){
                    this.choicesConfirmed = response
                    this.chosen.confirmResponse = response

                        if(response===true){
                        this.chosen.confirmResponseDemo = 'close enough'
                        } else if (response===false){
                            this.bubbleCount['confirmChoices']++
                            this.chosen.confirmResponseDemo = 'no, change something'
                        }

                    if(response===true){
                        this.editing=false
                       
                        this.formPosition++
                    }
            },

            getPronoun(pronoun) {

                this.chosen.chosenPronoun = pronoun

                if(this.chosen.chosenPronoun==="me") {
                    this.samplePronoun = "You"
                    this.demoPronoun = 'yes I am'
                    this.stringC = "I expected better from "
                }
                if (this.chosen.chosenPronoun==="we") {
                    this.samplePronoun = "Several of you"
                    this.demoPronoun = 'yes we are'
                    this.stringC = `We expected better from `
                }

                this.checkStrings[2].text = this.stringC

                if(this.editing===true&&this.chosen.confirmResponse==='pronoun'){
                     this.choicesConfirmed=true
                    this.formPosition=3
                } else {
                    this.formPosition++;
                }
               
            },

            async getPersonmate(personmate) {
                    if(!personmate){
                        this.personmateInvalid = true
                        if (this.bubbleCount['personmateInvalid'] >= 2 ) {
                            console.log('bubble max hit');
                            return;
                        } else {
                        this.bubbleCount['personmateInvalid']++
                        // console.log(this.bubbleCount['personmateInvalid']);
                        }
                    } else {
                        //* set main value
                    this.chosen.chosenPersonmate = personmate;
                    this.$store.state.chosenPersonmate = personmate;

                        //* set strings for checkSentence
                    this.samplePersonmate = personmate + '.'
                    this.stringD = `${this.proTwo} ${personmate}.`
                    this.checkStrings[3].text = this.stringD

                        //* set article for chat/phrases
                        await this.setArticle(personmate)
                       
                    if(this.editing===true&&this.chosen.confirmResponse==='personmate'){
                        this.choicesConfirmed=true
                        this.formPosition=3
                    } else {
                        this.formPosition++;
                    }
                }
        
            },

            setArticle(word){
                return new Promise((resolve) => {
                     let vowels = ['a', 'e', 'i', 'o', 'u']

                        let pString = Array.from(word)
                        // console.log('first letter is: ' + pString[0])
                        if (vowels.indexOf(pString[0])!== -1){
                            this.$store.state.personmateArticle = 'an'
                            resolve()
                        } else {
                            this.$store.state.personmateArticle = 'a'
                            resolve()
                        }

                })
            },

            calcB(gripe){
                let sentence = ''
                if(gripe==='dishes') {
                    sentence = 'you didn\'t do your washing up. '
                } else if (gripe==='noise') {
                    sentence = " you were very loud last night. "
                } else if (gripe==='rubbish') {
                    sentence = " you didn't take the rubbish out. "
                } else {
                    sentence = `you ${gripe}. `
                }
                return sentence
            },

            confirmSet() {
                return new Promise ((resolve) => {
                    if(this.confirmedSet === true){
                        resolve()
                    }
                })
            },


            async getGripe(gripe) {
   
                this.chosen.chosenGripe = gripe;
                await this.generateGripe()
                this.confirmedSet = true
                
                //* set custom prop to decide if we should show guidance text in custom input.
                //* really sloppy code, this bit should all be consolidated in one function
                const string = this.calcB(gripe)
                this.stringB = string
                this.checkStrings[1].text = string
              
                 if(this.editing===true&&this.chosen.confirmResponse==='gripe'){
                     this.choicesConfirmed=true
                    this.formPosition=3
                } else {
                    this.formPosition++;
                }
            },
            getStarterTones(tone) {
                this.starterTones.push(tone)
                this.$store.state.starterTones.push(tone)
                this.starterConjunctions
                switch(tone){
                    case 'angry':
                        this.starterConjunctions['e']= 'and'
                        this.starterConjunctions['f']= 'and'
                        this.starterConjunctions['g']= 'although'
                        this.starterConjunctions['h']= 'although'
                        break;
                     case 'paggro':
                        this.starterConjunctions['e']= 'and'
                        this.starterConjunctions['f']= 'and'
                        this.starterConjunctions['g']= 'although'
                        this.starterConjunctions['h']= 'although'
                        break;
                     case 'polite':
                        this.starterConjunctions['e']= 'although'
                        this.starterConjunctions['f']= 'although'
                        this.starterConjunctions['g']= 'although'
                        this.starterConjunctions['h']= 'although'
                        break;
                     case 'pirate':
                        this.starterConjunctions['e']= 'and'
                        this.starterConjunctions['f']= 'and'
                        this.starterConjunctions['g']= 'although'
                        this.starterConjunctions['h']= 'and'
                        break;
                }
                this.teaserSentences.push(
                `${this.starterConjunctions['e']} they need to know that this is NOT ON.`,
                `${this.starterConjunctions['f']} ${this.proOneLower} will bravely pretend it never happened`,
                `${this.starterConjunctions['g']} ${this.proOneLower} will be leaving them a strongly worded post-it note.`,
                `${this.starterConjunctions['h']} ${this.proOneLower} best consult ${this.proTwo} parrot before taking any further action.` 
                )
                if(this.starterTones.length>1){
                    this.bubbleCount['setTeasers']++
                }
                this.formPosition++;
            },

            checkStarters() {
                return new Promise((resolve) => {
                    if(this.$store.state.starterTones.length===2){
                        resolve()
                    }
                })
            },


            setTempOpen(array) {
                return new Promise((resolve) => {
                    this.randomize(array);
                let option = array[0]

                if(this.chosen.chosenName) {
                    let newString = `${option} ${this.chosen.chosenName}, 
                    `
                    this.chosen.chosenTempOpen = newString;
                    this.output.op1 = newString;
                } else {
                this.chosen.chosenTempOpen = option;
                this.output.op1 = option;
                }
                this.output.so0 = `
                Thanks. `
                    resolve()
                })
                
            },

            setNameType(nameType){

                    let proTwo
                    if(this.chosen.chosenPronoun==="we"){
                    
                        proTwo = 'our'
                    } else {
                  
                        proTwo = 'my'
                    }
                    switch(nameType) {
                        case 'someone':
                            this.chosen.chosenNameType = 'someone'
                            this.chosen.nameTypeFollowUp = "What's their name?"
                            this.named=true
                            break;
                         case 'something':
                            this.chosen.chosenNameType = 'something'
                            this.chosen.nameTypeFollowUp = "What's it called?"
                            this.named=true
                            break;
                        case 'everyone':
                            this.chosen.chosenNameType = 'everyone'
                            this.chosen.chosenName = 'everyone'
                            this.chosen.chosenPersonmate = 'group of fellow humans'
                            this.$store.state.chosenName = 'everyone'
                            this.stringA = 'Everyone, '
                            this.stringD = `${proTwo} fellow humans.`
                            this.nameSet = true
                            this.formPosition+=2
                            break;
                        case 'everything':
                            this.chosen.chosenNameType = 'everything'
                            this.chosen.chosenName = 'everything'
                            this.chosen.chosenPersonmate = 'life experience'
                            this.$store.state.chosenName = 'everything'
                            this.nameSet = true
                            this.stringA = 'Everything '

                                 if(this.chosen.chosenPronoun==="we"){
                                        this.stringC = 'We expected better'
                                 } else {
                                         this.stringC = 'I expected better'
                                 }

                            this.stringD = '.'
                            this.formPosition+=2
                            break;
                    }
                this.checkStrings[0].text = this.stringA
            },

            setName(name){
            
                if(name){
                    this.chosen.chosenName = name
                    this.$store.state.chosenName = name
                    this.chosen.demoName = name
                    this.$store.state.nameIsDefault = false
                    this.stringA = `${this.chosen.chosenName}, `
                    this.nameSet = true
                } else {
                    this.chosen.demoName = 'I name no names'
                    this.chosen.chosenName = 'mate'
                    this.$store.state.chosenName = 'mate'
                    this.$store.state.nameIsDefault = true
                    this.stringA = 'Mate, '
                    this.nameSet = true
                }
                
                this.checkStrings[0].text = this.stringA
                if(this.editing===true&&this.chosen.confirmResponse==='name'){
                     this.choicesConfirmed=true
                    this.formPosition=3
                } else {
                    this.formPosition++;
                }
           
               
            },

            setGripe(chosenGripe) {
                return new Promise((resolve) => {
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
                 resolve()
                })
               
            },

            setConsequence(consequence) {
                return new Promise((resolve) => {
                                        this.randomize(consequence);
                const chosenConsequence = consequence[0];
                chosenConsequence.middle = `dealing with ${this.chosen.offenseBadThing}`;
                this.output.co0 = chosenConsequence.stringOne;
                this.output.co1 = chosenConsequence.middle;
                this.output.co2 = chosenConsequence.stringTwo;
                resolve()
                })

            },

            setPlea(plea) {
                return new Promise((resolve) => {
                this.randomize(plea);
                const chosenPlea = plea[0];
                this.output.pl0 = chosenPlea.stringOne;
                this.output.pl1 = chosenPlea.stringTwo;
                this.output.pl2 = chosenPlea.stringThree;
                resolve()
                })
             
            }, 

            randomize(ar) {
                ar.sort(() => {return 0.5 - Math.random()});
            },

            generateDemoGripe() {
                this.$store.state.baseOutput = {
                        op0: 'Hey demo person, ',
                        op1: '',
                        op2: '',
                        of0: 'you failed to do your washing up. ',
                        of1: '',
                        of2: '',
                        co0: 'Hate to bring this up, but ',
                        co1: 'dealing with this ',
                        co2: 'is inconvenient. ',
                        pl0: 'So ',
                        pl1: 'please ',
                        pl2: 'be more considerate in the future. ',
                        so0: `
                Thanks. `,

                };
                this.$store.state.starterTones.push('pirate', 'pirate');
                this.routin('demo');
            },

            generateGripe() {
                return new Promise((resolve) => {
                        this.tempChosen = this.chosen;
                        // console.log(this.tempChosen)
                        Promise.all([
                            this.setPronouns(this.chosen.chosenPronoun),
                            this.setTempOpen(this.tempOpens),
                            this.setGripe(this.chosen.chosenGripe),
                            this.setConsequence(this.consequences),
                            this.setPlea(this.pleas),
                        ]).then(() => {
                                 this.$store.state.baseOutput = this.output;
                                resolve()
                        })
                        //* note that set temp open also sets the temp signoff close caus i'm lazy
 
                })
                // this.formPosition++
            },

            prevForm() {
                this.formPosition--;
                // console.log('went back')
            },

            scrollToBottom(el) {
               el.scrollToBottom(150)
             
            },

            resetPage() {

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

ion-chip {
    --color: black;
    border: 2.5px solid black;
    --background: none;
}

ion-icon {
    color: black;
}

.chat.scrollable {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 4rem;
    padding-top: 0.5rem;
}

.teaser-responses {
    padding-right: 3rem;
}

</style>
