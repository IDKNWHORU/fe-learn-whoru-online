"use client";

import { createContentComment } from "@/app/actions/content";
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
      {pending ? "댓글을 추가하는 중입니다..." : "댓글 추가하기"}
    </Button>
  );
};

export default function ContentCommentEditor({ contentId, usrId }) {
  const editorRef = useRef();

  const CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_REDIRECT_URI;
  const RESPONSE_TYPE = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_RESPONSE_TYPE;
  const SCOPE = process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_SCOPE;

  const handleCreateContentComment = async () => {
    const { editorInstance } = editorRef.current;

    try {
      await createContentComment({
        contentId,
        description: editorInstance.getMarkdown(),
      });

      alert("댓글이 추가되었습니다.");
      editorInstance.setMarkdown();
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleCreateContentComment}>
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
