import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import DashboardHeader from "@/components/common/shared/DashboardHeader";
import Account from "@/features/profile/widgets/Account";
const Profile = () => {
  return (
    <MainLayout>
      <DashboardHeader
        title="Account Setting"
        description="Manage your account settings and preferences."
      />
      <Account />
    </MainLayout>
  );
};

export default Profile;
