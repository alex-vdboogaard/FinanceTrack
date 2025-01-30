import Separator from "./Separator";
import ProfilePhotoSection from "./Account-Sections/ProfilePictureSection";
import FullNameSection from "./Account-Sections/FullNameSection";
export default function UserAccountModal({ user, creditScore, netWorth }) {
  return (
    <>
      <h2 className="h2" style={{ marginTop: "0px" }}>
        Account
      </h2>
      <Separator top={true}></Separator>
      <ProfilePhotoSection></ProfilePhotoSection>
      <Separator></Separator>
      <FullNameSection></FullNameSection>
      <Separator></Separator>
    </>
  );
}
