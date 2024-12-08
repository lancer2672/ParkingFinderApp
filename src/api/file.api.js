import axiosClient from './axiosClient';

const fileAPI = {
  upload: async (files) => {
    try {
     
      const response = await axiosClient.post('/api/files/mupload',{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: files,
      });
      return response.data;
    } catch (error) {
      console.error('Error upload file in:', error);
      throw error;
    }
  },
}
export default fileAPI;