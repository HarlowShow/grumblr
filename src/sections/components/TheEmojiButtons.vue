<template>
    <div id="btn-house">
        <!-- pretty example emojis -->
        <!-- <div class="btn-container">
            <div class="btn-child">
                <div class="icon-container">
                    <the-icons :name="'paggro-neutral'"></the-icons>
                </div>
                <div class="icon-container">
                    <the-icons :name="'paggro-one'"></the-icons>
                </div>
                <div class="icon-container">
                    <the-icons :name="'paggro-two'"></the-icons>
                </div>
                <div class="icon-container">
                    <the-icons :name="'paggro-three'"></the-icons>
                </div>
                <div class="icon-container big-emoje">
                    <the-icons :name="'paggro-four'"></the-icons>
                </div>
            </div>
        </div> -->
        <div class="btn-container">
            <div class="btn-child"
            v-if="type==='add'">
                <div class="icon-container" v-if="clickstep===0">
                    <the-icons :name="`${tone}-one`" :opacity="5"></the-icons>
                </div>
                <div class="icon-container" v-if="clickstep===1">
                    <the-icons :name="`${tone}-one`" :opacity="10"></the-icons>
                </div>
                <div class="icon-container" v-if="clickstep===2">
                    <the-icons :name="`${tone}-one`" :opacity="20"></the-icons>
                </div>
                <div class="icon-container" v-if="clickstep===3">
                    <the-icons :name="`${tone}-two`" :opacity="30"></the-icons>
                </div>
                <div class="icon-container" v-if="clickstep===4">
                    <the-icons :name="`${tone}-two`" :opacity="40"></the-icons>
                </div>
                  <div class="icon-container" v-if="clickstep===5">
                    <the-icons :name="`${tone}-two`" :opacity="50"></the-icons>
                </div>
                  <div class="icon-container" v-if="clickstep===6"> 
                    <the-icons :name="`${tone}-three`" :opacity="60"></the-icons>
                </div>
                  <div class="icon-container" v-if="clickstep===7">
                    <the-icons :name="`${tone}-three`" :opacity="70"></the-icons>
                </div>
                  <div class="icon-container" v-if="clickstep===8">
                    <the-icons :name="`${tone}-three`" :opacity="80"></the-icons>
                </div>
                  <div class="icon-container big-emoje" v-if="clickstep===9">
                    <the-icons :name="`${tone}-four`" :opacity="90"></the-icons>
                </div>
                 <div class="icon-container big-emoje" v-if="clickstep===10">
                    <the-icons :name="`${tone}-four`" :opacity="100"></the-icons>
                </div>
            </div>
            <div class="btn-child" v-if="type==='sub'">
                <div class="icon-container">
                    <the-icons :name="`${tone}-sub`" :opacity="0"></the-icons>
                </div>
            </div>
        </div>
      
    </div>
</template>

<script>
import TheIcons from './TheIcons.vue'
export default {
    
    components: {
        TheIcons
    },
    props: {
        clickstep: {
            type: Number,
            required: true,
        },

        type: {
            type: String,
            required: false,
        },

        tone: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped>
 .btn-container {
     background-color: none;
 }

 .btn-child {
     background-color: none;
 }

 .icon-container {
     /* background-color: rgb(255, 255, 255); */
     max-width: 6rem;
     max-height: 5rem;
     background-color: none;
     background: none;
     
 }

 /* .big-emoje {
     position: relative;
     top: -0.5rem;
     left: -0.7rem;
 } */

 #btn-house {
     display: flex;
     background-color: none;
 }
</style>