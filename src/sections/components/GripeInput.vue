<template>
    <div class="form-area" page-default-back-link="/home">

        <ion-select v-model="selected"
        placeholder="choose your gripe">
            <ion-select-option @click="notCustom" value="dishes">
                Dishes in the sink
            </ion-select-option>
            
            <ion-select-option @click="notCustom" value="noise">
                Unreasonable noise
            </ion-select-option>
            
            <ion-select-option @click="notCustom" value="rubbish">
                Not taking the rubbish out
            </ion-select-option>
            
            <ion-select-option @click="setCustom" value="other">Something else</ion-select-option>
        </ion-select>
        
        
              <ion-input 
        v-if="gripeIsCustom===true"
        type="text"
        placeholder="they..."
        @ionChange="customGripe=$event.target.value"
        ></ion-input><span v-if="gripeIsCustom===true">.</span>
        <p v-if="invalidInput===true">Please enter a valid option</p>
            <ion-button
            expand="block" color="primary" shape="round" fill="outline"
            @click="activate(this.selected)">Confirm</ion-button>
    </div>
</template>

<script>
import {
    IonButton,
    IonSelect,
    IonSelectOption,
    IonInput,

} from '@ionic/vue'


export default  {

    components: { 
        IonButton,
        IonSelect,
        IonSelectOption,
        IonInput,
    },

    props: {

         gripe: {
             type: String,
         }
        
    },

    emits: ['update:gripe'],

    data() {
        return {
            selected: '',
            gripeIsCustom: false,
            customGripe: '',
            invalidInput: 'false'
        };
    },

    methods: {

        activate(gripe) {

            if(this.gripeIsCustom === true) {
                this.selected = this.customGripe;
            }
            gripe = this.selected;
            
            if(gripe.length>1){
            this.$emit('update:gripe', gripe);
            this.$store.state.chosenGripe = this.selected;

            
            } else {
                this.invalidInput = true;
            }
        },

        setCustom() {
            this.gripeIsCustom = true;
        },

        notCustom() {
            this.gripeIsCustom = false;
        }

    },

watch: {
    selected(value) {
        if (value==="other") {
            this.gripeIsCustom = true;
            } else {
                this.gripeIsCustom = false;
        }
    }
}
}
</script>