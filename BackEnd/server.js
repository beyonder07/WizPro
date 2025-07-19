require('dotenv').config()
const app = require('./src/app')
const axios = require('axios')

// Example: Axios error handling
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios error:', error.message);
        return Promise.reject(error);
    }
);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
})