<template>
 <div class="form-area">
    <ion-select 
        placeholder="Select One"
        v-model="selectedPronoun"
        @ionChange="validate"
        css-class="custom-select"
        >
       <ion-select-option value="me">Just me</ion-select-option>
        
        <ion-select-option value="we">Several of us</ion-select-option>
    </ion-select>
        <p v-if="invalidInput">Please select a valid option</p>
    <ion-button expand="block" color="primary" shape="round" fill="outline"  @click="submitPronoun(selectedPronoun)">Next</ion-button>

</div>
</template>

<script>
import {
    IonSelect,
    IonSelectOption,
    IonButton,

} from '@ionic/vue';

export default {

    props: {

        pronoun: {
            type: Object
        },
    },

    components: {
        IonSelect,
        IonSelectOption,
        IonButton,
 
    },

    data() {
        return {
            selectedPronoun: 'none yet',
            invalidInput: false,
        };
    },

    emits: ['update:pronoun'],

    methods: {

        validate() {
             if (this.selectedPronoun === 'none yet') {
                this.invalidInput = true;
                return this.selectedPronoun
            }
            this.invalidInput = false;
        },

        submitPronoun(pronoun) {
            this.validate();
            if(this.invalidInput === false) {
            this.$emit('update:pronoun', pronoun)
            }
        },
    },
}
</script>