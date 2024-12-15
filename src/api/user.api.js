import axiosClient from './axiosClient';

const userAPI = {
  getUserByID: async (id) => {
    try {
      console.log("User ID", id);
      const response = await axiosClient.get(`/users/${id}`);
      console.log("response", response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
};

export default userAPI;
