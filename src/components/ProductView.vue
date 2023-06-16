<script setup>
import ProductTable from './ProductTable.vue';
import { ref, onMounted, computed } from 'vue';
import ProductService from '../service/ProductService';

const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);

async function fetchProducts() {
    try {
        const response = await ProductService.getProducts();
        const sortedProducts = response.data.products.sort((a, b) => {
            // Sort by price in ascending order
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;

            // If prices are equal, sort by rating in descending order
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;

            return 0;
        });

        products.value = sortedProducts;
    } catch (error) {
        console.error(error);
    }
}

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage.value));
const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return products.value.slice(startIndex, endIndex);
});


const visiblePageNumbers = computed(() => {
    const pages = [];
    const totalVisiblePages = 3; // Adjust the number of visible pages here
    const halfVisiblePages = Math.floor(totalVisiblePages / 2);

    let startPage = currentPage.value - halfVisiblePages;
    let endPage = currentPage.value + halfVisiblePages;

    if (startPage < 1) {
        startPage = 1;
        endPage = totalVisiblePages;
    }

    if (endPage > totalPages.value) {
        endPage = totalPages.value;
        startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
});


const showStartDots = computed(() => visiblePageNumbers.value[0] > 1);
const showEndDots = computed(() => visiblePageNumbers.value[visiblePageNumbers.value.length - 1] < totalPages.value);

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function goToPage(pageNumber) {
    currentPage.value = pageNumber;
}

onMounted(fetchProducts);
</script>

<template>
    <div>
        <ProductTable :products="paginatedProducts" :currentPage="currentPage" :itemsPerPage="itemsPerPage" />
        <!-- pagination -->
        <div class="paginatios">
            <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            <template v-if="showStartDots">
                <span>...</span>
            </template>
            <button v-for="pageNumber in visiblePageNumbers" :key="pageNumber" @click="goToPage(pageNumber)"
                :class="{ active: pageNumber === currentPage }">
                {{ pageNumber }}
            </button>
            <template v-if="showEndDots">
                <span>...</span>
            </template>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.button {
    font-weight: bold;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    margin: 4px 2px;
}

button.active {
    font-weight: bold;

    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    margin: 4px 2px;
}
</style>