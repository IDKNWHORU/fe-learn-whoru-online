"use client";

import { createWorkContent } from "@/app/actions/work";
import Button from "@/components/common/Button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="primary"
      size="medium"
      type="submit"
      icon="/icon_plus_white.png"
      disabled={pending}
    >
      {pending ? "추가중..." : "작업물 추가"}
    </Button>
  );
};

export default function WorkContentCreateButton({ workId }) {
  const handleCreateWorkContent = async () => {
    try {
      await createWorkContent({ workId });
      alert("작업물을 추가했습니다.");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form className="flex-end margin1" action={handleCreateWorkContent}>
      <SubmitButton />
    </form>
  );
}
