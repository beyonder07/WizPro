import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/ai',
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