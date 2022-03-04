<template>
    <base-layout page-title="Gripe Deets">

        <div class="chat scrollable"
        ref="msgContainer">

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
                   <chat-typer
                   :chatString="this.pandaChats[0].string"
                   @scroll="scrollToBottom(this.content)"
                    :scrollType="setScroll"
                   ></chat-typer>
                </template>

                    <!-- chips - choose pronoun -->
                <template  v-slot:responses>
                <div ref="el">
                    <set-pronouns
                    v-if="this.formPosition===-1"
                    @update:pronoun="getPronoun"
                    >
                    </set-pronouns>
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
                            @scroll="scrollToBottom(this.content)"
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
                                    :examples="['You can leave this blank if you prefer']"
                                    :exampleType="'info'"
                                    ></text-input>
                </div>
                </template>
            </chat-bubble>
            <!-- CLICK, set form, position to 1 -->
            <!-- their name response -->
            <chat-bubble
             :gridClass="'right'"
             :responseClass="true"
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
            v-if="this.formPosition>0&&this.nameSet===true"
            >
                    <template v-slot:start>
                    <the-icons :name="'reg-reg'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <!-- Q: enter personmate -->
                       <chat-typer
                         @scroll="scrollToBottom(this.content)"
                        :scrollType="setScroll"
                        :chatString="this.nameFollowUp"
                        ></chat-typer>
                    </template>
                            <template v-slot:end-next>
                                <!-- form validation message -->
                            <chat-typer
                            v-if="personmateInvalid===true"
                                @scroll="scrollToBottom(this.content)"
                                :scrollType="setScroll"
                                :chatString="'Put some words in first, yeah?'"
                                ></chat-typer>
                    </template>
                      <template  v-slot:responses>
                                     <!-- chips - choose/enter personmate -->
                     <text-input
                     v-if="this.formPosition===1"
                                    @update:value="getPersonmate"
                                    :inputType="'short'"
                                    :examples="['flatmate', 'world leader', 'baked good', 'aunt']"
                                    :exampleType="'list'"
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
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                           <!-- Q: enter gripe -->
                          <chat-typer
                            @scroll="scrollToBottom(this.content)"
                            :scrollType="setScroll"
                            :chatString="this.personmateFollowUp"
                        ></chat-typer>
                    </template>
                      <template  v-slot:responses>
                          <!-- chips - choose gripe. Includes text input -->
                          <set-gripe
                            v-if="this.formPosition===2"
                            @update:gripe="getGripe"
                          ></set-gripe>
                    </template>
                    <template v-slot:end-next>
                                    <!-- Additional info: chat guidelines on custom gripe -->
                                    <chat-typer
                                        v-if="this.$store.state.customGripe===true&&this.formPosition>1"
                                        :chatString="this.pandaChats[3].stringTwo"
                                        @scroll="scrollToBottom(this.content)"
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
                v-if="this.formPosition>2">
                 <template v-slot:start>
                    <the-icons :name="'raccoon-shifty'"></the-icons>
                </template>

                <template v-slot:end>
                    <!-- Q: check sentence -->
                   <chat-typer
                   :chatString="sentenceToCheck"
                   @scroll="scrollToBottom(this.content)"
                    :scrollType="setScroll"
                   ></chat-typer>
                </template>

                <!-- Additional info - options to change -->
                <template v-slot:end-next
                v-if="choicesConfirmed===false&&this.formPosition>2"
                    >
                    <chat-typer
                   :chatString="this.pandaChats[4].string"
                   @scroll="scrollToBottom(this.content)"
                    :scrollType="setScroll"
                   ></chat-typer>
                </template>

                <template  v-slot:responses
                >
                <div>
                     <!-- chips - options to swap choices -->
                    <chat-response
                      v-if="choicesConfirmed===false&&this.formPosition===3"
                     :data="checkStrings"
                     :subtext="true"
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
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                            <!-- Q: get tone 1 -->
                        <chat-typer
                         @scroll="scrollToBottom(this.content)"
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
                v-if="this.formPosition>4">
                <template v-slot:end>
                    <p>{{ starterOneResponse }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

            <!-- emotional teaser step 2 -->
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
                         @scroll="scrollToBottom(this.content)"
                          :scrollType="setScroll"
                        :chatString="this.pandaChats[6].string"
                        ></chat-typer>
                        </div>
                    </template>
                       <template  v-slot:responses>
                    <emotional-teaser
                        :step="2"
                        @update:starters="getStarterTones"
                        v-if="this.formPosition===5">  
                    </emotional-teaser>
                </template>
            </chat-bubble>

            <!-- teaser 2 response -->
            <chat-bubble
                :gridClass="'right'"
                v-if="this.formPosition>5">
                <template v-slot:end>
                    <p>{{ starterTwoResponse }}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'profile'"></the-icons>
                </template>
            </chat-bubble>

            <!-- exit teaser -->
            <chat-bubble
                :gridClass="'left'"
             v-if="this.formPosition>5"
             >
                    <template v-slot:start>
                    <the-icons :name="'raccoon-disappointed'"></the-icons>
                    </template>
                    <template v-slot:end>
                        <div>
                        <chat-typer
                         :chatString="this.pandaChats[7].string"
                         @scroll="scrollToBottom(this.content)"
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
                         @scroll="scrollToBottom(this.content)"
                          :scrollType="setScroll"
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

    import { accessibility, earth, infinite, sad, ellipse, checkmarkCircle, closeCircle } from 'ionicons/icons'

    import SetPronouns from '../sections/components/form-components/SetPronouns.vue'
    // import SetPersonmate from '../sections/components/form-components/SetPersonmate.vue'
    import SetGripe from '../sections/components/form-components/SetGripe.vue'
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

    import { ref } from 'vue';

    export default {

        components: {
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
        //    console.log(this.msgContainer)
           this.content = this.msgContainer.parentElement
        //    console.log(this.content)
        },

        data() {
            return {

                editing: false,
                confirmedSet: false,

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
                    { text: 'sure', value: true, icon: checkmarkCircle},
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
            proTwo(){
            let pro
                    if(this.chosen.chosenPronoun==="we"){
                    
                        pro = 'our'
                    } else {
                  
                        pro = 'my'
                    }
                    return pro
            },

            sentenceToCheck(){ 
                let sentence = 
                `"${this.stringA} ${this.gripeFollowUp} ${this.stringC} ${this.stringD}" Does that make sense?`

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
                        response = `${this.proOne} will bravely pretend it never happened`
                        break;
                    case 'paggro':
                        response = `${this.proOne} will be leaving them a strongly worded post-it note.`
                        break;
                    case 'pirate':
                        response = `${this.proOne} best consult ${this.proTwo} parrot before taking any further action.`
                }
                return response
            }

         
        },

        methods: {

            async routin(shouldRoute){
                if(shouldRoute===true){
                    await this.confirmSet()
                    await this.checkStarters()

                    this.$router.push('/playground')
                }
            },

            swapChoices(choice){
                this.chosen.confirmResponse = choice

                if(choice==='none') {
                    this.choicesConfirmed=true
                    this.chosen.confirmResponseDemo = 'change nothing'
                    this.formPosition++
                } else if (choice==='all') {
                    this.formPositon=-1
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

                return choice
            },

            confirmChoices(response){
                    this.choicesConfirmed = response
                    this.chosen.confirmResponse = response

                            if(response===true){
                        this.chosen.confirmResponseDemo = 'sure'
                        } else if (response===false){
                            this.chosen.confirmResponseDemo = 'no, change something'
                        }

                    if(response===true){
                        this.editing=false
                       
                        this.formPosition++
                    }
            },
//tbc here on the scroll thing
            getElPosition(){
                let currentEl = this.$refs.el
                let rect = currentEl.getBoundingClientRect()
                // console.log(currentEl)
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

            getPersonmate(personmate) {
                if(!personmate){
                    this.personmateInvalid = true
                } else {
                this.chosen.chosenPersonmate = personmate;
                this.$store.state.chosenPersonmate = personmate;
                this.samplePersonmate = personmate + '.'
                this.stringD = `${this.proTwo} ${personmate}.`
                this.checkStrings[3].text = this.stringD

                if(this.editing===true&&this.chosen.confirmResponse==='personmate'){
                     this.choicesConfirmed=true
                    this.formPosition=3
                } else {
                    this.formPosition++;
                }
                }
        
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
                console.log(this.chosen.chosenGripe)
                await this.generateGripe()
                this.confirmedSet = true
                
                //* set custom prop to decide if we should show guidance text in custom input.
                //* really sloppy code, this bit should all be consolidated in one function
                const string = this.calcB(gripe)
                console.log('string is: ' + string)
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
                // console.log(this.$store.state.starterTones)
                // console.log(tone)
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
                return new Promise((resolve) => {
                        this.tempChosen = this.chosen;
                        // console.log(this.tempChosen)
                        this.setPronouns(this.chosen.chosenPronoun);

                        //* note that this also sets the temp signoff close caus i'm lazy
                        this.setTempOpen(this.tempOpens);
                        this.setGripe(this.chosen.chosenGripe);
                        this.setConsequence(this.consequences);
                        this.setPlea(this.pleas);
                        this.$store.state.baseOutput = this.output;
                        resolve()
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
</style>
