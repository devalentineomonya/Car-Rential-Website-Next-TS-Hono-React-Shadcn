"use client";
import { useGetUser } from "@/state/users/api/use-get-users";
import { useUser } from "@clerk/nextjs";
import PersonalInfo from "../components/PersonalInfo";
import ProfileImage from "../components/ProfileImage";
import ChangePassword from "../components/ChangePassword";
import LoaderWrapper from "@/components/common/loaders/LoaderWrapper";

const Account = () => {
  const { user, isLoaded } = useUser();
  const { data, isLoading } = useGetUser(user?.id || "", isLoaded && !!user?.id);

  const userData = data || {
    id: "",
    clerk_id: "",
    email: "",
    firstName: "",
    lastName: "",
    location: "",
    address: "",
    phone: "",
  };

  return (
    <LoaderWrapper isLoading={!isLoaded || isLoading}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <ProfileImage />
        <ChangePassword />
      </div>
      <PersonalInfo data={userData} />
    </LoaderWrapper>
  );
};

export default Account;