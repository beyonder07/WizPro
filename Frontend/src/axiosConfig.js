import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://wizpro.onrender.com/ai',
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json'
    },
    transformResponse: [function (data) {
      // Try to parse JSON, but return raw data if parsing fails
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }]
  });

export default axiosInstance;