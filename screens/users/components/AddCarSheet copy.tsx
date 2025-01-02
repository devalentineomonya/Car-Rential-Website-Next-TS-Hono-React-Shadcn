import React, {useState} from "react";
import { FormProvider, useForm } from "react-hook-form";

import {ScrollArea} from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
const AddUserSheet: React.FC = () => {
const [isOpen, setIsOpen] = useState(false);
const methods = useForm();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle>Add Car</SheetTitle>
          <SheetDescription>
            Fill out the form to add a new car.
          </SheetDescription>
        </SheetHeader>

        <FormProvider {...methods} >
          <ScrollArea className="h-screen pb-28 pr-4">


          </ScrollArea>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default AddUserSheet;
