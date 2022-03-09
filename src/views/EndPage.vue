<template>
    <base-layout>
      <div class="chat scrollable">
            <chat-bubble
            :gridClass="'right'"
            :responseClass="true"
            v-if="fullGripe">
                <template v-slot:end>
                            <p>{{ fullGripe }}</p>
                        </template>
                        <template v-slot:third>
                            <the-icons :name="'profile'"></the-icons>
                        </template>
            </chat-bubble>

            <div v-if="ready===true"
                class="sharing-icons">

                <ShareNetwork
                network="facebook"
                :url="sharingURL"
                :title="defaultTitle"
                description="here's how I've been spending my free time in a valuable way"
                ><ion-icon :icon="logoFacebook"></ion-icon>
                </ShareNetwork>

                <ShareNetwork
                network="twitter"
                :url="sharingURL"
                :title="defaultTitle"
                description="here's how I've been spending my free time in a valuable way"
                ><ion-icon :icon="logoTwitter"></ion-icon>
                </ShareNetwork>

                <ShareNetwork
                network="reddit"
                :url="sharingURL"
                :title="defaultTitle"
                description="here's how I've been spending my free time in a valuable way"
                ><ion-icon :icon="logoReddit"></ion-icon>
                </ShareNetwork>

                <ShareNetwork
                network="whatsapp"
                :url="sharingURL"
                :title="defaultTitle"
                description="here's how I've been spending my free time in a valuable way"
                ><ion-icon :icon="logoWhatsapp"></ion-icon>
                </ShareNetwork>
            
            </div>
            
            <div  class="end-btn">
                    <ion-chip
                    size="medium"
                    outline="true"
                    router-link="/input">Grumble Again
                    </ion-chip>
            </div>
       </div>
    </base-layout>
</template>

<script>

    import { IonIcon, IonChip } from '@ionic/vue'
    import ChatBubble from '../sections/components/ChatBubble.vue'
    import TheIcons from '../sections/components/TheIcons.vue'

  import { logoFacebook, logoTwitter, logoReddit, logoWhatsapp } from 'ionicons/icons';
    import { useStore } from 'vuex'
    import { ref, toRef } from 'vue'

    import { db } from '../firebase/config'
    import { doc, setDoc, collection } from 'firebase/firestore'

export default {
    components: {
        // IonButton,
        IonIcon,
        ChatBubble,
        IonChip,
        TheIcons
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
             defaultTitle: 'A very special grumble',
             ready: false,
        }
    }
}
</script>

<style scoped>
ion-chip {
    --color: black;
    border: 2.5px solid black;
    --background: none;
    max-width: 15rem;
}

    .sharing-icons {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      padding: 0.25rem;
    }

    .end-btn {
      display: flex;
      justify-content: center;
      justify-items: center;
      align-items: center;
      align-content: center;
    }

    .chat.scrollable {
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>