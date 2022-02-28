<template>
    <base-layout>
        <div v-if="fullGripe">
       <p>Here's what you decided on:</p>
            <p> {{ fullGripe }}</p>
        </div>

        <div class="sharing-icons">

          <ShareNetwork
          network="facebook"
          url='https://news.vuejs.org/issues/180'
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoFacebook"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="twitter"
          url='https://news.vuejs.org/issues/180'
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoTwitter"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="reddit"
          url='https://news.vuejs.org/issues/180'
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoReddit"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="whatsapp"
          url='https://news.vuejs.org/issues/180'
          :title="test"
          description="description goes here"
          ><ion-icon :icon="logoWhatsapp"></ion-icon>
          </ShareNetwork>
       
      </div>

       <p>sharing buttons will go here</p>
       <ion-button @click="handleShare">add gripe to DB</ion-button>
       <ion-button 
       expand="block" color="primary" shape="round" fill="outline"
       router-link="/home">Make another gripe</ion-button>
    </base-layout>
</template>

<script>

    import { IonButton, IonIcon } from '@ionic/vue'

  import { logoFacebook, logoTwitter, logoReddit, logoWhatsapp } from 'ionicons/icons';
    import { useStore } from 'vuex'

    import { db } from '../firebase/config'
    import { addDoc, collection } from 'firebase/firestore'

export default {
    components: {
        IonButton,
        IonIcon
    },

    setup(){

        const store = useStore()
        const gripe = store.state.finalOutput
        const fullGripe = Object.values(gripe).join('');
        store.state.gripeString = fullGripe

        const handleShare = async () => {
            const colRef = collection(db, 'grumbles')

            await addDoc(colRef, {
                text: fullGripe
            })
        }

        return {
            gripe,
            fullGripe,
            handleShare,
            logoFacebook,
            logoTwitter,
            logoReddit,
            logoWhatsapp,
        }
    },

    computed: {
        output() {
            return this.$store.state.baseOutput;
        },
    },

    data() {
        return {
             test: 'it be test, it be best',
        }
    }
}
</script>