"use client";

import { useFormStatus } from "react-dom";
import { pinContent, unpinContent } from "../actions";

const SubmitButton = ({ isPinned }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`caption-12 ${isPinned ? "" : "color-gray-04"}`}
      type="submit"
      disabled={pending}
    >
      고정
    </button>
  );
};

export default function PinContentButton({ communityId, isPinned }) {
  const handlePinContent = async () => {
    try {
      if (isPinned) {
        await unpinContent({ communityId });
      } else {
        await pinContent({ communityId });
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handlePinContent}>
      <SubmitButton isPinned={isPinned} />
    </form>
  );
}
