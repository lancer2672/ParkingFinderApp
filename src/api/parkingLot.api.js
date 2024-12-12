import axiosClient from './axiosClient';

const parkingLotAPI = {
  getParkingLotsInRegion: async ({latitude, longitude, radius, type}) => {
    try {
      console.log("latitude", latitude, "longitude", longitude, "radius", radius);
      const response = await axiosClient.get('/api/parking-lots/region', {
        params: {lng: longitude, lat: latitude, radius_km:radius, type},
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching parking lots:', error);
      throw error;
    }
  },
};

export default parkingLotAPI;
