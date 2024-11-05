"use client";

import { deleteContent } from "@/app/(admin)/community-management/actions";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`button2 caption-12 ${
        pending ? "color-gray-04" : "color-red"
      }`}
      type="submit"
      disabled={pending}
    >
      삭제하기
    </button>
  );
};

export default function DeleteContentButton({ communityId }) {
  const handleDeleteContent = async () => {
    const isDelete = confirm("콘텐츠를 삭제하시겠습니까?");

    if (!isDelete) return;

    try {
      await deleteContent({ communityId });
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
