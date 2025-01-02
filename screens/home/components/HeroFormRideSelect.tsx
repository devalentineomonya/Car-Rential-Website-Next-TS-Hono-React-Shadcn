import { Car } from "lucide-react";
import { IoCarSportOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";

import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const rideTypes = [
  { label: "Ride", value: "ride", icon: <IoCarSportOutline size={24} /> },
  { label: "Deliver", value: "deliver", icon: <PiPackage size={24} /> },
  { label: "Rent", value: "rent", icon: <Car size={24} /> },
];

const HeroFormRideSelect = ({
  selectedRide,
  onSelectRide,
}: {
  selectedRide: string;
  onSelectRide: (ride: string) => void;
}) => (
  <RadioGroup
    value={selectedRide}
    onValueChange={onSelectRide}
    className="flex items-center justify-center space-x-4"
  >
    {rideTypes.map((ride) => (
      <FormLabel
        key={ride.value}
        htmlFor={ride.value}
        className={`flex items-center justify-center flex-col cursor-pointer ${
          selectedRide === ride.value ? "text-black dark:text-white " : "text-gray-600 dark:text-gray-300"
        }`}
      >
        <RadioGroupItem id={ride.value} value={ride.value} hidden aria-hidden />
        <span
          className={`p-3 rounded-md ${
            selectedRide === ride.value
              ? "bg-gray-800 dark:bg-gray-200 dark:text-black text-white "
              : "bg-gray-300 dark:bg-gray-500"
          }`}
        >
          {ride.icon}
        </span>
        <span className="font-normal text-center w-full mt-1">{ride.label}</span>
      </FormLabel>
    ))}
  </RadioGroup>
);

export default HeroFormRideSelect;
