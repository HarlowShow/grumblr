<template>

    <div class="snippetarea"
        v-if="count===true">
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
        <br v-if="index===11">

</template>

<script>
import { toRefs, ref } from 'vue'
export default {
    
    props: ['snippet', 'value', 'name', 'index', 'addCount', 'subtractCount'],
    emits: ['transitioned'],
    setup(props) {
        // console.log('index is: ' + props.index)
        const { snippet } = toRefs(props)
        const idx = ref(0)
        idx.value = props.index*150
        const snippetValue = snippet.value
        const snippetArray = [...snippetValue]
        // console.log(snippetValue)
        // console.log(snippetArray)
        const displayText = ref([])
        const optionLimit = snippetArray.length;
        const optionItem = 0;
        const count = ref(false)
        
        return {
            snippetValue,
            snippetArray,
            displayText,
            optionLimit,
            optionItem,
            count,
            idx,

        }
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
            isSub: false,
            currentTone: 'default',
        }
    },

    mounted(){
        if(this.optionLimit===0){
             this.count = true
            //  console.log('initially empty snippet')
        } else {
            setTimeout(() => {
                this.count = true
                // console.log('idx is: ' + this.idx)
                if(this.index===12){
                    setTimeout(() => {
                        this.$emit('transitioned')
                    }, 500)
                    
                }
            }, this.idx)
        }
    },
    methods: {
            doing() {
            
            // console.log('snippet array is' + this.snippetArray)
            // console.log('display text is' + this.displayText)
            //? honestly not sure if any of this matters
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
            // console.log('pushed text at: ' + this.optionItem)
            this.optionItem++
            this.dostuff();
            } else {
            // console.log('no more stuff to do already reached:' + this.optionItem)
            this.active = false
            }
        },
        dostuff() {
                    setTimeout(()=> {
                        this.doOther();
                    }, 40);
        },

        wait(){
            return new Promise ((resolve) => {
                if(this.active===false){
                    resolve('snippet ready')
                }
            })
        },
        
        async startAdd(newVal){
                //! set it here so that if a snippet is being added another process can't start yet
                try {

                await this.wait()
            
                this.active=true
                // console.log(checkStatus)
              
                //* set active p to use to allow reloading
                this.snippetOneActive = !this.snippetOneActive
                this.snippetTwoActive = !this.snippetTwoActive
               
                // console.log('snippet class object is: ' + this.classObject)
               

                //* set new snippet array and option limit (determines no. of characters to push)
                this.nextSnippet = newVal;
                this.snippetArray = [...newVal]
                this.optionLimit = this.snippetArray.length
                this.doing()
                } catch(e) {
                    // console.log(e)
                }
            
        }
    },
    watch: {

        snippet(newValue, oldValue) {
            // * change made var for tracking init change from default to showing non default snippets
            // * only important for first change made
            this.changeMade = true;
          
                if(this.$store.state.add>this.$store.state.oldAdd) {
                    // console.log('SNIPPET WATCH: ADDED START')
                    if(this.displayText.length>0){
                        this.displayText = [];
                        this.optionLimit = 0
                        this.optionItem = -1
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
        },
    },
    computed: {
        classObject() {
            let selected = ''
            if (this.active===true) {
                selected = this.$store.state.classTone
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
}
</script>

<style scoped>
.fade-leave-active,
.fade-enter-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  color: grey;
  opacity: 0;
}
.snippetarea {
    display: inline;
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