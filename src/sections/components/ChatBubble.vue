<template>
    <div 
    :class="gridClass"
    class="grid">
        <div class="avatar start-bubble"> 
            <slot name="start"></slot>
        </div>
         <div class="end-bubble"> 
            <slot name="end"></slot>
        </div>
        <div class="responses">
            <slot name="responses"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['gridClass']
}
</script>

<style scoped>
    .grid {
        display: grid;
       
        grid-template-rows: auto;
        grid-column-gap: 1rem;
        margin-bottom: 1rem;
        
    }

    .left {
         grid-template-columns: 1fr 3fr;
    }

    .right {
        grid-template-columns: 3fr 1fr;
    }

    .left .end-bubble {
        background-color: rgb(218, 218, 218);
        border-radius: 20px;
        padding: 1rem;
    }

    .right .start-bubble {
        background-color: rgb(218, 218, 218);
        border-radius: 20px;
        padding: 1rem;
    }

    .avatar {
        align-self: end;
    }

    .responses {
        grid-column: 1 / span 2;
    }
</style>