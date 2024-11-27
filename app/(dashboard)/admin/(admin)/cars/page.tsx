import CarManagement from "@/features/cars/widgets/CarManagement";
import DashboardHeader from "@/components/common/shared/DashboardHeader";
import MainLayout from "@/components/common/layouts/MainLayout";
const CarsPage = () => {
  return (
    <MainLayout>
      <DashboardHeader
        title="Car Management"
        description="Manage your car listings and preferences."
      />
      <CarManagement />
    </MainLayout>
  );
};

export default CarsPage;
