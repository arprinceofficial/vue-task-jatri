import axios from '../plugins/axios'

const ProductService = {
    async getProducts() {
        try {
            const response = await axios.get('/products');
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch products');
        }
    },

    async getProductById(productId) {
        try {
            const response = await axios.get(`/products/${productId}`);
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch product');
        }
    },

};

export default ProductService;
