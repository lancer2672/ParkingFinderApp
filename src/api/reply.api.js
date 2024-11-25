import axiosClient from './axiosClient';

const replyAPI = {
  /*
{
    "userId":"6",
    "reviewId":"1",
    "comment":"Bãi xe này khá tiện, rcm cho mọi người"
}
    */
  create: async data => {
    try {
      const response = await axiosClient.post('/api/replies', data);
      return response.data;
    } catch (error) {
      console.error('Error creating reply:', error);
      throw error;
    }
  },
  getByReviewId: async reviewId => {
    try {
      const response = await axiosClient.get(
        `/api/replies/reviews/${reviewId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching replys:', error);
      throw error;
    }
  },
};

export default replyAPI;
