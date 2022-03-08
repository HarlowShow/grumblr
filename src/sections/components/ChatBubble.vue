<template>
    <div 
    :class="gridClass"
    class="grid">
        <div class="avatar start-bubble box">
            <div class="inner-bubble">
            <slot name="start"></slot>
            </div>
        </div>

        <div>
         <div class="end-bubble box"> 
             
            <div class="inner-bubble"
            >
            <div class="icon-slot"
            v-if="iconSlot">
                <slot name="icon"></slot>
            </div>
            <slot name="end"></slot>
            </div>
        </div>
        <div class="end-bubble box"> 
        <div class="inner-bubble extra"
            v-if="additionalBubbles>0"
            >
             <slot name="end-next"></slot>
            </div>
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
    props: ['gridClass', 'iconSlot', 'additionalBubbles'],
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
        background-color: #D2FFE6;
        border-radius: 25px;
        border: 3px solid black;
        box-shadow: 0px 4px 0px 0px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
        padding-left: 1rem;
        padding-right: 1rem;
        margin-bottom: 0.5rem;
    }

   .left .end-bubble .inner-bubble {
        background-color: #D2FFE6;
        
    }

     .right .end-bubble .inner-bubble {
       background-color: #e3ccfd;
       color: black;
     }

     /* background-color: #573280; */

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

    .extra {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .icon-slot{
        margin-bottom: -1rem;;
        padding: 0;
        display: flex;
        justify-content: flex-end;
        text-align: end;
    }
</style>