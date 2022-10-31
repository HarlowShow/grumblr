<template>
    <base-layout v-if="ready===true">
      <div class="chat scrollable">
            <chat-bubble
            :gridClass="'right'"
            :responseClass="true"
            v-if="fullGripe">
                <template v-slot:end>
                            <div :class="classObject">
                                <p>{{ fullGripe }}</p>
                            </div>
                        </template>
                        <template v-slot:third>
                            <the-icons :name="'profile'"></the-icons>
                        </template>
            </chat-bubble>
       </div>
       <div class="other-stuff">
       <div class="sharing-icons">

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
                    router-link="/input">Keep Grumbling
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
    import { ref } from 'vue'

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
        const classObject = store.state.boxProps
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
        let newId = grumbleRef.id
        // console.log('id is: ' + newId)

        const createShare = async () => {
    
            await setDoc(grumbleRef, {
            text: fullGripe,
            name: nameVal.value,
            personmate: personmateVal,
        })

            sharingURL.value = `https://grumblr-web.web.app/shared/${newId}`
            // sharingURL.value = `http://localhost:8100/shared/${id.value}`
            // console.log('sharing url is: ' + sharingURL.value)
        }

        return {
            nameVal,
            classObject,
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
      justify-content: space-between;
      padding: 0.25rem;
      max-width: 20rem;
      min-width: 12rem;
    
    }

    .end-btn {
      display: flex;
      justify-content: center;
      justify-items: center;
      align-items: center;
      align-content: center;
      padding-top: 1rem;
    }

    .chat.scrollable {
    padding-left: 1rem;
    padding-right: 1rem;
    
}
    .other-stuff {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    ion-icon {
        font-size: 2.2rem;
    }

    .reverse {
-moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}

.upsidedown {
-moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}

</style>