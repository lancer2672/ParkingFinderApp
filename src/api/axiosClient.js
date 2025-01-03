import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const serverURL = 'http://192.168.248.104:8080';
const axiosClient = axios.create({
  baseURL: serverURL,

});

axiosClient.interceptors.request.use(
  async config => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.log('Lỗi khi lấy accessToken từ AsyncStorage:', error.message);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('Lỗi:', error.message);
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosClient;