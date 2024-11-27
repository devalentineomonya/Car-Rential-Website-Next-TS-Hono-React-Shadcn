import React from "react";
import Account from "@/features/profile/widgets/Account";
import DashboardHeader from "@/components/common/shared/DashboardHeader";
import MainLayout from "@/components/common/layouts/MainLayout";
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
