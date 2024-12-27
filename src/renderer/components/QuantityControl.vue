<script setup>
const quantity = defineModel({ default: 0 })
const decrement = () => {
    if(quantity.value > 0) quantity.value--
}
const increment = () => quantity.value++
</script>
<template>
    <div class="quantity-control">
        <button @click="decrement">
            <svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
        </button>
        <div class="text">
            {{ quantity }}
        </div>
        <button @click="increment">
            <svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        </button>
    </div>
</template>