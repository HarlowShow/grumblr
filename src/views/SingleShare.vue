<template>
    <base-layout>
    <div>
        <p>Check out this spicy grumble about {{ personmate }} {{ name }}</p>
        <p>{{ grumbleText }}</p>
        <ion-button @click="routin">Make my own grumble</ion-button>
    </div>
    </base-layout>

</template>

<script>
import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { IonButton } from '@ionic/vue'
export default {
    components: {
        IonButton,
    },
    props: ['id'],

    setup(props){
        // console.log(props.id)
        const grumble = ref({})

        const query = getDocs(collection(db, 'grumbles'))
        .then(querySnapshot => 
            {
            querySnapshot.forEach((doc) => {
                if(doc.id===props.id){
                    grumble.value = doc.data()
                    }
                })
            })
                .then(() => {
                    let string = grumble.value.text
                    let name = grumble.value.name
                    let personmate = grumble.value.personmate
                    return { string, name, personmate }
                })

        return {
            query,
            grumble,
        }
    },

    mounted(){
        this.getGrumble()
    },

    methods: {

        async getGrumble() {
            this.grumbleObj = await this.query
        },

        routin(){
            this.$router.push('/input')
        }
    },

    data(){
        return {
            grumbleObj: {}
        }
    },

    computed: {

        grumbleText() {
            return this.grumbleObj.string
        },

        personmate() {
            let choice

            if(this.grumbleObj.name==='a mysterious subject'){
                choice = `an anonymous ${this.grumbleObj.personmate}.`
            } else {
                choice = this.grumbleObj.name
            }
            return choice
        },

        name() {
            let choice

            if(this.grumbleObj.name==='a mysterious subject'){
                choice = ''
            } else {
                choice = `named ${this.grumbleObj.name}.`
            }
            return choice
        }
    }
  
}
</script>