"use client";

import { CreateMissionComment } from "@/app/actions/mission";
import Button from "@/components/common/Button";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="primary" size="large" type="submit" disabled={pending}>
      {pending ? "댓글을 작성하는 중입니다..." : "작성하기"}
    </Button>
  );
};

export default function MissionSubmitCommentEditor({
  learningId,
  curriculumId,
  missionId,
  usrId,
}) {
  const CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_REDIRECT_URI;
  const RESPONSE_TYPE = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_RESPONSE_TYPE;
  const SCOPE = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_SCOPE;

  const editorRef = useRef();

  const handleCreateMissionSubmitComment = async () => {
    const { editorInstance } = editorRef.current;

    try {
      await CreateMissionComment({
        learningId,
        curriculumId,
        missionId,
        usrId,
        description: editorInstance.getMarkdown(),
      });
      alert("댓글이 추가되었습니다.");
      editorInstance.setMarkdown();
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleCreateMissionSubmitComment}>
      <div className="frame-102-2">
        <Editor editorRef={editorRef} content="" height="100%" />
      </div>
      <div className="frame-148">
        {usrId === null ? (
          <Link
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&access_type=offline&prompt=consent`}
          >
            로그인
          </Link>
        ) : (
          <SubmitButton />
        )}
      </div>
    </form>
  );
}
