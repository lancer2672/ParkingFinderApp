import axiosClient from './axiosClient';

const reservationAPI = {
  createReservation: async ({
    userId,
    parkingLotId,
    startTime,
    cancelMinute,
    vehicleType,
  }) => {
    try {
      console.log('vehicleType', cancelMinute);
      const response = await axiosClient.post('/api/reservations', {
        userId,
        parkingLotId,
        startTime,
        cancelMinute,
        vehicleType,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  /**
         {
            "id": 19,
            "userId": 6,
            "parkingLotId": 1,
            "startTime": "2024-10-22T10:00:00",
            "vehicleType": "CAR",
            "totalPrice": 30000.0,
            "status": "PENDING",
            "payment": {
                "id": 1,
                "reservationId": 19,
                "amount": 100.0,
                "paymentMethod": "BANK_TRANSFER",
                "paymentStatus": "COMPLETED",
                "paymentDate": "2024-11-05T15:47:21.906+00:00"
            },
            "parkingLot": {
                "id": 1,
                "ownerId": 6,
                "provinceId": "12",
                "districtId": "107",
                "wardId": "03433",
                "name": "Bãi xe Kami",
                "address": "43 Đông Hoà, Dĩ An, Bình Dương",
                "longitude": 106.79926137333933,
                "latitude": 10.87296448954347,
                "openHour": "06:30:00",
                "closeHour": "22:30:00",
                "status": "ACTIVE",
                "media": [],
                "approved": true
            }
        },
         */
  getUserRevations: async ({userId, page = 0, limit = 10000}) => {
    try {
      const response = await axiosClient.get(
        `/api/reservations/user/${userId}?page=${page}&limit=${limit}`,
      );
      console.log('reservations', response.data);
      return response.data.reservations;
    } catch (error) {
      console.error('Error creating reservation:', error);
      // throw error;
    }
  },
  updateUserReservation: async ({reservationId, status}) => {
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
  getByID: async reservationId => {
    try {
      const response = await axiosClient.get(
        `/api/reservations/${reservationId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error get reservation:', error);
      throw error;
    }
  },
  /**
   * {
    "reservation_id":32,
    "amount" :30000,
    "userId":6,
    "payment_method":"BANK_TRANSFER"
}
   */
  createPayment: async ({reservation_id, amount, userId, payment_method}) => {
    try {
      const response = await axiosClient.post('/api/payments', {
        reservation_id,
        amount,
        userId,
        payment_method,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }
};
export default reservationAPI;
