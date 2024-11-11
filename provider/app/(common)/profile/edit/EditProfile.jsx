"use client";

import { updateProfile } from "@/app/actions/account";
import { uploadImage } from "@/functions/actions/ImageUpload";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="button-L-2 background-purple-01 h5-16 color-white"
      disabled={pending}
    >
      {pending ? "프로필 적용을 진행중입니다..." : "프로필 적용"}
    </button>
  );
};

export default function EditProfile({ profile }) {
  const editorRef = useRef(null);
  const avatarRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar);

  if (!profile) return <p>사용자 데이터를 불러오지 못했습니다.</p>;

  const handleUpdateProfile = async (profileFormData) => {
    const { editorInstance } = editorRef.current;
    const selfIntro = editorInstance.getMarkdown();

    if (selfIntro.length > 1000) {
      alert("자기소개는 1000자를 넘을 수 없습니다");
      return;
    }

    try {
      await updateProfile({
        nick: profileFormData.get("nick"),
        phnNmb: profileFormData.get("phone_number"),
        selfIntro,
        avatar: avatarRef.current.dataset.url,
      });

      alert("프로필이 업데이트 되었습니다");
    } catch ({ message }) {
      alert(message);
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

  const handleInvalidNick = (e) => {
    if (e.target.value) {
    } else {
      e.target.setCustomValidity("닉네임을 입력해주세요");
    }
  };

  const handleInputNick = (e) => {
    e.target.setCustomValidity("");
  };

  const handleInvalidPhone = (e) => {
    if (e.target.value) {
      e.target.setCustomValidity("휴대폰번호를 올바르게 입력해주세요");
    } else {
      e.target.setCustomValidity("휴대폰번호를 입력해주세요");
    }
  };

  const handleInputPhone = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <form
      className="frame-34-10 background-white border-gray-06"
      action={handleUpdateProfile}
    >
      <div className="frame-117">
        <div className="frame-116">
          <div className="input-2">
            <label className="h5-16 color-gray-03" htmlFor="avatar">
              이미지
            </label>
            <div className="group-8">
              <Image
                className="avatar"
                src={avatarUrl}
                alt="아바타"
                width={60}
                height={60}
                onClick={handleClickAvatarButton}
              />
              <input
                className="avatar-hidden"
                ref={avatarRef}
                type="file"
                id="avatar"
                name="avatar"
                data-url={avatarUrl}
                onChange={handleUploadImage}
              />
            </div>
          </div>
          <div className="input-2">
            <label className="h5-16 color-gray-03" htmlFor="nick">
              닉네임 *
            </label>
            <input
              className="frame-102-3 background-white border-gray-05 p1-18 color-gray-04"
              type="text"
              name="nick"
              id="nick"
              placeholder="닉네임을 입력하세요"
              defaultValue={profile.nick}
              onInvalid={handleInvalidNick}
              onInput={handleInputNick}
              maxLength={30}
              required
              autoComplete="off"
            />
            <ul className="hint-list">
              <li>닉네임은 30자를 초과할 수 없습니다</li>
            </ul>
          </div>
          <div className="input-2">
            <label className="h5-16 color-gray-03" htmlFor="phone_number">
              핸드폰번호 *
            </label>
            <input
              className="frame-102-3 background-white border-gray-05 p1-18 color-gray-04"
              type="tel"
              name="phone_number"
              id="phone_number"
              placeholder="01012345678"
              onInvalid={handleInvalidPhone}
              onInput={handleInputPhone}
              defaultValue={profile.phnNmb}
              pattern="^(010|011|016|017|018|019|02)\d{7,8}$"
              maxLength={11}
              required
            />
            <ul className="hint-list">
              <li>'-' 없이 입력해주세요</li>
              <li>숫자만 입력해주세요</li>
              <li>
                전화번호는 '02' 또는 '010' 같은 번호로 시작하고, 총 9~11자리
                숫자여야 합니다
              </li>
            </ul>
          </div>
          <div className="input-2">
            <label className="h5-16 color-gray-03">자기소개</label>
            <div className="frame-102-4 background-white content-editor">
              <Editor
                editorRef={editorRef}
                content={profile.selfIntro}
                height="100%"
              />
            </div>
            <ul className="hint-list">
              <li>자기소개는 1000자를 초과할 수 없습니다</li>
            </ul>
          </div>
          <div className="frame-157">
            <SubmitButton />
          </div>
          <div className="frame-157">
            <Link className="link" href="/profile/delete">
              <p className="p5-18 color-alert">회원 탈퇴 페이지로 이동</p>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
