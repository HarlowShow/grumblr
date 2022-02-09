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
                @click="setVal(outputValue)"
                ></ion-icon>
    </ion-chip>


    <ion-chip 
            class="input"
            color="success"
            outline="true">
                <ion-textarea
                    class="input"
                    :class="[{ hidePlaceholder : focus==='true'},{ showPlaceholder : focus==='false'}]"
                    type="text"
                    @ionChange="outputValue=$event.target.value"
                    @ionFocus="focus='true'"
                    @ionBlur="resetPlaceholders"
                    auto-grow="true"
                    inputmode="text"
                    :placeholder="placeholderArray">
                </ion-textarea>
                <ion-icon 
                :icon="checkmarkCircle"
                color="success"
                @click="setVal(outputValue)"
                ></ion-icon>
            </ion-chip>
</template>

<script>
import {
    IonChip,
    IonInput,
    IonIcon,
    IonTextarea
} from '@ionic/vue';

import { checkmarkCircle } from 'ionicons/icons'

export default {

    components: {
        IonChip,
        IonInput,
        IonIcon,
        IonTextarea
    },

    props: {

        placeholders: {
            type: Array,
            required: false
        },

        speeds: {
            type: Object,
            required: false
        }
    },

    emits: ['update:value'],

    setup() {

        return {
            checkmarkCircle
        }
    },

    methods: {

        setVal(value) {
             this.$emit('update:value', value)
        }
    }

}
</script>
