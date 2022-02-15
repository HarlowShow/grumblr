import { ref, reactive} from 'vue'

export default function speakTrashPanda(startingIdx = 0) {

    const chatIdx = ref(startingIdx)
    const formChats = ref([
        { 
        string: 'How many of you schmuckos have a complaint today?',
        stringTwo: 'I see. Who did this then?',
        type: 'formQ',
        idx: 0},
        { string: 'I see. Who did this then?', type: 'formQ', idx: 1},
        { string: 'Aw naw mate. What did this bugger do then?',type: 'formQ', idx: 2},
        { string: 'Yikes. And how do you feel about that?', type: 'formQ'},
        { string: "Blimey. But whatcha gonna do about it??", type: 'formQ'},
        { string: "Aw yeah I can work with this. How's about I whip ya' up a little sump'n sump'n?", type: 'formQ'},
        { string: "Too bad schmucko! I didn't build in a back button yet. Here we go!", type: 'response'}
    ])
    const chatLength = formChats.value.length
    const currentChat = ref(formChats.value[chatIdx.value])
    const currentString = ref(currentChat.value.string)

    const backtalkChats = reactive({

        starter: {
            one: 'welcome to this exciting time with default one',
            two: 'default two! It is here for you'
        },

        medium: {
            angry: 'you just got medium angry',
            polite: 'you just got medium polite',
            paggro: 'you just got medium paggro',
            pirate: 'you just got medium pirate',
        },

        max: {
            angry: 'you just got max angry',
            polite: 'you just got max polite',
            paggro: 'you just got max paggro',
            pirate: 'you just got max pirate',
        },

        confused: {
            one: 'I am confused',
            two: 'I am confused number two'
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