import { create } from 'zustand'

const init = {
  id: '',
  name:'',
  email: '',
  phoneNumber: '',
  role: '',
  status:'',
}
const useUserStore = create((set) => ({
  user:init,
  updateUser: (email, phoneNumber, role) => set((state) => ({
    user: {
      ...state.user,
      email,
      phoneNumber,
      role,
    },
  })),
  resetUser: () => set({ user: init }),
  setUser: (user) => set({user}),
}))
export default useUserStore