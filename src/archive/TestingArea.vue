<template>
    <base-layout>
        <h3>Testing Area</h3>
        <button @click="generate"></button>
         <!-- <h4>Custom gripe input</h4>
        <text-input
        :inputType="'long'"
        ></text-input> -->

        <div>
        <!-- <h4>Typewriter effect composable</h4>
        <typewriter-test></typewriter-test> -->
        <div>

        </div>
        </div>
    </base-layout>
</template>

<script>
// import TextInput from '../sections/components/UI/TextInput.vue'
// import TypewriterTest from '../sections/components/TypewriterTest.vue'
export default {

    methods: {

        generate() {
            console.log('tbc')
        },
                // this.tempChosen = this.chosen;
                // // console.log(this.tempChosen)
                // this.setPronouns(this.chosen.chosenPronoun);
                // this.setTempOpen(this.tempOpens);
                // this.setGripe(this.chosen.chosenGripe);
                // this.setConsequence(this.consequences);
                // this.setPlea(this.pleas);
                // this.$store.state.baseOutput = this.output;
    
        },
}
</script>