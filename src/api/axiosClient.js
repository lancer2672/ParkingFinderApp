import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'http://192.168.154.104:8080';
const ac = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzI5NDE1NzUwLCJleHAiOjE3Mjk1MDIxNTB9.J1wFb2uPMCvs-_G0YCobfULcJLk6cHERdUsDVqorWbsfo5C9pT3p76qSnVxkm4p59b8ThRZZA4NZBwtWayp1EQ';
const axiosClient = axios.create({
  baseURL,
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
