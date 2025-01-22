import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/ui/icons";
import { useDeleteCarMutation } from "@/features/cars/api/use-delete-car";
import { useDeleteCar } from "@/hooks/use-delete-car";

const DeleteCarDialog = () => {
  const { isOpen, onClose, id } = useDeleteCar();
  const deleteCar = useDeleteCarMutation();

  const handleDeleteCar = async () => {
    try {
      const response = await deleteCar.mutateAsync(id);
      if (response.id) {
        toast.success(`Car ${response.id} has been deleted successfully`);
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred, Kindly try again!");
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this car
            and remove all data associated with it from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCar}>
            {deleteCar.isPending ? (
              <div className="flex items-center space-x-2">
                <Icons.spinner className="animate-spin size-6" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCarDialog;
