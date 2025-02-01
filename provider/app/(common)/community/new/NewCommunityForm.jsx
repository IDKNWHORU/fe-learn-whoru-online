"use client";

import { createContent } from "@/app/actions/content";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import COMMUNITY_TYPE from "@/enums/COMMUNITY_TYPE";
import { uploadImage } from "@/functions/actions/ImageUpload";
import ko_kr from "@/langs/ko_kr";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="primary" size="large" type="submit">
      {pending ? "저장하는 중입니다..." : "저장하기"}
    </Button>
  );
};

export default function NewCommunityForm() {
  const editorRef = useRef();
  const bannerRef = useRef();
  const [bannerUrl, setBannerUrl] = useState("");

  const handleCreateContent = async (contentFormData) => {
    const { editorInstance } = editorRef.current;

    try {
      await createContent({
        type: contentFormData.get("type"),
        title: contentFormData.get("title"),
        description: editorInstance.getMarkdown(),
        banner: bannerRef.current.dataset.url,
      });
      alert("콘텐츠가 저장되었습니다.");
    } catch ({ message }) {
      alert(message);
    }
  };

  const handleIgnoreEnterKeyDown = (keydownEvent) => {
    if (keydownEvent.key === "Enter") keydownEvent.preventDefault();
  };

  const handleClickBannerButton = () => {
    bannerRef.current.click();
  };

  const handleUploadImage = async (e) => {
    const avatarUploadFormData = new FormData();

    avatarUploadFormData.append("image", e.target.files[0]);

    const uploadAvatarImageResponse = await uploadImage(avatarUploadFormData);

    e.target.dataset.url = uploadAvatarImageResponse;
    setBannerUrl(uploadAvatarImageResponse);
  };

  return (
    <form className="frame-116" action={handleCreateContent}>
      <Input
        type="text"
        placeholder="제목을 입력해주세요"
        label="제목"
        name="title"
        id="title"
        onKeyDown={handleIgnoreEnterKeyDown}
      />
      <Input type="select" label="유형" name="type" id="type">
        <option value={COMMUNITY_TYPE.CONTENT}>{ko_kr.CONTENT}</option>
        <option value={COMMUNITY_TYPE.QUESTION}>{ko_kr.QUESTION}</option>
        <option value={COMMUNITY_TYPE.FREE}>{ko_kr.FREE}</option>
      </Input>
      <div className="input-2">
        <label className="h5-16 color-gray-03" htmlFor="banner">
          배너
        </label>
        {bannerUrl === "" ? null : (
          <Image
            src={bannerUrl}
            alt="배너 이미지"
            width={400}
            height={116}
            onClick={handleClickBannerButton}
          />
        )}
        <input
          className="image-hidden"
          ref={bannerRef}
          type="file"
          id="banner"
          name="banner"
          data-url={bannerUrl}
          onChange={handleUploadImage}
        />
      </div>
      <div className="input-2">
        <p className="h5-16 color-gray-03">내용</p>
        <div className="frame-102-4 background-white content-editor">
          <Editor editorRef={editorRef} content="" height="100%" />
        </div>
      </div>
      <div className="frame-157">
        <SubmitButton />
      </div>
    </form>
  );
}
