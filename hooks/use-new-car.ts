import {create} from "zustand";

interface newCarState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useNewCar = create<newCarState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
;
