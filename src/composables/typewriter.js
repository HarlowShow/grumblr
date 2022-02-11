import { ref, reactive, watch, computed } from 'vue'

export default function useTypewriter(chosenString = 'default string', chosenMode = 'static') {
        // mode - looping, segment
        const string = ref(chosenString.value)
        const trackLimit = ref(0)
        const mode = ref(chosenMode.value)
        const dText = ref([])
        const stringArray = ref([])
        const emote = ref(false)
        const speeds = reactive({
        pause: 500,
        slow: 70,
        normal: 40,
        fast: 20
        })
        const status = reactive({
            pushing: false,
            pulling: false,
            startedPushing: false,
            startedPulling: false,
            resetted: false,
            focus: false,
        })
        const tracking = reactive({
            optionItem: 0,
            idx: 0,
        })
        const chosenSpeed = ref(speeds.normal)

        const displayText = computed(function() {
            let arr = dText.value.join("")
            return arr
        })

        const length = computed(function() {
            return stringArray.value.length
        })

        const typingControl = computed(function() {
            let controlStat = null
            if(status.pulling === false && status.pushing === false) {
                controlStat = 'off' 
            } else if (status.pulling === true && tracking.optionItem === 0) {
                //shut things off once array has cleared
                controlStat = 'off' 
            } else {
                controlStat = 'on'
            }
            return controlStat
        })

        const placeholderLength = computed(function() {
            return placeholderOptions.value.length
        })

        const slowString = computed(function() {
            return `the slow speed is ${speeds.slow}`
        });

        const placeholderOptions = ref([
            {string: "insulted my cousin", speed: speeds.slow, classes: ["green"]},
            {string: "left bodily fluids on the walls", speed: speeds.normal},
            {string: "got crumbs all over the breadbin", speed: speeds.fast},
            {string: "ate all the sticky toffee puddings", speed: speeds.normal},
       ])

       const characters = [];

       const setSpeed = (() => {
             //set speed
             if(length.value<20) {
                chosenSpeed.value = speeds.slow
            } else if (length.value>=20&&length.value<50) {
                chosenSpeed.value = speeds.normal
            } else {
                chosenSpeed.value = speeds.fast
            }
       })

        const addString = ((string) => {
            {
                dText.value.push(string)
                emote.value=!emote.value;
            }
        })

        const setString = ((string, direction) => {
            // console.log('setting string, chosen mode is: ' + mode.value)

           
            console.log('chosen speed is: ' + chosenSpeed.value)

            if(direction==='push') {
                stringArray.value=[...string]
                setSpeed()
                // console.log('stringArray is now: ' + stringArray.value)
                status.pushing=true
                startPush(string)
            } else if(direction==='pull') {
                // console.log('stringArray is now: ' + stringArray.value)
                status.pulling=true
                tracking.idx=stringArray.value.length
                startPull()
            } else {
                console.log('something went wrong')
            }
        })

        const startPush = ((string) => {

            //set string array val to start initial push
            if(typingControl.value==='off') {
                setString(string, 'push')
                console.log('string is: ' + string)
            } else if(status.resetted===true){
                dText.value = [];
                tracking.optionItem = 0;
                status.resetted = false;
                startPush(string)
            } else {

            // check to see letters need pushing
            if (length.value > tracking.optionItem) {
                setTimeout(()=> {
                pushLetter()
                }, chosenSpeed.value)
            // if mode is looping, assign delete string and start pulling
            } else if (length.value===tracking.optionItem && mode.value==='looping') {
               
                console.log('change direction!')
                console.log('mode is: ' + mode.value)
                status.pushing=false
                 //do a little pause before changing
                setTimeout(() =>{
                    setString('new string!', 'pull')
                }, 50)
               
    
            } else {
                console.log('else')
            }
        }
        })

        const pushLetter = (() => {

            //check to see if letters need pulling
            if( typingControl.value===!'on') {
                return
            } else {
            // console.log('push letter started')
            // console.log(dText.value + 'is the dText value')
            dText.value.push(stringArray.value[tracking.optionItem])
            tracking.optionItem++;
            trackLimit.value = tracking.optionItem
            // console.log('letter pushed')
            startPush();
            }
        })

        const startPull = (() => {
            if (tracking.idx <= tracking.optionItem && typingControl.value==='on') {
                setTimeout(() =>{
                    pullLetter();
                }, chosenSpeed.value)
                } else if(mode.value==='looping'){
                console.log('change direction!')
                status.pulling=false
                 //do a little pause before changing
                setTimeout(() =>{
                    setString(string.value, 'push')
                }, 200)
                } else {
                console.log('finished deleting')
            }
        })

        const pullLetter = ((string) => {
            dText.value.pop()
            tracking.idx--
            tracking.optionItem--
            startPull(string)
            })

        const doNext = (()=> {
            if(tracking.idx<placeholderLength.value-1) {
                        tracking.idx++
            } else {
                tracking.idx = 0
            }
        
            let currentPlaceholder = placeholderOptions[tracking.idx];
            chosenSpeed.value = currentPlaceholder.speed;
            let pString = currentPlaceholder.string.split("");
            // console.log(pString)
            startPush(pString);
            })       

        const resetPlaceholders = (()=> {
    
                dText.value = [];
                tracking.optionItem = 0;
                tracking.resetted = true;
                tracking.focus = false;
                tracking.pulling=false;
                doNext()
             })


        watch(emote, function(val){
            console.log(val)
        })

        watch(trackLimit, function(newVal){
            if (newVal===length.value) {
                status.pushing = false;
                status.resetted = true;
            }
        })

        return {
            
            placeholderOptions,
            stringArray,
            characters,
            dText,
            speeds,
            length,
            string,
            chosenSpeed,
            mode,
            chosenString,
            slowString,
            trackLimit,
            displayText,
            placeholderLength,
            emote,
            status,
            tracking,
            typingControl,
            setSpeed,
            setString,
            startPush,
            startPull,
            pushLetter,
            pullLetter,
            addString,
            doNext,
            resetPlaceholders
        };
    }
