import MainLayout from "@/components/common/layouts/MainLayout";
import CarManagement from "@/screens/cars/widgets/CarManagement";
const CarsPage = () => {
  return (
    <MainLayout className="max-w-full px-4">
      <CarManagement />
    </MainLayout>
  );
};

export default CarsPage;
