<template>
    {{ snippet }}
</template>

<script>
    import { ref } from 'vue'

export default {

    props: {
        snippet: {
            type: String,
            required: false,
        }
    },

    emits: ['transitioned'],

    setup() {
        const count = ref(false)

        return{
            count
        }
    },

    mounted(){
          setTimeout(() => {
            this.count = true
        }, 2000)
    },

    watch: {
        count(newVal){
             if(newVal===true) {
                this.$emit('transitioned')
            }
        }
    }
}
</script>

<style scoped>
    
</style>