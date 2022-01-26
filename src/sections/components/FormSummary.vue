<template>

    <p>{{ pronoun }}</p>

</template>

<script>

export default {


    // data() {
    //     return {
    //         showIt: false,
    //     }
    // },
 
    props: {
        pronoun: {
            type: String
        }
    },

    // watch: {
    //     pronoun(newValue) {
    //     this.displayPronoun = newValue;

    //     setTimeout(() => {console.log("this is the first message")
    //     this.showIt = true;
    //     }, 1000);
    //     }
    // },

    mounted() {
        console.log('mounted')
    },
}
</script>