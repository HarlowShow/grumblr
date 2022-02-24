<template>
    <ion-chip v-for="(response, index) in data"
    :key="index"
    @click="[selected=response.value, activate(this.selected)]"
    color="success"
    >
        <ion-icon
        :icon="response.icon">
        </ion-icon>
         <ion-label>
                {{ response.text }}
        </ion-label>
    </ion-chip>
</template>

<script>
import {
    IonChip,
    IonLabel,
    IonIcon,
    
} from '@ionic/vue'

 export default {

     props: {
         data: {
             type: Array,
             required: true,
         }
     },

     components: {
           IonChip,
           IonLabel,
           IonIcon,
     },

     data() {
         return {
             selected: ''

         }
     },

     emits: ['update:value'],

     methods: {
          activate(value) {
                this.$emit('update:value', value)
          }
     }

 }
</script>
