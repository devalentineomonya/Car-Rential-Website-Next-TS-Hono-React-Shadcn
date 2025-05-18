"use client";
import AddCarSheet from "@/screens/cars/components/AddCarSheet";
import UpdateCarSheet from "@/screens/cars/components/UpdateCarSheet";

import {useNewCar} from "@/hooks/use-new-car";
import {useEditCar} from "@/hooks/use-edit-car";

export const SheetProvider = () => {
    const {isOpen: isNewOpen} = useNewCar();
    const {isOpen: isEditOpen} = useEditCar();

    return (
        <>
            {isNewOpen && <AddCarSheet />}
            {isEditOpen && <UpdateCarSheet />}
        </>
    );
};
