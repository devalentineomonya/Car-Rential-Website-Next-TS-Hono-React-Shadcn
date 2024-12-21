"use client";
import AddCarSheet from "@/features/cars/components/AddCarSheet";
import UpdateCarSheet from "@/features/cars/components/UpdateCarSheet";
export const SheetProvider = () => {
  return (
    <>
      <AddCarSheet />
      <UpdateCarSheet />
    </>
  );
};
