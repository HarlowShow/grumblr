<template>
    <base-layout>
    <div>
        <p> I made this grumble!</p>
        <p> {{ grumble }}</p>
    </div>
    </base-layout>

</template>

<script>
export default {
    props: ['id', 'grumble']
  
}
</script>