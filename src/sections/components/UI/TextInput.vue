<template>
     <ion-chip 
            class="input"
            color="success"
            outline="true">
                <ion-input 
                type="text"
                required="true"
                @ionChange="outputValue=$event.target.value"
                >
                </ion-input>
                <ion-icon 
                :icon="checkmarkCircle"
                color="success"
                @click="$emit('outputValue')"
                slot="end"
                ></ion-icon>
            </ion-chip>
</template>

<script>
import {
    IonChip,
    IonInput,
    IonIcon
} from '@ionic/vue';

import { checkmarkCircle } from 'ionicons/icons'

export default {

    components: {
        IonChip,
        IonInput,
        IonIcon
    },

    // props: {

    //     personmate: {
    //         type: String,
    //         required: true
    //     }
    // },

    emits: ['outputValue'],

    setup() {

        return {
            checkmarkCircle
        }
    }

}
</script>
