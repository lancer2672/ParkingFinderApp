import axiosClient from './axiosClient';

const reviewAPI = {
  /*
{
    "userId":"6",
    "parkingLotId":"1",
    "rating": 3,
    "comment":"Bãi đỗ xe này tốt"
}
    */
  create: async data => {
    try {
      const response = await axiosClient.post('/api/reviews', data);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },
  getByParkingLotId: async parkingLotId => {
    try {
      const response = await axiosClient.get(
        `/api/reviews/parking-lots/${parkingLotId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },
};

export default reviewAPI;
