import { IoCarSportOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { Car } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormLabel } from "@/components/ui/form";

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
          selectedRide === ride.value ? "text-white" : "text-gray-300"
        }`}
      >
        <RadioGroupItem id={ride.value} value={ride.value} hidden aria-hidden />
        <span
          className={`p-3 rounded-md ${
            selectedRide === ride.value
              ? "bg-gray-200 text-black"
              : "bg-gray-500"
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
