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
};
export default reservationAPI;