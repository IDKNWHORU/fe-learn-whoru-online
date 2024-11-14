import BackButton from "@/components/BackButton";
import { getProfile } from "../page";
import EditProfile from "./EditProfile";
import editprofilestyle from "./editprofile.module.css";

export async function generateMetadata() {
  const profile = await getProfile();

  return {
    title: `${profile.nick} 프로필 수정`,
  };
}

export default async function EditProfilePage() {
  const profile = await getProfile();

  return (
    <>
      <header className="nb">
        <BackButton />
      </header>
      <section className={editprofilestyle.editProfilePage}>
        <article className={editprofilestyle.editProfilePageInner}>
          <header className={editprofilestyle.editProfilePageHeader}>
            <h1 className={editprofilestyle.editProfilePageTitle}>
              프로필 수정
            </h1>
          </header>
          <EditProfile profile={profile} />
        </article>
      </section>
    </>
  );
}
