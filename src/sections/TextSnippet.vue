<template>
<!-- <p> add count: {{ add }}, {{ oldAdd }}</p>
<p> sub count: {{ sub }}, {{ oldSub }}</p> -->
    <div class="snippetarea">
            <transition name="fade">
            <p class="snippet" v-if="changeMade===false">{{ snippet }}</p>
            </transition>

            <transition name="fade">
            <p class="snippet" v-if="snippetOneActive===true&&changeMade===true">{{ activeSnippet }}</p>
            </transition>
    <!-- <p>og snippet: {{ ogSnippet }}</p> -->

            <transition name="fade">
                <p class="snippet" v-if="snippetTwoActive===true&&changeMade===true">{{ activeSnippet }}</p>
            </transition>

    <!-- <p> value {{ value }}</p>
    <p> name {{ name }}</p>
    <p> index {{ index }}</p> -->
    </div>
</template>

<script>
import { toRefs, ref } from 'vue'
export default {
    
    props: ['snippet', 'value', 'name', 'index', 'addCount', 'subtractCount'],

    setup(props) {
        const { snippet } = toRefs(props)
        const snippetValue = snippet.value
        const snippetArray = [...snippetValue]
        // console.log(snippetValue)
        // console.log(snippetArray)
        const displayText = ref([])
        const optionLimit = snippetArray.length;
        const optionItem = 1;
        
        return {
            snippetValue,
            snippetArray,
            displayText,
            optionLimit,
            optionItem,
        }
    },
    data() {
        return {
            nextSnippet: this.snippet,
            snippetOneActive: true,
            snippetTwoActive: false,
            startStop: true,
            initPush: false,
            paused: false,
            stopped: false,
            changeMade: false,
            oldAddCount: 0,
            oldSubtractCount: 0
        }
    },

    methods: {
            doing() {

                // console.log('option limit is' + this.optionLimit)

                // if(this.displayText.length===0) {
                //       this.displayText.push(this.snippetArray[0]);
                // }
            
            // console.log('snippet array is' + this.snippetArray)
            // console.log('display text is' + this.displayText)
            // console.log('snippet one active is' + this.snippetOneActive)
            // console.log('snippet two active is' + this.snippetTwoActive)
            this.stopped = false;
                if (this.initPush === false) {
                        this.displayText.push(this.snippetArray[0]);
                        this.initPush = true
                        // console.log('this.initPush is' + this.initPush)
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
            console.log('no more stuff to do already reached:' + this.optionItem)
            }
        },

        dostuff() {
            if (this.startStop===true){
                    // console.log('dostuff: setting timeout')
                    setTimeout(()=> {
                        this.doOther();
                    }, 30);
            } else {
                console.log('no, stop!')
            }
        },
        
        startAdd(newVal, oldVal){

             this.snippetOneActive = !this.snippetOneActive
                this.snippetTwoActive = !this.snippetTwoActive
            
                // console.log('doing start add')
                console.log('new value is' + newVal)
                console.log('old value is' + oldVal)

                // console.log('add count is' + this.addCount)
                // console.log('old add count is' + this.oldAddCount)

                this.nextSnippet = newVal;
                this.snippetArray = [...newVal]
                this.optionLimit = this.snippetArray.length

                this.doing()
        }
    },

    watch: {
        snippet(newValue, oldValue) {

            this.changeMade = true;
            console.log('WATCHER: new value is' + newValue)
            console.log('WATCHER: old value is' + oldValue)

            if(this.$store.state.add>this.$store.state.oldAdd) {

                this.startAdd(newValue, oldValue);
                this.$store.state.oldAdd++

            }

            if(this.$store.state.sub>this.$store.state.oldSub&&this.changeMade===true) {
                this.displayText = [];
                this.optionItem = 0;
                this.startAdd(newValue, oldValue);
                this.$store.state.oldSub++
                // this.snippetOneActive = !this.snippetOneActive
                // this.snippetTwoActive = !this.snippetTwoActive
            
                // console.log('a snippet changed')
                // console.log('new value is' + newValue)
                // console.log('old value is' + oldValue)
                // console.log('change made is' + this.changeMade)

                // // console.log('add count is' + this.addCount)
                // // console.log('old add count is' + this.oldAddCount)

                // this.nextSnippet = newValue
                // this.snippetArray = [...newValue]
                // this.optionLimit = this.snippetArray.length
                // console.log('snippet array is' + this.snippetArray)
                // console.log('option limit is' + this.optionLimit)

                // this.$store.state.oldSub++
                // this.doing()
            }

        }
    },

    computed: {
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
</style>
