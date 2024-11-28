import { create } from "zustand";

interface NewCarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useNewCar = create<NewCarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
