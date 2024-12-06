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
        getUserRevations: async ({ userId,page = 0,limit = 10000}) => {
                try {
                        const response = await axiosClient.get(`/api/reservations/user/${userId}?page=${page}&limit=${limit}`);
                        console.log("reservations",response.data)
                        return response.data.reservations;
                } catch (error) {
                        console.error('Error creating reservation:', error);
                        // throw error;
                }
        },
   
};
export default reservationAPI;