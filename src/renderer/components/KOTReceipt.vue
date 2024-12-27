<template>
    <div class="receipt">
        <div class="header">
            <h1>KOT</h1>
            <div style="display: flex; justify-content: center; gap: 10px">
                <p>Table: {{ table }}</p>
                <p>KOT: {{ kot }}</p>
            </div>
            <p>Order #: {{ order_id }}</p>
            <p>Date: {{ date }}</p>
            <p>Time: {{ time }}</p>
        </div>
        <div class="order-items">
            <div v-for="(item, i) in items" :key="i" class="item">
                <p>{{ item.name }}</p>
                <p>{{ item.quantity }}</p>
            </div>
        </div>
        <div class="footer">
            <p>Kitchen Copy</p>
        </div>
    </div>
</template>
<script setup>
defineProps({
    order_id: String,
    kot: String,
    date: String,
    time: String,
    table: String,
    items: Array,
});
</script>