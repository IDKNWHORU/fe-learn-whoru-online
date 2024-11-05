import { headers } from "next/headers";
import Footer from "./aisde/Footer";
import GnbMenu from "./aisde/GnbMenu";
import Logo1 from "./aisde/Logo1";
import Logout from "./aisde/Logout";

export default async function Navigation() {
  const headerList = headers();

  const userRight = headerList.get("x-user-right");
  const pathName = headerList.get("x-path-name");

  const CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_REDIRECT_URI;
  const RESPONSE_TYPE = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_RESPONSE_TYPE;
  const SCOPE = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_SCOPE;

  if (pathName === "/sign-up") return null;

  const { prv, adm } = userRight
    ? JSON.parse(userRight)
    : { prv: false, adm: false };

  return (
    <aside className="aside">
      <header className="header">
        <Logo1 />
        <nav className="gnb">
          {userRight == null ? (
            <GnbMenu
              href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&access_type=offline&prompt=consent`}
              iconClass="icon-profile"
              src="/icon_gnb_profile.png"
              alt="로그인 페이지로 이동하기"
              width={24}
              height={24}
              text="로그인"
            />
          ) : (
            <>
              <Logout />
              <GnbMenu
                href="/profile"
                iconClass="icon-profile"
                src="/icon_gnb_profile.png"
                alt="프로필 페이지로 이동하기"
                width={24}
                height={24}
                text="프로필"
              />
            </>
          )}
          <GnbMenu
            href="/announcement"
            iconClass="icon-announcement"
            src="/icon_gnb_mission.png"
            alt="공고 지원 페이지로 이동하기"
            width={24}
            height={24}
            text="공고 지원"
          />
          <GnbMenu
            href="/work"
            src="/icon_gnb_work.png"
            alt="작업 수행 페이지로 이동하기"
            width={24}
            height={24}
            text="작업 수행"
          />
          <GnbMenu
            href="/participation"
            src="/icon_gnb_learning.png"
            alt="학습 참여 페이지로 이동하기"
            width={24}
            height={24}
            text="학습 참여"
          />
          <GnbMenu
            href="/community"
            src="/icon_gnb_community.png"
            alt="커뮤니티 페이지로 이동하기"
            width={24}
            height={24}
            text="커뮤니티"
          />
          {prv ? (
            <details>
              <summary className="gnb-menu-wrapper">검증자</summary>
              <div className="line-gray-05" />
              <GnbMenu
                href="/mission"
                src="/icon_gnb_work.png"
                alt="미션 관리 페이지로 이동하기"
                width={24}
                height={24}
                text="미션 관리"
              />
            </details>
          ) : null}
          {adm ? (
            <details>
              <summary className="gnb-menu-wrapper">관리자</summary>
              <div className="line-gray-05" />
              <GnbMenu
                href="/announcement-management"
                iconClass="icon-announcement"
                src="/icon_gnb_mission.png"
                alt="공고 관리 페이지로 이동하기"
                width={24}
                height={24}
                text="공고 관리"
              />
              <GnbMenu
                href="/work-management"
                src="/icon_gnb_work.png"
                alt="작업 관리 페이지로 이동하기"
                width={24}
                height={24}
                text="작업 관리"
              />
              <GnbMenu
                href="/learning-management"
                src="/icon_gnb_learning.png"
                alt="학습 관리 페이지로 이동하기"
                width={24}
                height={24}
                text="학습 관리"
              />
              <GnbMenu
                href="/community-management"
                src="/icon_gnb_community.png"
                alt="커뮤니티 관리 페이지로 이동하기"
                width={24}
                height={24}
                text="커뮤니티 관리"
              />
              <GnbMenu
                href="/user-management"
                iconClass="icon-profile"
                src="/icon_gnb_profile.png"
                alt="사용자 관리 페이지로 이동하기"
                width={24}
                height={24}
                text="사용자 관리"
              />
            </details>
          ) : null}
        </nav>
      </header>
      <Footer />
    </aside>
  );
}
