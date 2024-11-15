"use client";

import { useRef } from "react";
import footerstyle from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Contributors() {
  const dialogRef = useRef();

  const handleOpenContributorsModal = (e) => {
    e.preventDefault();
    dialogRef.current.showModal();
  };

  const handleCloseContributorModal = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <Link
        href=""
        className={footerstyle.contributorsButton}
        type="button"
        onClick={handleOpenContributorsModal}
      >
        <Image
          src="/icon_medal.png"
          width={16}
          height={16}
          alt="기여자 목록 확인하기"
        />
        Contributors
      </Link>
      <dialog className={footerstyle.contributorsModal} ref={dialogRef}>
        <header className={footerstyle.contributorsHeader}>
          <h4 className={footerstyle.contributorsTitle}>기여자 목록</h4>
          <Image
            src="/icon_medal.png"
            width={16}
            height={16}
            alt="기여자 목록 표시"
          />
        </header>
        <ul className={footerstyle.contributorList}>
          <li className={footerstyle.contributor}>
            <Image
              className={footerstyle.contributorImage}
              src="https://cdn.discordapp.com/avatars/942375190434840586/77a41393807c98442bf8cfbcd3d6f6f2.webp?size=240
              agwn"
              width={35}
              height={35}
              alt="agwn 프로필 확인하기"
            />
            <Link
              className={footerstyle.contributorLink}
              href="https://github.com/LudiumAgwn"
              target="_blank"
            >
              agwn
            </Link>
          </li>
          <li className={footerstyle.contributor}>
            <Image
              className={footerstyle.contributorImage}
              src="https://avatars.githubusercontent.com/u/151835493?v=4"
              width={35}
              height={35}
              alt="basky 프로필 확인하기"
            />
            <Link
              className={footerstyle.contributorLink}
              href="https://github.com/ludiumbasky"
              target="_blank"
            >
              basky
            </Link>
          </li>
          <li className={footerstyle.contributor}>
            <Image
              className={footerstyle.contributorImage}
              src="https://avatars.githubusercontent.com/u/49608580?s=70&v=4"
              width={35}
              height={35}
              alt="whoru 프로필 확인하기"
            />
            <Link
              className={footerstyle.contributorLink}
              href="https://github.com/IDKNWHORU"
              target="_blank"
            >
              whoru
            </Link>
          </li>
          <li className={footerstyle.contributor}>
            <Image
              className={footerstyle.contributorImage}
              src="https://avatars.githubusercontent.com/u/54282927?v=4"
              width={35}
              height={35}
              alt="won 프로필 확인하기"
            />
            <Link
              className={footerstyle.contributorLink}
              href="https://github.com/woon999"
              target="_blank"
            >
              won
            </Link>
          </li>
          <li className={footerstyle.contributor}>
            <Image
              className={footerstyle.contributorImage}
              src="https://avatars.githubusercontent.com/u/119479530?v=4"
              width={35}
              height={35}
              alt="fori 프로필 확인하기"
            />
            <Link
              className={footerstyle.contributorLink}
              href="https://github.com/dongkyun2331"
              target="_blank"
            >
              fori
            </Link>
          </li>
          <li className={footerstyle.contributor}>
            <Image
              className={footerstyle.contributorImage}
              src="https://pbs.twimg.com/profile_images/1605216555226107906/m4tumUuY_200x200.jpg"
              width={35}
              height={35}
              alt="Blynn 프로필 확인하기"
            />
            <Link
              className={footerstyle.contributorLink}
              href="https://twitter.com/0xBlynn"
              target="_blank"
            >
              Blynn
            </Link>
          </li>
        </ul>
        <div className={footerstyle.closeModalButtonArea}>
          <button
            className={footerstyle.closeModalButton}
            type="button"
            onClick={handleCloseContributorModal}
          >
            닫기
          </button>
        </div>
      </dialog>
    </>
  );
}
