<template>
        <slot></slot>
        <div 
        class="typechat"
        @click="finishTyping">  
        <p>{{ displayText }}</p></div>
      
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
       },

       mode: {
           type: String,
           required: false,
       }
   },

    setup(props) {
    
        const chosenString = ref(props.chatString)
        const chosenMode = ref(props.mode)
        const typewriterEl = useTypewriter(chosenString, chosenMode)

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
            finishTyping: typewriterEl.finishTyping,
            
            doNext: typewriterEl.doNext,
            resetPlaceholders: typewriterEl.resetPlaceholders,
        }

    },

    mounted(){
        this.startPush(this.chosenString)
    },

}
</script>

<style scoped>
.typechat  {
    height: 100%;
    width: 100%;
}
</style>