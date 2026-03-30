import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userLevel: null,
  setUserLevel: (level) => set({ userLevel: level }),
}))
