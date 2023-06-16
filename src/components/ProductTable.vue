<script setup>
import ProductRow from './ProductRow.vue';
import { defineProps } from 'vue';

defineProps({
    products: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <ProductRow v-for="product in products" :key="product.id" :product="product" />
        </tbody>
    </table>
</template>