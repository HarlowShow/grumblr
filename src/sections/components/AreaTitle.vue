<template>
    <div class="progress-bar">

        <ion-progress-bar :value="progress"></ion-progress-bar>
    </div>
    <div class="title">
        <h3>{{ title }}</h3>
    </div>
</template>

<script>
import { IonProgressBar } from '@ionic/vue';

export default {
    props: ['title', 'progress'],
    components: {
        IonProgressBar
    }
}
</script>

<style scoped>
    .title {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    h3 {
        color: #2C2E32;
    }
</style>