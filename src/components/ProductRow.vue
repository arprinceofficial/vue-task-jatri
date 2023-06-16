<script setup>
import { ref, defineProps } from 'vue';
import ProductService from '../service/ProductService';

defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const showDetails = ref(false);
const loading = ref(false);
const additionalDetails = ref('');

async function fetchAdditionalDetails(id) {
    console.log('fetchAdditionalDetails', id);
    try {
        loading.value = true;
        const response = await ProductService.getProductById(id);
        additionalDetails.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error(error);
        loading.value = false;
    }
}

function toggleDetails(id) {
    console.log('toggleDetails', showDetails.value);
    showDetails.value = !showDetails.value;
    if (showDetails.value) {
        fetchAdditionalDetails(id);
    }
}
</script>

<template>
    <tr>
        <td>{{ product.title }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating }}</td>
        <td>
            <button @click="toggleDetails(product.id)">{{ showDetails ? 'Hide' : 'Show' }}</button>
        </td>
    </tr>
    <tr v-if="showDetails">
        <td colspan="4">
            <div v-if="loading">
                Loading...
            </div>
            <div v-else class="card">
                <!-- Details content -->
                <div class="detials">
                    <p class="title">Name:</p>
                    <p class="des">{{ additionalDetails.title }}</p>
                </div>
                <div class="detials">
                    <p class="title">Price:</p>
                    <p class="des">{{ additionalDetails.price }}</p>
                </div>
                <div class="detials">
                    <p class="title">Rating:</p>
                    <p class="des">{{ additionalDetails.rating }}</p>
                </div>
                <div class="detials">
                    <p class="title">Description:</p>
                    <p class="des">{{ additionalDetails.description }}</p>
                </div>
            </div>
        </td>
    </tr>
</template>