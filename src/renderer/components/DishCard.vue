<script setup>
import { FwbBadge } from 'flowbite-vue';
import DishTypeIndicator from "./DishTypeIndicator.vue";
defineProps({
    item: Object
})
</script>
<template>
    <div class="bg-white rounded p-3 border dark:border-gray-700 cursor-pointer clickable dark:bg-gray-800">
        <div class="mb-2 flex">
            <div class="grow">
                <fwb-badge class="font-bold inline-flex" type="green">{{ item.shortcode }}</fwb-badge>
            </div>
            <DishTypeIndicator :type="item.type"/>
        </div>
        <div>
            {{ item.name }}
        </div>
        <div class="flex gap mt-2 flex-wrap">
        <div class="text-lg text-gray-400 grow">
            ₹{{ item.price }}
        </div>
        </div>
    </div>
</template>