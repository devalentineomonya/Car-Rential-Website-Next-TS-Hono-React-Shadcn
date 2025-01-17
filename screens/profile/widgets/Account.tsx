"use client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import LoaderWrapper from "@/components/common/loaders/LoaderWrapper";
import { useGetUser } from "@/features//users/api/use-get-user";

import ChangePassword from "../components/ChangePassword";
import PersonalInfo from "../components/PersonalInfo";
import ProfileImage from "../components/ProfileImage";

const Account = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { data, isLoading, isError,error } = useGetUser(user?.id);
  if (!isSignedIn || !user?.id) return toast.error("Not logged in or user not found");


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
  if(isError){
    toast.error( error.message || "An error occurred while fetching user data");
  }

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
