<template>
    <p>here we go</p>
    <ion-segment
    v-model="active">
        <ion-segment-button
        value="demo">
            <ion-label>Function</ion-label>
        </ion-segment-button>

        <ion-segment-button
        value="notes">
            <ion-label>Notes</ion-label>
        </ion-segment-button>
    </ion-segment>

    <div v-if="active==='demo'">
        <h3>Demo</h3>
        <p> d text: {{ dText }}</p>
        <p> display text: {{ displayText }}</p>
        <p>speeds: {{ speeds }}</p>
        <p>speeds: {{ slowString }}</p>
        <p>length: {{ length }}</p>
        <p>status: {{ typingControl }}</p>
        <p>tracking: {{ tracking }}</p>
        <p v-if="emote===true">😱</p>
          <ion-button @click="startPush('hey stringy', 'looping')">Add String</ion-button>
          <!-- <ion-button @click="runStuff">test stuff</ion-button> -->
    </div>





    <div v-if="active==='notes'">
        <div>
            <ion-chip v-for="category in headings" :key="category">
                <p @click="tab=category">{{category}}</p>
            </ion-chip>
        </div>
        <ion-card v-if="tab==='reactivity'">
            <ion-card-header>
            <h3>Reactivity</h3>
            </ion-card-header>
        <ul>
            <li>ref creates a reactive value, which you can pass as an argument</li>
            <li>under the hood it creates an object which stores your string, etc</li>
            <li>you need to use .value on refs to access the value property on their object</li>
            <li>once you return your ref Vue will automatically read the .value, so you don't need it in the template</li>
            <li>if you refer to a specific property on the ref object that won't be reactive</li>
            <li>to use it correctly, pass it as a raw object and not seperate values</li>
            <li>or you can use the reactive function instead of ref</li>
            <li>it's specifically for objects (ONLY), and you no longer need the .value</li>
            <li>whether or not you want to group data as an object is up to you</li>
            <li>if you're not sure, you can use the helper methods isReactive and isRef to check</li>
            <li>you can also use toRefs to make any value a ref, like 'const bla = toRefs(bla) // then return 'bla: blaRefs'</li>
        </ul>
        </ion-card>

          <ion-card v-if="tab==='methods'">
            <ion-card-header>
            <h3>Methods</h3>
            </ion-card-header>
        <ul>
            <li>straightforward, just remember to return it</li>
        </ul>
        </ion-card>

        <ion-card v-if="tab==='computed'">
            <ion-card-header>
            <h3>Computed/Two-way binding</h3>
            </ion-card-header>
        <ul>
            <li>just like normal computed, you're storing it in a function</li>
            <li>obvs you need to store it in a constant and return it</li>
            <li>the computed properties are read only, so don't fuck with their values</li>
            <li>v-model works too, just remember to return them in setup</li>
        </ul>
        </ion-card>

        <ion-card v-if="tab==='watch'">
            <ion-card-header>
            <h3>Watchers</h3>
            </ion-card-header>
        <ul>
            <li>watch takes two arguments, the dependency then the function</li>
            <li>the dependency is the variable</li>
            <li>you can also pass an array of dependency to watch, then your new and old val args are now arrays of new values and old values</li>
            <li>this doesn't work for arrays, TBC on that</li>
            <li></li>
        </ul>
          
        </ion-card>


        <ion-card v-if="tab==='composables'">
            <ion-card-header>
            <h3>Composables</h3>
            </ion-card-header>
        <ul>
           <li>basically everything wrapped in a function</li>
           <li>you can export default the function</li>
           <li>then import the function, just like a component</li>
           <li>then you've gotta return stuff on the other side too - this can be in an array</li>
           <li>so you've gotta return them once in the composable and twice(sorta) in the component</li>
           <li></li>
           <li></li>
           <li></li>
        </ul>
          
        </ion-card>
    </div>
</template>

<script>
// import { ref, reactive, computed, watch } from 'vue';

import {
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonChip,
    IonButton
} from '@ionic/vue'

import useTypewriter from '../../composables/typewriter'
import { ref } from 'vue'

export default {

   

    setup() {
        const chosenString = ref('default string!')
        const chosenMode = ref('looping')
        const typewriterEl = useTypewriter(chosenString, chosenMode)

        console.log(typewriterEl)

        return {
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

    methods: {
        tryThis() {
            console.log(useTypewriter)
        }
    },
    // setup() {
    //     const dText = ref([])
    //     const emote = ref(false)
    //     const speeds = reactive({
    //     pause: 500,
    //     slow: 120,
    //     normal: 70,
    //     fast: 40
    //     })

    //     const displayText = computed(function() {
    //         return dText
    //     })

    //     const slowString = computed(function() {
    //         return `the slow speed is ${speeds.slow}`
    //     });

    //     function addString(string) {
    //         dText.value.push(string)
    //         emote.value=!emote.value;
    //     }

    //     watch(emote, function(val){
    //         console.log(val)
    //     })

    //     return {
    //         dText,
    //         speeds,
    //         slow: speeds.slow,
    //         slowString,
    //         displayText,
    //         addString,
    //         emote,
    //     };
    // },

    components: {
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonCard,
        IonCardHeader,
        IonChip,
        IonButton
    },

    data() {
        return {
            active: 'demo',
            tab: 'reactivity',
            headings: ['reactivity', 'methods', 'computed', 'watch', 'composables'],
        }
    },
}
</script>