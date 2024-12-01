import { ROLE } from '@src/utils/constant';
import axiosClient from './axiosClient';

const authAPI = {
  loginUser: async ({phoneNumber, password}) => {
    try {
      console.log("phoneNumber", phoneNumber, "password", password);
      const response = await axiosClient.post('/users/signin', {
        phoneNumber,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  signUp: async ({email, password, name, phoneNumber}) => {
    try {
      console.log("email", email, "password", password, "name", name, "phoneNumber", phoneNumber);
      const response = await axiosClient.post('/users/signup', {
        name,
        email,
        phoneNumber,
        password,
        role: ROLE.USER,   // Set role to "USER" as per instructions
      });
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },
};

export default authAPI;
