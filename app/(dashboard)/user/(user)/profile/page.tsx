import React from 'react'
import Account from '@/features/profile/widgets/Account';
import Header from '@/features/profile/components/Header';
import MainLayout from '@/components/common/layouts/MainLayout'
const Profile = () => {
  return (
    <MainLayout>
      <Header />
      <Account />
    </MainLayout>
  );
}

export default Profile