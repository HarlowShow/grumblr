<template>
    <base-layout>
        <h3>Testing Area</h3>

         <h4>Custom gripe input</h4>
        <text-input
        :inputType="'long'"
        ></text-input>

        <div>
        <!-- <h4>Typewriter effect composable</h4>
        <typewriter-test></typewriter-test> -->
        <div>

        </div>
        </div>
    </base-layout>
</template>

<script>
import TextInput from '../sections/components/UI/TextInput.vue'
// import TypewriterTest from '../sections/components/TypewriterTest.vue'
export default {
    components: {
        // TypewriterTest,
        TextInput
    }
}
</script>