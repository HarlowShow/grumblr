<template>
     <ion-chip v-if="inputType==='short'"
            class="input"
           
            outline="true">
                <ion-input 
                type="text"
                required="true"
                mode="ios"
                @ionChange="outputValue=$event.target.value"
                >
                </ion-input>
                <ion-icon 
                :icon="checkmarkCircle"
               
                @click="setVal(outputValue)"
                ></ion-icon>
    </ion-chip>
    <div v-if="examples"
    class="examples">
        <p><span v-if="exampleType==='list'">e.g. </span>{{ examples.join(', ')}}</p>
    </div>


    <ion-chip v-if="inputType==='long'"
            class="input outer"
           
            outline="true">
               
                <div
                 v-if="focus===false"
                 >
                <chat-typer
                        @click="focus=true"
                        :chatString="'period blood on the walls'"
                        :mode="'looping'">
                </chat-typer>
                </div>
                 <ion-textarea v-else
                    mode="ios"
                    class="input inner"
                    :class="[{ hidePlaceholder : focus==='true'},{ showPlaceholder : focus==='false'}]"
                    type="text"
                    @ionChange="outputValue=$event.target.value"
                    @ionFocus="focus=true"
                    @ionBlur="resetPlaceholders"
                    inputmode="text"
                    rows="3">
                </ion-textarea>
                <ion-icon 
                :icon="checkmarkCircle"
               
                @click="setVal(outputValue)"
                ></ion-icon>
            </ion-chip>
</template>

<script>
import ChatTyper from '../ChatTyper.vue'


import {
    IonChip,
    IonInput,
    IonIcon,
    IonTextarea,
    useKeyboard
} from '@ionic/vue';
import { watch } from 'vue'


import { checkmarkCircle } from 'ionicons/icons'

export default {

    components: {
        ChatTyper,
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
        },

        inputType: {
            type: String,
            required: true,
        },

        examples: {
            type: Array,
            required: false
        },

        exampleType: {
            type: String,
            required: false
        }
    },

    emits: ['update:value'],

    setup() {

    const { isOpen, keyboardHeight } = useKeyboard()
    watch(keyboardHeight, () => {
    console.log(`Is Keyboard Open: ${isOpen.value}, Keyboard Height: ${keyboardHeight.value}`);
    });


        return {
            checkmarkCircle,
        }
    },

    data() {
        return {
            focus: false,
        }
    },

    methods: {

        setVal(value) {
             this.$emit('update:value', value)
        },

        resetPlaceholders(){
            this.focus=false
            // console.log('reset placeholders')
        }
    },

}
</script>

<style scoped>
    .examples {
        margin-top: 0px !important;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        max-width: 250px;
    }

    .examples>p{
        margin: 0;
        padding-left: 15px;
        padding-right: 15px;
    }
</style>

