<script setup>
defineProps({
    type: String
})
</script>
<template>
    <svg class="dish-type veg" :class="type" xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" /></svg>
</template>
<style lang="scss">
.dish-type {
    border: 3px solid;
    border-radius: 5px;
    &.veg {
        border-color: #8bc34a;
        color: #8bc34a;
    }
    &.non-veg {
        border-color: #f44336;
        color: #f44336;
    }
}
</style>