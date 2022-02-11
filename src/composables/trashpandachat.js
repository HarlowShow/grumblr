import { ref } from 'vue'

export default function speakTrashPanda(startingIdx = 0) {

    const chatIdx = ref(startingIdx)
    const chats = ref([
        { 
        string: 'How many of you schmuckos have a complaint today?',
        stringTwo: 'I see. Who did this then?',
        type: 'formQ',
        idx: 0},
        { string: 'I see. Who did this then?', type: 'formQ', idx: 1},
        { string: 'Aw naw mate. What did this bugger do then?',type: 'formQ', idx: 2}
    ])
    const chatLength = chats.value.length
    const currentChat = ref(chats.value[chatIdx.value])
    const currentString = ref(currentChat.value.string)

    function nextChat() {
        let length = chats.value.length
        let limit = length - 1;
        if(limit>chatIdx.value) {
        currentChat.value = chats.value[chatIdx.value]
        currentString.value = currentChat.value.string
        console.log('current string is ' + currentString.value)
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
        chats,
        length,
        nextChat,
    }
}