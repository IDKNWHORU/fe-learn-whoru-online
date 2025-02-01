"use client";

import { updateAnnouncementApplication } from "@/app/actions/announcement";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="primary" size="large" type="submit" disabled={pending}>
      {pending ? "지원서를 제출하는 중입니다..." : "제출하기"}
    </Button>
  );
};

export default function EditApplyForm({
  announcementId,
  detailId,
  application,
}) {
  const editorRef = useRef();

  const handleApplyForm = async () => {
    const { editorInstance } = editorRef.current;

    try {
      updateAnnouncementApplication({
        announcementId,
        detailId,
        application,
        description: editorInstance.getMarkdown(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form className="frame-116" action={handleApplyForm}>
      <Input
        type="text"
        label="제목"
        name="title"
        id="title"
        defaultValue={application.title}
        readOnly
      />
      <div className="input-2">
        <p className="h5-16 color-gray-03">내용</p>
        <div className="frame-102-4 background-white content-editor">
          <Editor
            editorRef={editorRef}
            height="100%"
            content={application.description}
          />
        </div>
      </div>
      <div className="frame-157">
        <SubmitButton />
      </div>
    </form>
  );
}
