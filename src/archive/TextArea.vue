<template>
    <h5> Type text is {{ typeText }}</h5>
     <h5> {{ output.op0 }}
         {{ output.op1 }}
         {{ output.op2 }}
         {{ output.of0 }}
         {{ output.of1 }}
         {{ output.of2 }}
         {{ output.co0 }}
         {{ output.co1 }}
         {{ output.co2 }}
         {{ output.pl0 }}
         {{ output.pl1 }}
         {{ output.pl2 }}
    </h5>

    <span>
        the text array is: {{ textArray }}
        <span class="cursor">|</span>
    </span>
    <ion-button @click="stopType">Stop type effect</ion-button>
    <ion-button @click="doing">Start Typing</ion-button>
    <ion-button @click="deleteType">Delete Typing</ion-button>

</template>

<script>
import { toRefs, ref } from 'vue';
import { IonButton } from '@ionic/vue';


export default {

    components: { IonButton },

    props: {
        words: {
        type: Array,
        default: () => [],
        },
        newText: {
        type: Array,
        default: () => [],
        }
    },

    setup(props) {
        const { words } = toRefs(props)
        const { newText } = toRefs(props)
        const  wordIdx = 0;
        const wordValue = words.value
        const currentWord = wordValue[wordIdx].split('')
        const displayText = ref([])
        const optionLimit = currentWord.length;
        const optionItem = 1;
        const typeText = newText.value
        const currentText = typeText[wordIdx].split('')
        return {
            wordValue,
            currentWord,
            displayText,
            optionLimit,
            optionItem,
            typeText,
            currentText
        }
    },

    emits: ['update:typeadd'],

  data() {
        return {
        startStop: true,
        initPush: false,
        paused: false,
        stopped: false,
        toType: '',
        typeArray: [],
        newLimit: 5
        }
    },
  
  methods: {

        doing() {
        
        this.stopped = false;
             if (this.initPush === false) {
                    this.displayText.push(this.typeArray[0]);
                    this.initPush = true
                    // console.log('this.initPush is' + this.initPush)
                } else if (this.paused === true) {
                    this.startStop = true;
                    this.paused=!this.paused
                }
            this.dostuff('started doing something');
            
        },

     doOther() {
            if (this.optionItem < this.newLimit) {
            // console.log('doing stuff:' + this.optionItem)
            this.displayText.push(this.typeArray[this.optionItem])
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
        },

        output() {
            return this.$store.state.baseOutput;
        }
    },

    watch: {
        newText() {
         
            this.typeText = this.newText

                this.toType = this.newText[0]
                // this.typeArray = this.toType[this.wordIdx].split('')
        
               this.typeArray = [...this.toType]
               this.newLimit=this.typeArray.length
        },

    }

}
</script>

<style scoped>
    h5 {
        color: red;
    }
</style>