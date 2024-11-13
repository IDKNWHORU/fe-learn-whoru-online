"use client";

import { signup } from "@/app/actions/account";
import { uploadImage } from "@/functions/actions/ImageUpload";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import signupstyle from "./signup.module.css";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className={signupstyle.signupButton} disabled={pending}>
      {pending
        ? "잠시만 기다려 주세요, 회원가입을 처리 중입니다... ⏳"
        : "지금 바로 가입하기 🚀"}
    </button>
  );
};

export default function SignUp() {
  const router = useRouter();
  const editorRef = useRef(null);
  const avatarRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("/icon_default_profile.png");

  const handleSignup = async (signupUserData) => {
    const nick = signupUserData.get("nick");
    const phoneNumber = signupUserData.get("phone_number");
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
      await signup({
        nick,
        phnNmb: phoneNumber,
        selfIntro,
        avatar: avatarRef.current.dataset.url,
      });

      alert(
        "🎉 축하합니다! 회원가입이 완료되었습니다. 이제 서비스를 이용해 보세요!"
      );
      router.replace("/");
      router.refresh();
    } catch ({ message }) {
      alert(message || "오류가 발생했어요. 다시 시도해 보시겠어요? 😥");
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
    <form action={handleSignup}>
      <div>
        <div className={signupstyle.signupForm}>
          <div>
            <h1 className={signupstyle.signupHeader}>회원가입</h1>
          </div>
          <div className={signupstyle.signupInputFieldSet}>
            <label className={signupstyle.signupLabel} htmlFor="avatar">
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
          <div className={signupstyle.signupInputFieldSet}>
            <label className={signupstyle.signupLabel} htmlFor="nick">
              닉네임 *
            </label>
            <input
              className={signupstyle.signupInputField}
              type="text"
              name="nick"
              id="nick"
              placeholder="사용할 닉네임을 입력하세요. 예: 루덴스 ✨"
              maxLength={30}
              autoComplete="off"
            />
            <ul className={signupstyle.signupHintList}>
              <li>닉네임은 30자를 초과할 수 없습니다</li>
            </ul>
          </div>
          <div className={signupstyle.signupInputFieldSet}>
            <label className={signupstyle.signupLabel} htmlFor="phone_number">
              핸드폰번호 *
            </label>
            <input
              className={signupstyle.signupInputField}
              type="tel"
              name="phone_number"
              id="phone_number"
              placeholder="휴대폰 번호를 입력해 주세요. 예: 01012345678 📞"
              maxLength={11}
              autoComplete="off"
            />
            <ul className={signupstyle.signupHintList}>
              <li>
                휴대폰 번호는 '010', '011', '016', '017', '018', '019'로
                시작해야 합니다
              </li>
              <li>하이픈(-) 없이 숫자만 입력해 주세요. 예: 01012345678</li>
            </ul>
          </div>
          <div className={signupstyle.signupInputFieldSet}>
            <label className={signupstyle.signupLabel}>자기소개</label>
            <div className={signupstyle.signupTextAreaField}>
              <Editor editorRef={editorRef} height="100%" />
            </div>
            <ul className={signupstyle.signupHintList}>
              <li>자기소개는 1000자를 초과할 수 없습니다</li>
            </ul>
          </div>
          <div className={signupstyle.signupSubmitButtonOuter}>
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
}
