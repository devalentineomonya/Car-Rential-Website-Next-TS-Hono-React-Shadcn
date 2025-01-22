import React from "react";
import { FiCheckCircle } from "react-icons/fi";
const GeneralInformation = () => {
  return (
    <div className="mt-6">
      <h2 className="font-semibold font-foreground text-3xl md:text-4xl ">
        Know about our car service
      </h2>
      <p className="mt-3">
        Anim occaecat veniam ut et cillum aliqua nulla eu anim adipisicing.Esse
        esse sit ea reprehenderit officia.Amet culpa cupidatat excepteur
        reprehenderit eu adipisicing irure est consectetur culpa officia ipsum
        ullamco.Fugiat qui elit incididunt officia aliqua eiusmod nisi elit
        reprehenderit fugiat quis.
      </p>
      <ul className="mt-6">
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

export default GeneralInformation;
