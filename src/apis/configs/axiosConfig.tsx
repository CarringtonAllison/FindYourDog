import axios from 'axios';

const api = axios.create({
    baseURL: "https://frontend-take-home-service.fetch.com",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    maxBodyLength: 20000,
    maxContentLength: 20000,  
});

export default api;