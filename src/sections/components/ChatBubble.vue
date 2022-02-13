<template>
    <div 
    :class="gridClass"
    class="grid">
        <div class="avatar start-bubble box">
            <div class="inner-bubble"
            :class="{ response: responseClass}"
            >
            <slot name="start"></slot>
            </div>
        </div>

         <div class="end-bubble box"> 
            <div class="inner-bubble"
            :class="{ response: responseClass}"
            >
            <slot name="end"></slot>
            </div>
        </div>

        <div class="box">
             <slot name="third"></slot>
        </div>
        
        <div class="responses">
            <slot name="responses"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['gridClass', 'responseClass']
}
</script>

<style scoped>
    .grid {
        display: grid;
       
        grid-template-rows: auto;
        grid-column-gap: 1rem;
        margin-bottom: 0.5rem;
    }

    .left {
         grid-template-columns: min-content auto 3rem;
    }

    /* .right:nth-child(1){
        order: 3
    }

    .right:nth-child(2){
        order: 2
    }

    .right:nth-child(3){
        order: 1
        } */



    .right {
        grid-template-columns: 3rem auto min-content;
    }

    .left .end-bubble {
        /* background-color: rgb(218, 218, 218);
        border-radius: 20px;
        padding-left: 1rem;
        padding-right: 1rem; */
        display: flex;
        justify-content: flex-start;
    }

    /* .left .avatar .inner-bubble{
        background-color: red;
    } */

   .end-bubble .inner-bubble {
        background-color: rgb(219, 219, 219);
        border-radius: 30px;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    /* .right .end-bubble .inner-bubble {
        background-color: rgb(219, 219, 219);
        border-radius: 20px;
        padding-left: 1rem;
        padding-right: 1rem;
    } */

    .right .end-bubble {
        /* background-color: rgb(218, 218, 218);
        border-radius: 20px;
        padding-left: 1rem;
        padding-right: 1rem; */
        display: flex;
        justify-content: flex-end;
    }

    .avatar {
        align-self: end;
    }

    .avatar.start-bubble {
        display: flex;
        justify-content: flex-end;
    }

    .responses {
        grid-column: 1 / span 2;
    }
</style>