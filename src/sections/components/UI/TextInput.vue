<template>
    <div ref="el">
     <ion-chip v-if="inputType==='short'"
            class="input"
           
            outline="true">
                <ion-input 
                mode="ios"
                inputmode="text"
                required="true"
                @ionChange="outputValue=$event.target.value"
                autofocus="true"
                @keydown.enter="setVal(outputValue)"
                :maxlength="maxLength"
                >
                </ion-input>
                <ion-icon 
                :icon="checkmarkCircle"
                @click="setVal(outputValue)"
                ></ion-icon>
    </ion-chip>
    <div v-if="examples"
    class="examples">
        <p v-if="exampleType==='list'"><span >e.g. </span>{{ examples.join(', ')}}</p>
        <p v-else>{{ examples[0] }}</p>
    </div>


    <ion-chip v-if="inputType==='long'"
            class="input outer"
            outline="true">
               
                <div
                 v-if="focus===false"
                 >
                <chat-typer
                        @click="focus=true"
                        :chatString="''"
                        :mode="'looping'">
                </chat-typer>
                </div>
                 <ion-textarea v-else
                    mode="ios"
                    class="input inner"
                    :class="[{ hidePlaceholder : focus==='true'},{ showPlaceholder : focus==='false'}]"
                    @ionChange="outputValue=$event.target.value"
                    @ionFocus="focus=true"
                    @ionBlur="resetPlaceholders"
                    inputmode="text"
                    @keydown.enter="setVal(outputValue)"
                    rows="3">
                </ion-textarea>
                <ion-icon 
                :icon="checkmarkCircle"
                @click="setVal(outputValue)"
                ></ion-icon>
            </ion-chip>
        </div>
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
        },

        maxLength: {
            type: Number,
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

    mounted() {
        this.getElPosition();
    },

    methods: {

        setVal(value) {
             this.$emit('update:value', value)
        },

        resetPlaceholders(){
            this.focus=false
            // console.log('reset placeholders')
        },
// TODO scroll behaviour - here temporarily
        getElPosition(){
                console.log('function called')
                let currentEl = this.$refs.el
                let rect = currentEl.getBoundingClientRect()
                console.log('current el is' + currentEl)
                let right  = rect.right + window.scrollY
                let height = window.innerHeight
                let pos = right/height*100
                pos = pos.toFixed(2)

                // console.log('left is: ' + left)
                console.log('right is: ' + right)
                console.log('content inner height: ' + height)
                console.log('position is: ' + pos)

                if (pos>75) {
                    this.setScroll = 'instant'
                }
            },
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

