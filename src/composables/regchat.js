import { ref, reactive, computed} from 'vue'
import { useStore } from 'vuex'

export default function speakReg(startingIdx = 0) {

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
            sentence = `${nameChoice}? Oh dear. What's their relationship to you?`
        }
        return sentence
    })

    const personmateFollowUp = computed(function() {
        let sentence = ''
        let personmate = store.state.chosenPersonmate
        let article = store.state.personmateArticle
        if(personmate) {
            sentence = `Somehow it's always ${article} ${personmate}... What have they done this time?`
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
        { string: 'Who should we grumble about?', stringTwo: 'I see'},
        { string: 'I see. Who did this then?', type: 'formQ', idx: 1},
        { string: '',
        stringTwo: "Try to follow the same format as the examples. You don't need to write a complete sentence or use a full stop.",
        type: 'formQ', idx: 2},
        { string: 'Which bit should we change?'},
        { string: 'Finally, how does all this make you feel?', type: 'formQ'},
        { string: "And what are you gonna do about it?", type: 'formQ'},
        { string: "I can work with this. ", type: 'formQ'},
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
            // two: 'TBC',
        },


    })
    const backtalkChat = ref(backtalkChats.starter.one)

    const setChat = ((objKey = '', innerKey = '') => {

        let newChat = backtalkChats[objKey]
        let newChatString = newChat[innerKey]
        return newChatString
    })

    function nextChat() {
        let length = formChats.value.length
        let limit = length - 1;
        if(limit>chatIdx.value) {
        currentChat.value = formChats.value[chatIdx.value]
        currentString.value = currentChat.value.string
        chatIdx.value++
        } else {
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