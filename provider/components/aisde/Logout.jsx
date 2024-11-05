"use client";

import { logout } from "@/app/actions/logout";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <form className="gnb-menu-2" action={handleLogout}>
      <Image
        src="/icon_logout.png"
        width={24}
        height={24}
        alt="로그아웃"
      ></Image>
      <button className="text-wrapper h4-20 logout">로그아웃</button>
    </form>
  );
}
