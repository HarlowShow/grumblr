<template>
    <base-layout>
    <ul>
        <li v-for="grumble in grumbles"
        :key="grumble.id">
            <router-link :to="{name: 'SingleShare', params: {id: grumble.id, grumble: grumble.text}}">{{ grumble.id}}</router-link>
        </li>
    </ul>
    </base-layout>
</template>

<script>

import { ref } from 'vue'

import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export default {
    
    setup(){

        const grumbles = ref([])

        const colRef = collection(db, 'grumbles')

        getDocs(colRef)
            .then(snapshot => {
                let docs = []
                snapshot.docs.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                grumbles.value = docs
            })

        return {
            grumbles
        }
    }
}
</script>