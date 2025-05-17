import { create } from "zustand";

interface FilterCarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useFilterCar = create<FilterCarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
