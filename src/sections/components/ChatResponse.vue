<template>
    <div v-for="(response, index) in data"
    :key="index"
    
    >
    <ion-chip
    @click="[selected=response.value, activate(this.selected)]"
    outline='true'
    >
        <ion-icon v-if="!noIcon"
        :icon="response.icon">
        </ion-icon>
         <ion-label>
                {{ response.text }}
        </ion-label>
    </ion-chip>
         <ion-label class="examples" v-if="this.subtext===true&&response.subtext">({{ response.subtext }})</ion-label>
    </div>
   
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
         },

         subtext: {
             type: Boolean,
             required: false,
         },

         noIcon: {
             type: Boolean,
             required: false,
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
     },

 }
</script>

<style scoped>
.examples {
        margin-top: 0px !important;
        font-size: 0.8rem;
    }

ion-chip {
    --color: black;
    border: 2.5px solid black;
}

ion-icon {
    color: black;
}
</style>
