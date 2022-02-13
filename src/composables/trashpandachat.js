import { ref } from 'vue'

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

    function nextChat() {
        let length = formChats.value.length
        let limit = length - 1;
        if(limit>chatIdx.value) {
        currentChat.value = formChats.value[chatIdx.value]
        currentString.value = currentChat.value.string
        // console.log('current string is ' + currentString.value)
        console.log('length is: ' + length)
        console.log('idx is: ' + chatIdx.value)
        chatIdx.value++
        } else {
            //reset index
            console.log('index reset')
            chatIdx.value = 0;
            nextChat()
        }
    }

    return {
       
        currentChat,
        chatLength,
        currentString,
        chatIdx,
        formChats,
        length,
        nextChat,
    }
}