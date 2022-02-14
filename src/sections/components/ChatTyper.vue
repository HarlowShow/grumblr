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

import { ref, watch} from 'vue'

export default {

   props: {

       chatString: {
           type: String,
           required: true,
       },

       mode: {
           type: String,
           required: false,
       },

       scrollType: {
           type: String,
           required: false
       }
   },

    setup(props, context) {

    
        const chosenString = ref(props.chatString)
        const chosenMode = ref(props.mode)
        const typewriterEl = useTypewriter(chosenString, chosenMode)
        const isFinished = typewriterEl.isFinished

        //scroll emit
          watch(isFinished, function(newVal){
            //   console.log('new val is: ' + newVal)
            if(newVal===true&&!props.scrollType) {
                // console.log('chat typer emitted')
                context.emit('scroll')
            }
        })

        // console.log(typewriterEl)

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
            typingControl: typewriterEl.typingControl,
            tracking: typewriterEl.tracking,
            isFinished,
            startPush: typewriterEl.startPush,
            pushLetter: typewriterEl.pushLetter,
            pullLetter: typewriterEl.pullLetter,
            finishTyping: typewriterEl.finishTyping,
            
            doNext: typewriterEl.doNext,
            resetPlaceholders: typewriterEl.resetPlaceholders,
        }

    },

    emits: ['scroll'],


    mounted(){
        this.startPush(this.chosenString)
        // console.log('is finished: ' + this.isFinished)
        if(this.scrollType==='instant') {
            this.$emit('scroll')
            // this isn't hooked up yet, come back to it
            // console.log('instant scroll emitted!')
        }
    },

    watch: {

        chatString(newVal){
            // console.log('backchat changed in chat typer component')
            this.chosenString = newVal
            this.startPush(this.chosenString)
        }
    }
}
</script>

<style scoped>
.typechat  {
    height: 100%;
    width: 100%;
}
</style>