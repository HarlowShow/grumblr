<template>
    <div v-if="words">
    <h3>Typewriter text effect</h3>
    <span>
        the text array is: {{ textArray }}
        <span class="cursor">|</span>
    </span>
    <ion-button @click="stopType">Stop type effect</ion-button>
    <ion-button @click="doing">Start Typing</ion-button>
    <ion-button @click="deleteType">Delete Typing</ion-button>
    </div>
</template>

<script>

import { toRefs, ref } from 'vue'
import { IonButton } from '@ionic/vue';
// could add it as 'word' - try to do a single string?
export default {
    props: {
    speed: {
      type: Number,
      default: 100,
    },
    deleteSpeed: {
      type: Number,
      default: 30,
    },
    nextWordInterval: {
      type: Number,
      default: 1200
    },
    words: {
      type: Array,
      default: () => [],
    },
  },

components: { IonButton },

setup(props) {
  const { words } = toRefs(props)
    const  wordIdx = 0;
    const wordValue = words.value
    const currentWord = wordValue[wordIdx].split('')
    const displayText = ref([])
    const optionLimit = currentWord.length;
    const optionItem = 1;
  return {
      wordValue,
      currentWord,
      displayText,
      optionLimit,
      optionItem,
  }
},

  data() {
    return {
      startStop: true,
      initPush: false,
      paused: false,
      stopped: false,
    }
  },
  
  methods: {

    doing() {
        
        this.stopped = false;
             if (this.initPush === false) {
                    this.displayText.push(this.currentWord[0]);
                    this.initPush = true
                    // console.log('this.initPush is' + this.initPush)
                } else if (this.paused === true) {
                    this.startStop = true;
                    this.paused=!this.paused
                }
            this.dostuff('started doing something');
            
    },

     doOther() {
        if (this.optionItem < this.optionLimit) {
        // console.log('doing stuff:' + this.optionItem)
        this.displayText.push(this.currentWord[this.optionItem])
        // console.log(this.displayText)
        this.optionItem++
        this.dostuff();
        }
    },

    dostuff(started) {
        if (this.startStop===true){
                setTimeout(()=> {
                    this.doOther(started);
                }, 100);
        }
    },

    stopType() {
            if (this.stopped === true) {
                // console.log('nah m8')
            } else {
            this.startStop=!this.startStop
            this.paused=!this.paused
            this.stopped = true;
            }
        },

    deleting() {
        this.displayText.pop()
        this.optionItem--
        // console.log('display text is' + this.displayText)
        this.deleteType()
    },

     deleteType() {
        // console.log('clicked')
        // console.log(this.optionItem)
        if(this.optionItem>0) {
            // console.log('deleting')

            setTimeout(()=> {
                    this.deleting();
                }, 100);
        }
    }

  },
    computed: {

        textArray() {
            let arr = this.displayText.join("")
            return arr
        }
    }
}
</script>

<style scoped>
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}

.cursor {
  display: inline-block;
  margin-left: -3px;
  animation: blink-animation 1s steps(2, start) infinite;
}
</style>