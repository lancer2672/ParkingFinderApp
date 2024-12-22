import axiosClient from './axiosClient';

const reservationAPI = {
  createReservation: async ({ userId, parkingLotId, startTime, endTime, vehicleType }) => {
    try {
      console.log("userId", userId, "parkingLotId", parkingLotId, "startTime", startTime, "endTime", endTime, "vehicleType", vehicleType);
      const response = await axiosClient.post('/api/reservations', {
        userId,
        parkingLotId,
        startTime,
        endTime,
        vehicleType,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },
  getByID: async reservationId => {
    try {
      const response = await axiosClient.get(`/api/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Error get reservation:', error);
      throw error;
    }
  },
  getReservationsByUserId: async (userId) => {
    try {
      // console.log('Fetching reservations for user ID:', userId, 'Page:', page, 'Limit:', limit);
      const response = await axiosClient.get(`/api/reservations/user/${userId}`);
      console.log('Reservations fetched:', response.data);
      return response.data.reservations || [];
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },
  updateUserReservation: async ({ reservationId, status }) => {
    try {
      console.log('Update res', reservationId, status);
      const response = await axiosClient.patch(
        `/api/reservations/${reservationId}?status=${status}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  },
};

export default reservationAPI;