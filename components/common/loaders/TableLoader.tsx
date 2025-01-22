import React from "react";

import { Icons } from "@/components/ui/icons";

const TableLoader = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <Icons.spinner className="animate-spin" />
    </div>
  );
};

export default TableLoader;
