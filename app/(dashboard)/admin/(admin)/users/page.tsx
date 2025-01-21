import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import DashboardHeader from "@/components/common/shared/DashboardHeader";
const Users = () => {
  return (
    <MainLayout>
      <DashboardHeader
        title="User Management"
        description="Manage your user listings and preferences."
      />
      <div>Users</div>
    </MainLayout>
  );
};

export default Users;
