<template>
    <base-layout>
        <div v-if="fullGripe">
       <p>Here's what you decided on:</p>
            <p>{{ fullGripe }}</p>
        </div>

        <div v-if="ready===true"
        class="sharing-icons">

          <ShareNetwork
          network="facebook"
          :url="sharingURL"
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoFacebook"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="twitter"
          :url="sharingURL"
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoTwitter"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="reddit"
          :url="sharingURL"
          title="this is shared between friends"
          description="description goes here"
          ><ion-icon :icon="logoReddit"></ion-icon>
          </ShareNetwork>

          <ShareNetwork
          network="whatsapp"
          :url="sharingURL"
          :title="test"
          description="description goes here"
          ><ion-icon :icon="logoWhatsapp"></ion-icon>
          </ShareNetwork>
       
      </div>
       
       <ion-button 
       expand="block" color="primary" shape="round" fill="outline"
       router-link="/home">Grumble Again</ion-button>
    </base-layout>
</template>

<script>

    import { IonButton, IonIcon } from '@ionic/vue'

  import { logoFacebook, logoTwitter, logoReddit, logoWhatsapp } from 'ionicons/icons';
    import { useStore } from 'vuex'
    import { ref, toRef } from 'vue'

    import { db } from '../firebase/config'
    import { doc, setDoc, collection } from 'firebase/firestore'

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
        const nameVal = ref('')
            
            if(store.state.nameIsDefault===true){
                nameVal.value = 'a mysterious subject'
            } else {
                nameVal.value = store.state.chosenName
            }
         
        const personmateVal = store.state.chosenPersonmate
        const idRef = ref('')
        const sharingURL = ref('')

        const grumbleRef = doc(collection(db, 'grumbles'));

        const createShare = async () => {
    
            await setDoc(grumbleRef, {
            text: fullGripe,
            name: nameVal.value,
            personmate: personmateVal,
        })

            idRef.value = grumbleRef.id
            const id = toRef(idRef)
            // sharingURL.value = `https://grumblr-web.web.app/shared/${id.value}`
            sharingURL.value = `http://localhost:8100/shared/${id.value}`
        }

        


        return {
            nameVal,
            personmateVal: personmateVal.value,
            sharingURL,
            idRef,
            createShare,
            gripe,
            grumbleRef,
            fullGripe,
            logoFacebook,
            logoTwitter,
            logoReddit,
            logoWhatsapp,
        }
    },

    mounted(){
        this.handleShare()
    },

    methods: {

        async handleShare(){
            await this.createShare()
            this.ready=true
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
             ready: false,
        }
    }
}
</script>