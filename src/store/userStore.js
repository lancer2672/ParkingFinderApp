import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    email: '',
    phoneNumber: '',
    role: '',
  },
  updateUser: (email, phoneNumber, role) => set((state) => ({
    user: {
      ...state.user,
      email,
      phoneNumber,
      role,
    },
  })),
  resetUser: () => set({ user: { email: '', phoneNumber: '', role: '' } }),
  setUser: (user) => set({ user }),
}))