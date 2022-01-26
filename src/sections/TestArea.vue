<template>
    <base-layout page-default-back-link="/home" page-title="Test Area">
  

        <div>
            <h4> {{ textOne }}</h4>
            <transition name="text"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"

            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave">
            <h4
            v-if="textIsVisible"> {{ textTwo }}
            </h4>
            </transition>
            <h4> {{ textThree }}</h4>
        </div>
        <ion-button @click="animateText">Animate stuff</ion-button>
        
        <div></div>
        <typewriter-text
        v-if="words.length>0"
        :words="words">
        </typewriter-text>
        <ion-button @click="setWords('hey babe')">SetWord</ion-button>
    </base-layout>
</template>

<script>

import { IonButton } from '@ionic/vue';
import TypewriterText from './TypewriterText.vue'

export default {

    components: {
        IonButton,
        TypewriterText
    },

    methods: {

        animateText() {
            this.textIsVisible = !this.textIsVisible
        },

        beforeEnter(el){

            el.style.opacity = 0;

            console.log('beforeEnter')
            console.log(el);
        },

        beforeLeave(el) {

            el.style.opacity = 1;

            console.log('beforeLeave')
            console.log(el)
        },

        enter(el, done) {
            let round = 1;
            const interval = setInterval(function() {
                el.style.opacity = round * 0.01;
                round++
                if (round > 100) {
                    clearInterval(interval);
                    done();
                }
            }, 20)
            console.log('enter')
            console.log(el)
        },

        afterEnter(el) {
            console.log('afterEnter')
            console.log(el)
        },
        
        leave(el, done) {
            let round = 1;
            const interval = setInterval(function() {
                el.style.opacity = 1-round * 0.01;
                round++
                if (round > 100) {
                    clearInterval(interval);
                    done();
                }
            }, 20)
            console.log('leave')
            console.log(el)
        },

        afterLeave(el) {
            console.log('afterLeave')
            console.log(el)
        },

        setWords(word) {
            this.words.push(word);
        },
    },

    data() {
        return {
            textOne: 'hey there ',
            textTwo: 'me heartie,',
            textThree: 'me old friend',
            textIsVisible: true,
            words: []
        };
    },
}
</script>
<style scoped>

    h4 {
        display: inline;
    }

</style>