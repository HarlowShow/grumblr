import { ref } from 'vue'
import { modalController } from '@ionic/vue'
import TheSideModal from '../components/base/TheSideModal.vue'

export default function useHelpText() {

    const activeChatStrings = ref([])
    const activeHelpIndex = ref(0)

    const activeHelpOptions = ref([
        { text: 'help me', value: 'more help'},
        { text: "I'm done grumbling", value: 'finish'}
    ])

    const nextHelpOptions = [
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

    //* options for what happens after the chip
    //* the 'responseTo' should match the value of the chip clicked

    //properties:
    //* name - not used atm.
    //* responseTo - matches value of chip clicked, used for finding relevant object
    //* string - the string to push to chat, if there is one
    //* followUpIndex - if response requires extra help, determines which array from nextHelpOptions becomes new response chips
    //* stringMethod - currently pushing next response object in
    //* actionMethod - for something else, like opening the modal. may not be needed
    const playgroundHelpText = [


        {   
            name: 'openHelp',
            responseTo: 'help',
            string: 'Click on the buttons under your grumble to change the text.',
            followUpIndex: 1,
            stringMethod: function pushString(){
                let next = nextHelpOptions[this.followUpIndex]
                activeHelpOptions.value = [...next]
                activeHelpIndex.value = this.followUpIndex
            },
            
        },

        {   
            name: 'finishGrumble',
            responseTo: 'finish',
            string: 'Are you sure?',
            followUpIndex: 2,
            stringMethod: function pushConfirmString(){
                let next = nextHelpOptions[this.followUpIndex]
                activeHelpOptions.value = [...next]
                //* no setting help index for intermediate step
            },
        },

        {   
            name: 'finishGrumbleConfirm',
            responseTo: 'finish confirm',
            routeMethod: '/finish'
        },

        {   
            name: 'cancelFinish',
            responseTo: 'cancel finish',
            string: 'gotcha',
            stringMethod: function cancelFinish(){
                let idx = activeHelpIndex.value
                let next = nextHelpOptions[idx]
                activeHelpOptions.value = [...next]

                // let next = nextHelpOptions[activeHelpIndex.value]
                // activeHelpOptions.value = [...next]
                //* send them back to the part of the help options they were previously on
                // activeHelpIndex.value = this.followUpIndex
            },
        },

        {   
            name: 'openHelp',
            responseTo: 'more help',
            string: 'let me help you more!',

            actionMethod: async function openModal() {
                const modal = await modalController.create({
                  component: TheSideModal,
                  cssClass: 'my-custom-class',
                //   componentProps: {
                //     title: 'New Title',
                //   },
            });
                return modal.present();
            }  
        },
    ]

    return {
        activeHelpOptions,
        playgroundHelpText,
        activeChatStrings,
        activeHelpIndex: activeHelpIndex.value
    }
}