import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import DashboardHeader from "@/components/common/shared/DashboardHeader";
import UserManagement from "@/screens/users/components/UserManagement";
const Users = () => {
  return (
    <MainLayout>
      <DashboardHeader
        title="User Management"
        description="Manage your user listings and preferences."
      />
      <UserManagement />
    </MainLayout>
  );
};

export default Users;
