<template>
    <ion-header class="ion-no-border ion-no-padding">
        <ion-toolbar class="ion-no-margin ion-no-padding" translucent>

            <ion-buttons  slot="end">
                <ion-button @click="closeModal">Close</ion-button>
            </ion-buttons>
             
        </ion-toolbar>
    </ion-header>
    <ion-content>
        
             <div v-if="isReady===true"
             class="chat-container">
                 <chat-bubble
                    v-for="chat, index in activeChatStrings"
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
                                :data="this.activeHelpOptions"
                                :noIcon="true"
                                @update:value="navigateHelp"
                                ></chat-response>
             </div>
          
    </ion-content>
</template>

<script>

import TheIcons from '../../sections/components/TheIcons.vue'
import ChatTyper from '../../sections/components/ChatTyper.vue'
import ChatBubble from '../../sections/components/ChatBubble.vue'
import ChatResponse from '../../sections/components/ChatResponse.vue'
import { IonContent, IonHeader, IonToolbar, IonButton, IonButtons, modalController } from '@ionic/vue';

import useChatInterface from '../../composables/chatinterface'
export default {
    components: {
        IonContent, 
        IonHeader, 
        // IonTitle, 
        IonToolbar,
        IonButtons,
        IonButton,
        ChatTyper,
        ChatBubble,
        ChatResponse,
        TheIcons
    },

    setup(){
        const chatObj = useChatInterface()
        const GuideClass = chatObj.GuideText
        const pushString = GuideClass.prototype.pushString
        const fuIdx = GuideClass.prototype.followUpIndex
    
        const exampleHelpText = [

        new GuideClass(
        'openHelp', 
        'help',
        'How can I help?',
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
        [
            { text: "you can't", value: 'none'},
            { text: "this bit hasn't been built yet", value: 'none'},
            { text: "sosad", value: 'none'}
        ],
        //* starters - used for reset
        // [
        //     { text: 'I found a bug', value: 'bug'},
        //     { text: "How do I get in contact?", value: 'contact'}
        // ],
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
    // console.log('long setup var name' + exampleNextHelpOptions)
    const isReady = helpTextObject.ready
    isReady.value = true

        return {
            exampleHelpText,
            exampleNextHelpOptions,
            helpTextObject,
            activeHelpOptions: helpTextObject.activeHelpOptions,
            helpText: helpTextObject.helpText,
            firstHelpText: helpTextObject.firstHelpText,
            activeChatStrings: helpTextObject.activeChatStrings,
            firstHelpOption: helpTextObject.firstHelpOption,
            nextHelpOptions: helpTextObject.nextHelpOptions,
            activeHelpIndex: helpTextObject.activeHelpIndex,
            pushString,
            isReady,
            fuIdx
            // pushString: helpTextObject.pushString,
            // cancelFinish: helpTextObject.cancelFinish,
            // openModal: helpTextObject.openModal,
        }
    },

    mounted(){
        // console.log(this.firstHelpText)
        this.activeChatStrings.push(
                        {
                            string: this.firstHelpText.string,
                            icon: 'reg-reg',
                            nextObj: 'starter',
                            nextInner: 'two'
                        }
        )
    },

    methods: {
        async closeModal(){
             await modalController.dismiss()
        },

         navigateHelp(chosenval){
            
            //find action and do the corresponding method
            const actions = this.exampleHelpText.filter((opt) => opt.responseTo===chosenval)
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
    }
}
</script>

<style scoped>
ion-toolbar {
    --background: transparent !important;
    --ion-background-color: none !important;
    min-height: 1rem !important;
    height: auto;
}

ion-header {
    --background: transparent;
}

.chat-container {
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>