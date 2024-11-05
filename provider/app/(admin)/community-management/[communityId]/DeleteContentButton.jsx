"use client";

import { useFormStatus } from "react-dom";
import { deleteContent } from "../actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`caption-12 ${pending ? "color-gray-04" : "color-red"}`}
      type="submit"
      disabled={pending}
    >
      삭제하기
    </button>
  );
};

export default function DeleteContentButton({ communityId }) {
  const handleDeleteContent = async () => {
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
