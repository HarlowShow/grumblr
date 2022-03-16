<template>
 <!-- add this back! v-if="this.rendered" -->
    <div class="snippetarea"
    >
       
            <transition name="fade">
            <p class="snippet"
            :class="classObject"
             v-if="changeMade===false">{{ snippet }}</p>
            </transition>

            <transition name="fade">
            <p class="snippet"
            :class="classObject"
             v-if="snippetOneActive===true&&changeMade===true">{{ activeSnippet }}</p>
            </transition>

            <transition name="fade">
            <p class="snippet"
            :class="classObject"
            v-if="snippetTwoActive===true&&changeMade===true">{{ activeSnippet }}</p>
            </transition>

    </div>
</template>

<script>
import { toRefs, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    
    props: ['snippet', 'value', 'name', 'index', 'addCount', 'subtractCount', 'initReset', 'tone'],

    setup(props) {
        const store = useStore()
        const { snippet } = toRefs(props)
        const snippetValue = snippet.value
        const snippetArray = [...snippetValue]
        // console.log(snippetValue)
        // console.log(snippetArray)
        const displayText = ref([])
        const optionLimit = snippetArray.length;
        const optionItem = 1;
        const moodcount = store.state.moodcount
        const total = ref(null)
        const vals = Object.values(moodcount)
        total.value = vals.reduce((prev, cur) => prev + cur)
        // const addKeys = ((obj) => Object.values(obj).reduce((a, b, c, d) => a + b + c + d))
        // total.value = addKeys(moodcount)
  
        // tbc here, need to sort the initreset thingy to get the accurate vals and all
        
        return {
            snippetValue,
            snippetArray,
            displayText,
            optionLimit,
            optionItem,
            moodcount,
            total,
            vals,
         
        }
    },

   mounted() {
        this.rendered=true
    },

    data() {
        return {
            toneClass: this.tone,
            active: false,
            nextSnippet: this.snippet,
            snippetOneActive: true,
            snippetTwoActive: false,
            swapsies: null,
            startStop: true,
            initPush: false,
            paused: false,
            stopped: false,
            changeMade: false,
            oldAddCount: 0,
            oldSubtractCount: 0,
            limit: 9,
            rendered: false,
        }
    },

    methods: {
            doing() {
            
            // console.log('snippet array is' + this.snippetArray)
            // console.log('display text is' + this.displayText)

            this.stopped = false;
                if (this.initPush === false) {
                        this.displayText.push(this.snippetArray[0]);
                        this.initPush = true
                    } else if (this.paused === true) {
                        this.startStop = true;
                        this.paused=!this.paused
                    }
                this.dostuff();
                
        },

        doOther() {
                // console.log('reached do other')
                // console.log('option item is' + this.optionItem)
                // console.log('option limit is' + this.optionLimit)
            if (this.optionItem < this.optionLimit) {
                // console.log('doing do other')
            // console.log('doing stuff:' + this.optionItem)
            this.displayText.push(this.snippetArray[this.optionItem])
            // console.log(this.displayText)
            this.optionItem++
            this.dostuff();
            } else {
            this.active = false
            }
        },

        dostuff() {
            if (this.startStop===true){
                    // console.log('dostuff: setting timeout')
                    setTimeout(()=> {
                        this.doOther();
                    }, 30);
            }
        },
        
        startAdd(newVal){

                this.snippetOneActive = !this.snippetOneActive
                this.snippetTwoActive = !this.snippetTwoActive
                this.active = true
                this.nextSnippet = newVal
                this.snippetArray = [...newVal]
                this.optionLimit = this.snippetArray.length
                this.doing()
        }
    },

    computed: {

        stateMoodcount(){
            return this.$store.state.moodcountTotal
        },

        classObject() {

            let selected = ''
            if (this.active===true) {
                selected = this.tone
            } else {
                selected ='default'
            }
            return selected
            
        },

        activeSnippet() {
            let arr = this.displayText.join("")
            return arr
        },

        add() {
            return this.$store.state.add
        },

         sub() {
            return this.$store.state.sub
        },

         oldAdd() {
            return this.$store.state.oldAdd
        },

         oldSub() {
            return this.$store.state.oldSub
        }
    },

        watch: {

        initReset(newValue) {
            this.swapsies = newValue;
        },
        snippet(newValue, oldValue) {

            this.changeMade = true;

            if(this.$store.state.replace===true) {
                this.displayText = [];
                this.optionItem = 0;
                this.startAdd(newValue, oldValue);
                } else {

                if(this.$store.state.add>this.$store.state.oldAdd) {
                    // console.log('SNIPPET WATCH: ADDED START')
                    if(this.displayText.length>0){
                        this.displayText = [];
                        this.optionLimit = 0
                        this.optionItem = 0
                    }
                    this.startAdd(newValue, oldValue);
                    this.$store.state.oldAdd++

                }

                if(this.$store.state.sub>this.$store.state.oldSub&&this.changeMade===true) {
                    // console.log('SNIPPET WATCH: REMOVE START')
                    this.displayText = [];
                    this.optionItem = 0;
                    this.startAdd(newValue, oldValue);
                    this.$store.state.oldSub++
                }
                }

        },

        stateTotal(newVal){
         
                   if(newVal===this.limit) {
                    this.$store.state.replace = true
                    } 
                    if (newVal < this.limit) {
                    this.$store.state.replace = false
                    }
              
        }
    },
}
</script>

<style scoped>

.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  color: grey;
  opacity: 0;
}

.snippetarea {
    display: inline
}

p {
    display: inline
}

.snippet {
    font-size: 1.5rem;
}

@media(max-width: 576px) {
         .snippet {
             font-size: 1rem;
         }
}

.angry {
    animation: angry-a 8s;
    /* color: var(--ion-color-angry); */
    }

 .polite {
    animation: polite-a 8s;
    }

.paggro {
    animation: paggro-a 8s;
    }

 .pirate {
    animation: pirate-a 8s;
    }

    @keyframes angry-a {
        0% { color: var(--ion-color-angry);}
        100% { color: black;}
    }

    @keyframes polite-a {
        0% { color: var(--ion-color-polite);}
        100% { color: black;}
    }

    @keyframes paggro-a {
        0% { color: var(--ion-color-paggro);}
        100% { color: black;}
    }

    @keyframes pirate-a {
        0% { color: var(--ion-color-pirate);}
        100% { color: black;}
    }
</style>
