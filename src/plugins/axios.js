import axios from 'axios';

const useAxios = axios.create({
    // baseURL: 'https://dummyjson.com',
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default useAxios;

