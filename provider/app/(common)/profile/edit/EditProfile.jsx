"use client";

import { updateProfile } from "@/app/actions/account";
import { uploadImage } from "@/functions/actions/ImageUpload";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import editprofilestyle from "./editprofile.module.css";
import Button from "@/components/common/button";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="primary" size="large" type="submit" disabled={pending}>
      {pending ? (
        <>
          프로필을 업데이트 중입니다...
          <br />
          잠시만 기다려 주세요 😊
        </>
      ) : (
        "프로필 저장"
      )}
    </Button>
  );
};

export default function EditProfile({ profile }) {
  const editorRef = useRef(null);
  const avatarRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar);

  if (!profile)
    return (
      <p>사용자 데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p>
    );

  const handleUpdateProfile = async (profileFormData) => {
    const nick = profileFormData.get("nick");
    const phoneNumber = profileFormData.get("phone_number");
    const { editorInstance } = editorRef.current;

    if (nick == null || nick.trim() == "") {
      alert("닉네임을 입력해 주세요 😊");
      return;
    }

    if (!phoneNumber) {
      alert("연락처를 입력해 주시면 더 빠르게 도와드릴 수 있어요! 📱");
      return;
    }

    const phonePattern = /^(010|011|016|017|018|019)\d{7,8}$/;
    if (!phonePattern.test(phoneNumber)) {
      alert(
        "유효한 휴대폰 번호를 입력해 주세요. 예: 01012345678 또는 0191234567 📞"
      );
      return;
    }

    const selfIntro = editorInstance.getMarkdown();

    if (selfIntro.length > 1000) {
      alert(`자기소개 자리수 한계를 넘었습니다 (${selfIntro.length} / 1000)`);
      return;
    }

    try {
      await updateProfile({
        nick: nick,
        phnNmb: phoneNumber,
        selfIntro,
        avatar: avatarRef.current.dataset.url,
      });

      alert("프로필이 성공적으로 업데이트되었습니다! 🎉");
    } catch ({ message }) {
      alert(message | "오류가 발생했어요. 다시 시도해 보시겠어요? 😥");
    }
  };

  const handleClickAvatarButton = (e) => {
    avatarRef.current.click();
  };

  const handleUploadImage = async (e) => {
    const avatarUploadFormData = new FormData();

    avatarUploadFormData.append("image", e.target.files[0]);

    const uploadAvatarImageResponse = await uploadImage(avatarUploadFormData);

    e.target.dataset.url = uploadAvatarImageResponse;
    setAvatarUrl(uploadAvatarImageResponse);
  };

  return (
    <form
      className={editprofilestyle.editProfileForm}
      action={handleUpdateProfile}
    >
      <div>
        <div className={editprofilestyle.editProfileFormInner}>
          <div className={editprofilestyle.eidtProfileInputFieldSet}>
            <label
              className={editprofilestyle.editProfileLabel}
              htmlFor="avatar"
            >
              이미지
            </label>
            <div>
              <Image
                src={avatarUrl}
                alt="아바타"
                width={60}
                height={60}
                onClick={handleClickAvatarButton}
              />
              <input
                ref={avatarRef}
                type="file"
                id="avatar"
                name="avatar"
                data-url={avatarUrl}
                onChange={handleUploadImage}
              />
            </div>
          </div>
          <div className={editprofilestyle.eidtProfileInputFieldSet}>
            <label className={editprofilestyle.editProfileLabel} htmlFor="nick">
              닉네임 *
            </label>
            <input
              className={editprofilestyle.editProfileInputField}
              type="text"
              name="nick"
              id="nick"
              placeholder="사용할 닉네임을 입력하세요. 예: 루덴스 ✨"
              defaultValue={profile.nick}
              maxLength={30}
              autoComplete="off"
            />
            <ul className={editprofilestyle.editProfileHintList}>
              <li>닉네임은 30자를 초과할 수 없습니다</li>
            </ul>
          </div>
          <div className={editprofilestyle.eidtProfileInputFieldSet}>
            <label
              className={editprofilestyle.editProfileLabel}
              htmlFor="phone_number"
            >
              핸드폰번호 *
            </label>
            <input
              className={editprofilestyle.editProfileInputField}
              type="tel"
              name="phone_number"
              id="phone_number"
              placeholder="휴대폰 번호를 입력해 주세요. 예: 01012345678 📞"
              defaultValue={profile.phnNmb}
              maxLength={11}
              autoComplete="off"
            />
            <ul className={editprofilestyle.editProfileHintList}>
              <li>
                휴대폰 번호는 '010', '011', '016', '017', '018', '019'로
                시작해야 합니다
              </li>
              <li>하이픈(-) 없이 숫자만 입력해 주세요. 예: 01012345678</li>
            </ul>
          </div>
          <div className={editprofilestyle.eidtProfileInputFieldSet}>
            <label className={editprofilestyle.editProfileLabel}>
              자기소개
            </label>
            <div className={editprofilestyle.editProfileTextAreaField}>
              <Editor
                editorRef={editorRef}
                content={profile.selfIntro}
                height="100%"
              />
            </div>
            <ul className={editprofilestyle.editProfileHintList}>
              <li>자기소개는 1000자를 초과할 수 없습니다</li>
            </ul>
          </div>
          <div className={editprofilestyle.editProfileSubmitButtonOuter}>
            <SubmitButton />
          </div>
          <div className={editprofilestyle.leaveOuter}>
            <Link className={editprofilestyle.leave} href="/profile/delete">
              회원 탈퇴 페이지로 이동하기
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
