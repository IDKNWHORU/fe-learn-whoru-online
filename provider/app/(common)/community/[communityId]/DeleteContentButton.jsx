"use client";

import { deleteContent } from "@/app/(admin)/community-management/actions";
import Button from "@/components/common/button";
import { useFormStatus } from "react-dom";
import style from "@/components/common/button.module.css";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="ghost"
      size="small"
      className={`${style.red} ${style.caption} ${pending ? style.grayed : ""}`}
      type="submit"
      disabled={pending}
    >
      삭제
    </Button>
  );
};

export default function DeleteContentButton({ communityId }) {
  const handleDeleteContent = async () => {
    const isDelete = confirm("콘텐츠를 삭제하시겠습니까?");

    if (!isDelete) return;

    try {
      await deleteContent({ communityId });
      alert("콘텐츠가 삭제되었습니다.");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleDeleteContent}>
      <SubmitButton />
    </form>
  );
}
