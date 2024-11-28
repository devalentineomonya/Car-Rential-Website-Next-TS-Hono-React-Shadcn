import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
  import {useNewCar} from "@/hooks/use-new-car"
const AddCarSheet = () => {
  const {isOpen,onClose} = useNewCar()
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
  
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  )
}

export default AddCarSheet