import { ref, reactive} from 'vue'
import { useStore } from 'vuex'

export default function speakTrashPanda(startingIdx = 0) {

    const store = useStore()
    const name = store.state.chosenName
    let nameVal = ''

    if(name==='nothing in particular'){
        nameVal = 'What happened then?'
    } else {
        nameVal = `What did ${name} do then?`
    }

    const nameString = nameVal
    const chatIdx = ref(startingIdx)
    const formChats = ref([
        { 
        string: 'Who needs to rant?',
        stringTwo: "I see. And what's their relationship to you?",
        type: 'formQ',
        idx: 0},
        { string: 'I see. Who did this then?', type: 'formQ', idx: 1},
        { string: `${nameString}`,
        stringTwo: "try to follow the examples and avoid unnecessary punctuation",
        type: 'formQ', idx: 2},
        { string: 'And how do you feel about this?', type: 'formQ'},
        { string: "Blimey. But whatcha gonna do about it??", type: 'formQ'},
        { string: "Aw yeah I can work with this. How's about I whip ya' up a little sump'n sump'n?", type: 'formQ'},
        { string: "Too bad schmucko! I didn't build in a back button yet. Here we go!", type: 'response'},
        { string: "What's their name?", type: 'formQ'},
        { string: "Which bit do you want to change?", type: 'response'},
        { string: 'What are we ranting about?'}
    ])
    const chatLength = formChats.value.length
    const currentChat = ref(formChats.value[chatIdx.value])
    const currentString = ref(currentChat.value.string)

    const backtalkChats = reactive({

        starter: {
            one: "Here you go. Use the buttons or sliders to change your rant.",
            two: 'default two! It is here for you'
        },

        medium: {
            angry: 'FEEL THE RAAAAAAAGEEE',
            polite: 'you just got medium polite',
            paggro: 'you just got medium paggro',
            pirate: 'you just got medium pirate',
        },

        max: {
            angry: 'Blimey. Have you tried taking a few deep breaths?',
            polite: 'you just got max polite',
            paggro: 'you just got max paggro',
            pirate: 'you just got max pirate',
        },

        confused: {
            one: 'I am confused',
            two: "Everything's going to be alright"
        },

        alerts: {
            moodTotalReached: 'whoa there, your mood total is reached!'
        }

    })
    const backtalkChat = ref(backtalkChats.starter.one)

    const setChat = ((objKey = '', innerKey = '') => {

        // console.log('objKey is: ' + objKey)
        // console.log('inner key is: ' + innerKey)
        // console.log('backtalkChats starter one is: ' + backtalkChats.starter.one)
        let newChat = backtalkChats[objKey]
        let newChatString = newChat[innerKey]
    
        // console.log('new chat string is: ' + newChatString)
        return newChatString
        // console.log('new chat string is: ' + newChatString.value)
    })

    function nextChat() {
        let length = formChats.value.length
        let limit = length - 1;
        if(limit>chatIdx.value) {
        currentChat.value = formChats.value[chatIdx.value]
        currentString.value = currentChat.value.string
        // console.log('current string is ' + currentString.value)
        // console.log('length is: ' + length)
        // console.log('idx is: ' + chatIdx.value)
        chatIdx.value++
        } else {
            //reset index
            // console.log('index reset')
            chatIdx.value = 0;
            nextChat()
        }
    }

    return {
        
        backtalkChat,
        backtalkChats,
        nameString,
        name,

        currentChat,
        chatLength,
        currentString,
        chatIdx,
        formChats,
        length,
        setChat,
        nextChat,
    }
}