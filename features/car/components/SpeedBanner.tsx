import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SlSpeedometer, SlLockOpen } from "react-icons/sl";
const SpeedBanner = () => {
  return (
    <Alert className="bg-muted p-6 mt-6 rounded-lg">
      <AlertDescription className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <SlSpeedometer size={32} className="text-foreground" />
          <div>
            <h3 className="text-2xl font-semibold text-foreground">Unlimited KMs</h3>
            <p className="text-lg font-medium text-muted-foreground">Endless Km with no extra charge</p>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <SlLockOpen size={32} className="text-foreground" />
          <div>
            <h3 className="text-2xl font-semibold text-foreground">Unlimited KMs</h3>
            <p className="text-lg font-medium text-muted-foreground">Endless Km with no extra charge</p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SpeedBanner;
