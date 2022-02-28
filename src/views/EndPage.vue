<template>
    <base-layout>
        <div v-if="fullGripe">
       <p>Here's what you decided on:</p>
            <p> {{ fullGripe }}</p>
        </div>

       <p>sharing buttons will go here</p>
       <ion-button @click="handleShare">add gripe to DB</ion-button>
       <ion-button 
       expand="block" color="primary" shape="round" fill="outline"
       router-link="/home">Make another gripe</ion-button>
    </base-layout>
</template>

<script>

    import { IonButton } from '@ionic/vue'
    import { useStore } from 'vuex'

    import { db } from '../firebase/config'
    import { addDoc, collection } from 'firebase/firestore'

export default {
    components: {
        IonButton,
    },

    setup(){

        const store = useStore()
        const gripe = store.state.finalOutput
        const fullGripe = Object.values(gripe).join('');
        store.state.gripeString = fullGripe

        const handleShare = async () => {
            const colRef = collection(db, 'grumbles')

            await addDoc(colRef, {
                text: fullGripe
            })
        }

        return {
            gripe,
            fullGripe,
            handleShare,
        }
    },

    computed: {
        output() {
            return this.$store.state.baseOutput;
        },
    }
}
</script>