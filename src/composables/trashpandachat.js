import { ref, reactive, computed} from 'vue'
import { useStore } from 'vuex'

export default function speakTrashPanda(startingIdx = 0) {

    const store = useStore()
    const activePronouns = {...store.state.chosenPronouns};
    const activePersonmate = store.state.chosenPersonmate;
    const activeGripe = store.state.chosenGripe;
    const name = ref('')
    const chatName = ref('')
    name.value = store.state.chosenName

    if(store.state.chosenName==='mate'){
        chatName.value = ` your ${activePersonmate}`
    } else {
        chatName.value = store.state.chosenName
    }

    let nameVal = ''

    if(name.value==='nothing in particular'){
        nameVal = 'What happened then?'
    } else {
        nameVal = `What did ${name.value} do then?`
    }

    const nameFollowUp = computed(function() {
        let sentence = ''
        let nameChoice = store.state.chosenName
        if(store.state.nameIsDefault===true){
            sentence = 'Mysterious. And what\'s their relationship to you?'
        } else {
            sentence = `I see. And what's ${nameChoice}'s relationship to you?`
        }
        return sentence
    })

    const personmateFollowUp = computed(function() {
        let sentence = ''
        let personmate = store.state.chosenPersonmate
        if(personmate) {
            sentence = `Oh dear. What did this ${personmate} do then?`
        } else {
            sentence = 'Oh dear. What did they do?'
        }
        return sentence
    })

    const gripeFollowUp = computed(function() {
        let sentence = ''
        let gripe = store.state.chosenGripe
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
    })  

    const nameString = nameVal
    const chatIdx = ref(startingIdx)
    const formChats = ref([
        { 
        string: "Are you ready to grumble?",
        stringTwo: "I see. And what's their relationship to you?",
        idx: 0},
        { string: 'Ok. Who - or what - should we grumble about?', stringTwo: 'I see'},
        { string: 'I see. Who did this then?', type: 'formQ', idx: 1},
        { string: '',
        stringTwo: "try to follow the examples and avoid unnecessary punctuation",
        type: 'formQ', idx: 2},
        { string: 'Which bit should we change?'},
        { string: 'Last bit... how do you feel about this?', type: 'formQ'},
        { string: "And what are you gonna do about it?", type: 'formQ'},
        { string: "I can work with this. How's about I whip ya' up a little sump'n sump'n?", type: 'formQ'},
        { string: "Too bad schmucko! I didn't build in a back button yet. Here we go!", type: 'response'},
        { string: "Who - or what - should we grumble about?", stringTwo: ''},
        { string: "Which bit do you want to change?", type: 'response'},
        
    ])
    const chatLength = formChats.value.length
    const currentChat = ref(formChats.value[chatIdx.value])
    const currentString = ref(currentChat.value.string)

    const backtalkChats = reactive({

        starter: {
            one: "Use the buttons to fine-tune things.",
            two: 'Ooh. The second starter chat string'
        },

        medium: {
            angry: 'Oh my.',
            polite: 'That\'s nice...',
            paggro: 'I\'m sensing a spot of unresolved tension',
            pirate: 'Yaarrrrrrrggggghhhh?',
        },

        high: {
            angry: 'Have you tried taking a few deep breaths?',
            polite: 'That\'s right, you need to take a defiant stand. Set clear boundaries. Just like that.',
            paggro: 'Oh no you DIDN\'T',
            pirate: 'It seems like you\re returning to your authentic self. Will things ever be the same again?',
        },

        max: {
            angry: `I know it's been a rough time, but I'm not sure that ${chatName.value} deserves THIS...`,
            polite: 'Well you sure told them.',
            paggro: 'It\'s ok. Everything will be ok.',
            pirate: 'YAAAAARRRRRRGGGGGGHHHHHHHHHHHHHH.',
        },

        confused: {
            one: `Are we sending ${chatName.value} mixed messages? We might be sending ${chatName.value} mixed messages.`,
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
        chatName,
        activePersonmate,
        activePronouns,
        activeGripe,
        nameFollowUp,
        personmateFollowUp,
        gripeFollowUp,
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