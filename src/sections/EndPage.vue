<template>
    <base-layout>
       <p>Here's what you decided on:</p>
            <p> {{ fullGripe }}</p>

       <p>sharing buttons will go here</p>
       <ion-button 
       expand="block" color="primary" shape="round" fill="outline"
       router-link="/home">Make another gripe</ion-button>
    </base-layout>
</template>

<script>
    import { IonButton } from '@ionic/vue'
    import { useStore } from 'vuex'
export default {
    components: {
        IonButton,
    },

    setup(){

        const store = useStore()
        const gripeObject = store.state.baseOutput
        const fullGripe =Object.keys(gripeObject).map(val => gripeObject[val]).join("");

        return {
            fullGripe
        }
    },

    computed: {
        output() {
            return this.$store.state.baseOutput;
        },
    }
}
</script>