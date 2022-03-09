<template>
    <base-layout>
          <div class="chat scrollable">

            <!-- CLICK, set form, position to 0 -->
            <!-- pronoun response -->
            <chat-bubble
             :gridClass="'right'"
             :responseClass="true"
             :additionalBubbles="1"
            >
                <template v-slot:end>
                    <p>{{`check out this spicy grumble about ${personmate} ${name}`}}</p>
                </template>
                 <template v-slot:third>
                      <the-icons :name="'reg-reg'"></the-icons>
                </template>
                 <template v-slot:end-next>
                         <p> {{ grumbleText }}</p>
                </template>
            </chat-bubble>

            <div  class="end-btn">
            <ion-chip
            size="medium"
            outline="true"
            router-link="/input">make my own grumble
            </ion-chip>
       </div>

    </div>
    </base-layout>

</template>

<script>
import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'


import { IonChip } from '@ionic/vue'
import ChatBubble from '../sections/components/ChatBubble.vue'
import TheIcons from '../sections/components/TheIcons.vue'
export default {

    components: {
        // IonIcon,
        IonChip,
        ChatBubble,
        TheIcons
    },
    props: ['id'],

    setup(props){
        // console.log(props.id)
        const grumble = ref({})

        const query = getDocs(collection(db, 'grumbles'))
        .then(querySnapshot => 
            {
            querySnapshot.forEach((doc) => {
                if(doc.id===props.id){
                    grumble.value = doc.data()
                    }
                })
            })
                .then(() => {
                    let string = grumble.value.text
                    let name = grumble.value.name
                    let personmate = grumble.value.personmate
                    return { string, name, personmate }
                })

        return {
            query,
            grumble,
        }
    },

    mounted(){
        this.getGrumble()
    },

    methods: {

        async getGrumble() {
            this.grumbleObj = await this.query
        },

        routin(){
            this.$router.push('/input')
        }
    },

    data(){
        return {
            grumbleObj: {}
        }
    },

    computed: {

        grumbleText() {
            return this.grumbleObj.string
        },

        personmate() {
            let choice

            if(this.grumbleObj.name==='a mysterious subject'){
                choice = `an anonymous ${this.grumbleObj.personmate}.`
            } else {
                choice = this.grumbleObj.name
            }
            return choice
        },

        name() {
            let choice

            if(this.grumbleObj.name==='a mysterious subject'){
                choice = ''
            } else {
                choice = `named ${this.grumbleObj.name}.`
            }
            return choice
        }
    }
  
}
</script>

<style scoped>
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

.sharing-icons {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      padding: 0.25rem;
    }

</style>