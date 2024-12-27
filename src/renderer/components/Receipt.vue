<template>
    <div class="receipt">
        <div v-if="restaurant" class="header">
            <h1 v-if="restaurant.name">{{ restaurant.name }}</h1>
            <p v-if="restaurant.address">{{ restaurant.address }}</p>
            <p v-if="restaurant.phone">{{ restaurant.phone }}</p>
        </div>
        
        <div class="order-details">
            <p>Order #{{ order_id }}</p>
            <p>{{ date }}</p>
            <p>Table {{ table }}</p>
        </div>
        
        <div class="order-items">
            <div v-for="(item, i) in items" :key="i" class="item">
                <p>{{  item.name }} x {{ item.quantity }}</p>
                <p>₹{{ item.price * item.quantity }}</p>
            </div>
        </div>

        <div class="subtotal">
            <p>Subtotal: ₹{{ subtotal }}</p>
        </div>

        <div class="tax">
            <p>Tax: ₹{{ tax }}</p>
        </div>

        <div class="total">
            <p>Total: ₹{{ total }}</p>
        </div>
        
        <div class="footer">
            <p>Thank you for dining with us!</p>
            <p>Visit us again!</p>
        </div>
    </div>
</template>
<script setup>
defineProps({
    order_id: String,
    date: String,
    table: String,
    items: Array,
    subtotal: Number,
    tax: Number,
    total: Number,
    restaurant: Object
});
</script>