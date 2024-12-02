import {create} from 'zustand';

const init = {
  parkingLot: {
    id: null,
    ownerId: null,
    provinceId: '',
    provinceName: null,
    districtId: '',
    districtName: null,
    wardId: '',
    wardName: null,
    name: '',
    address: '',
    capacity: null,
    latitude: null,
    longitude: null,
    openHour: '',
    closeHour: '',
    status: '',
    images: [],
  },
};
const useParkingLotStore = create(set => ({
  parkingLot: init,
  updateParkingLot: updatedData =>
    set(state => ({
      parkingLot: {
        ...state.parkingLot,
        ...updatedData,
      },
    })),
  resetParkingLot: () => set(init),
  setParkingLot: parkingLot => set({parkingLot}),
}));

export default useParkingLotStore;
