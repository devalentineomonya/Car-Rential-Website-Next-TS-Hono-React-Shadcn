import { create } from "zustand";

interface DeleteCarState {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}
export const useDeleteCar = create<DeleteCarState>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
