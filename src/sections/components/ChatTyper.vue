<template>
        <slot></slot>
        <p>{{ displayText }}</p>
</template>

<script>
// import { ref, reactive, computed, watch } from 'vue';

import useTypewriter from '../../composables/typewriter'
// import speakTrashPanda from '../../composables/trashpandachat'

import { ref, onMounted } from 'vue'

export default {

   props: {

       chatString: {
           type: String,
           required: true,
       }
   },

    setup(props) {
    
        const chosenString = ref(props.chatString)
        const chosenMode = ref('static')
        const typewriterEl = useTypewriter(chosenString, chosenMode)
        // const trashpandaChat = speakTrashPanda(startingIdx)


        // const allChats = trashpandaChat.chats
        // console.log(allChats)
        // console.log(allChats.value)
        // const chosenChat = allChats.value.find(obj => obj.idx === startingIdx.value)
        // console.log('chosen chat is: ' + chosenChat)

        console.log(typewriterEl)

            onMounted(() => {
            console.log('mounted')
            })

        return {
            // trashpandaChat,
            // chatOptions,
            // chosenChats,
           
            // nextChat: trashpandaChat.nextChat,
            // currentString: trashpandaChat.currentString,
            // chats: trashpandaChat.chats,
            typewriterEl,
            chosenMode: chosenMode.value,
            chosenString: chosenString.value,
            dText: typewriterEl.dText,
            speeds: typewriterEl.speeds,
            slowString: typewriterEl.slowString,
            displayText: typewriterEl.displayText,
            addString: typewriterEl.addString,
            emote: typewriterEl.emote,
            length: typewriterEl.length,
            placeholderOptions: typewriterEl.placeholderOptions,
            characters: typewriterEl.characters,
            idx: typewriterEl.idx,
            chosenSpeed: ref(500),
            placeholderLength: typewriterEl.placeholderLength,
            status: typewriterEl.status,
            typingControl: typewriterEl.typingControl,
            tracking: typewriterEl.tracking,
            startPush: typewriterEl.startPush,
            pushLetter: typewriterEl.pushLetter,
            pullLetter: typewriterEl.pullLetter,
            
            doNext: typewriterEl.doNext,
            resetPlaceholders: typewriterEl.resetPlaceholders,
        }

    },

    mounted(){
        this.startPush(this.chosenString)
    }

}
</script>