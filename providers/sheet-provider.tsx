"use client";
import AddCarSheet from "@/screens/cars/components/AddCarSheet";
import UpdateCarSheet from "@/screens/cars/components/UpdateCarSheet";

export const SheetProvider = () => {
    return (
        <>
            <AddCarSheet />
            <UpdateCarSheet />
        </>
    );
};
