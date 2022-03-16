import { ref } from 'vue'
import { modalController } from '@ionic/vue'
import TheSideModal from '../components/base/TheSideModal.vue'

export default function useChatInterface(helpTextArray = [], nextHelpOptionsArray = [], ) {

    const activeChatStrings = ref([])
    const activeHelpIndex = ref(0)
    const ready = ref(false)

    const nextHelpOptions = ref([])
    nextHelpOptions.value = nextHelpOptionsArray
    const firstHelpOption = nextHelpOptionsArray[0]
    const firstHelpText = helpTextArray[0]
    const activeHelpOptions = ref(firstHelpOption)
    const helpText = ref(helpTextArray)

    class GuideText {
        constructor(name, responseTo, string, followUpIndex, log, stringMethod, actionMethod, routeMethod, route){
            this.name = name;
            this.responseTo = responseTo;
            this.string = string;
            this.followUpIndex = followUpIndex;
            this.log = log;
            this.stringMethod = stringMethod;
            this.actionMethod = actionMethod;
            this.routeMethod = routeMethod;
            this.route=route;
        }

        pushString(idx, log){
        
            let next = nextHelpOptions.value[idx]
            activeHelpOptions.value = [...next]
            if(log===true){
            activeHelpIndex.value = idx
            }
        }

        cancelFinish() {
            // let prevIdx = activeHelpIndex.value
            // let next = nextHelpOptions[prevIdx]
            // activeHelpOptions.value = [...next]
            console.log('put something here' + activeHelpIndex.value)
        }

        async openModal(){
       
            const modal = await modalController.create({
              component: TheSideModal,
              cssClass: 'my-custom-class',
            //   componentProps: {
            //     title: 'New Title',
            //   },
            });
            return modal.present();
        }
    }



    return {
        ready,
        activeHelpOptions,
        firstHelpOption,
        firstHelpText,
        helpText,
        activeChatStrings,
        nextHelpOptions: nextHelpOptions.value,
        activeHelpIndex: activeHelpIndex.value,
        GuideText
    }
}