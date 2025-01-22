import React from "react";
import { FiCheckCircle } from "react-icons/fi";
const PremiumFeatures = () => {
  return (
    <div className="mt-6">
      <h2 className="font-semibold font-foreground text-3xl md:text-4xl ">
        Premium Features
      </h2>
      <ul className="mt-6 grid grid-cols-3 gap-4">
        <li className="flex items-center gap-x-2">
          <FiCheckCircle size={16} className="text-foreground" />
          <span className="font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet
          </span>
        </li>
        <li className="flex items-center gap-x-2 mt-2">
          <FiCheckCircle size={16} className="text-foreground" />
          <span className="font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet
          </span>
        </li>
        <li className="flex items-center gap-x-2 mt-2">
          <FiCheckCircle size={16} className="text-foreground" />
          <span className="font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet
          </span>
        </li>
        <li className="flex items-center gap-x-2 mt-2">
          <FiCheckCircle size={16} className="text-foreground" />
          <span className="font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet
          </span>
        </li>
        <li className="flex items-center gap-x-2 mt-2">
          <FiCheckCircle size={16} className="text-foreground" />
          <span className="font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PremiumFeatures;
