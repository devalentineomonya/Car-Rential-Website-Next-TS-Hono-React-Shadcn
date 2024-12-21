import { create } from "zustand";

interface EditCarState {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}
export const useEditCar = create<EditCarState>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id     }),
  onClose: () => set({ isOpen: false, id:undefined }),
}));
