import MainLayout from "@/components/common/layouts/MainLayout";
import DashboardHeader from "@/components/common/shared/DashboardHeader";
import CarManagement from "@/screens/cars/widgets/CarManagement";
const CarsPage = () => {
  return (
    <MainLayout className="max-w-8xl">
      <DashboardHeader
        title="Car Management"
        description="Manage your car listings and preferences."
      />
      <CarManagement />
    </MainLayout>
  );
};

export default CarsPage;
