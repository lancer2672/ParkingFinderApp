import axiosClient from './axiosClient';

const paymentAPI = {
  vnPay: async (payload) => {
    try {
     
      const response = await axiosClient.get(`/api/payments/vn-pay?amount=${payload.amount}&bankCode=NCB`);
      return response.data;
    } catch (error) {
      console.error('Error upload payment in:', error);
      throw error;
    }
  },
}
export default paymentAPI;