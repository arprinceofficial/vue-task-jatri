<script setup>
import { defineProps, ref } from 'vue';

defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const showDetails = ref(false);

function toggleDetails() {
    showDetails.value = !showDetails.value;
}

</script>

<template>
    <tr>
        <td>{{ product.brand }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating }}</td>
        <td>
            <button @click="toggleDetails">{{ showDetails ? 'Hide' : 'Show' }}</button>
        </td>
    </tr>
    <tr v-if="showDetails">
        <td colspan="4">
            <!-- Additional details content -->
            {{ product.description }}
        </td>
    </tr>
</template>
  