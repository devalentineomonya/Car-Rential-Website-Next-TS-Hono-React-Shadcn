import PersonalInfo from "../components/PersonalInfo";
import ProfileImage from "../components/ProfileImage";
import ChangePassword from "../components/ChangePassword";
const Account = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <ProfileImage />
        <ChangePassword />
      </div>
      <PersonalInfo />
    </>
  );
};

export default Account;
