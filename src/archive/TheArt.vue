<template>
<base-layout>
<div>
    <h3>actually more testing stuff</h3>
    <button @click="checkStuff">click to show stuff</button>
    <div v-if="toggleShow===true">
        <p>{{ nextHelpOptions }}</p>
    </div>
    <div>active chat strings {{ activeChatStrings }}</div>
    <div>
        <button v-for="(option, index) in activeHelpOptions"
        :key="index"
        @click="navHelp(option.value)">
        {{ option.text }}</button>
    </div>
   
</div>
</base-layout>
</template>

<script>
import useChatInterface from '../composables/chatinterface.js'

export default {
    setup(){

        const chatObj = useChatInterface()
        const GuideClass = chatObj.GuideText
        const pushString = GuideClass.prototype.pushString
        const fuIdx = GuideClass.prototype.followUpIndex
    
        const exampleHelpText = [

        new GuideClass(
        'openHelp', 
        'help',
        'Click on the buttons under your grumble to change the text.',
        1,
        true,
        true,
        false,
        false
        ),

        new GuideClass(  
        'finishGrumble',
        'finish',
        'Are you sure?',
        2,
        false,
        true,
        false,
        false
        ),

        new GuideClass(  
        'finishGrumbleConfirm',
        'finish confirm',
        null,
        null,
        false,
        false,
        false,
        true,
        '/finish'
        ),

        new GuideClass(   
        'cancelFinish',
        'cancel finish',
        'gotcha',
        0,
        false,
        true,
        false
        ),

        new GuideClass(   
        'openHelp',
        'more help',
        'let me help you more!',
        null,
        false,
        true,
        true
        )
    ]

        const exampleNextHelpOptions = [
        //* starters - used for reset
        [
            { text: 'help me', value: 'help'},
            { text: "I'm done grumbling", value: 'finish'}
        ],
        [
            //* open modal
            { text: 'I need more help', value: 'more help'},
            { text: "I'm done grumbling", value: 'finish'}
        ],
        [
            { text: 'yes', value: 'finish confirm'},
            { text: 'no', value: 'cancel finish'},
        ]
    ]

    const helpTextObject = useChatInterface(exampleHelpText, exampleNextHelpOptions)
    console.log('long setup var name' + exampleNextHelpOptions)

        return {
            exampleHelpText,
            exampleNextHelpOptions,
            helpTextObject,
            activeHelpOptions: helpTextObject.activeHelpOptions,
            helpText: helpTextObject.helpText,
            activeChatStrings: helpTextObject.activeChatStrings,
            nextHelpOptions: helpTextObject.nextHelpOptions,
            activeHelpIndex: helpTextObject.activeHelpIndex,
            pushString,
            fuIdx
            // pushString: helpTextObject.pushString,
            // cancelFinish: helpTextObject.cancelFinish,
            // openModal: helpTextObject.openModal,
        }
    },

    methods: {
        checkStuff(){
            this.toggleShow=!this.toggleShow
        },

        navHelp(chosenval){
            
            //find action and do the corresponding method
            console.log(chosenval)
            console.log(this.exampleHelpText)
            const actions = this.exampleHelpText.filter((opt) => opt.responseTo===chosenval)
                console.log(actions)
                if(actions.length>0){
                let action = actions[0]

                if(action.stringMethod===true){
                    action.pushString(action.followUpIndex, action.log)
                    this.activeChatStrings.push(
                        {
                            string: action.string,
                            icon: 'reg-reg',
                            nextObj: 'starter',
                            nextInner: 'two'
                        }
                    )
                } else if (action.actionMethod===true){
                    switch(action.name){
                        case 'cancelFinish':
                        action.cancelFinish()
                        break;
                        case 'openHelp':
                        action.openHelp()
                        break;
                    }
                   
                } else if (action.routeMethod){
                    this.$router.push(action.routeMethod)
                }
            }
        },
    },

    data(){

        return {
            toggleShow: false,
        }
    }
}
</script>