<template>

    <p> {{ pronoun }} have a problem with {{ personmate }} because they {{ gripe }} Is that right?</p>

</template>

<script>

export default {


    props: {
        tempSelection: {
            type: Object,
            required: true
        },
    },

    computed: {
        pronoun() {
                let pro = ''
                if(this.tempSelection.chosenPronoun === "me") {
                    pro = "You"
                }
                if (this.tempSelection.chosenPronoun === "we"){
                    pro = "More than one of you"
                } return pro
            },
        personmate() {
            let pers = ''
            if (this.$store.state.personmateIsNamed===true) {
                pers = this.tempSelection.chosenPersonmate
            } else {
                pers = 'your ' + this.tempSelection.chosenPersonmate
            }
            return pers
            },
        gripe() {
            // let offenseText = this.$store.state.baseOutput.of0.slice(4)
            //     return offenseText
            return this.tempSelection.demoGripe
            },
    },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

ion-toolbar {
    display: flex;
    flex: 1;
    margin-left: -2rem;
    margin-right: -4rem;
}

ion-button {
    width: 40%;
}

.btn-row {
    --border-radius: 0px !important;
}

#desktop {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}

</style>