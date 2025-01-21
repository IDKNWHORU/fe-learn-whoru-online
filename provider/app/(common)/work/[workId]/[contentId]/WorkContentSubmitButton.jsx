"use client";

import { submitWorkContent } from "@/app/actions/work";
import Button from "@/components/common/Button";
import style from "@/components/common/button.module.css";
import WORK_CONTENT_STATUS from "@/enums/WORK_CONTENT_STATUS";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="ghost"
      size="medium"
      icon="/icon_flag_purple01.png"
      className={`${style.purple} ${style.h4_20}`}
      type="submit"
      disabled={pending}
    >
      {pending ? "제출중..." : "제출하기"}
    </Button>
  );
};

export default function WorkContentSubmitButton({ detailContent }) {
  const handleSubmitWorkContent = async () => {
    try {
      await submitWorkContent({
        detailContent,
        status: WORK_CONTENT_STATUS.SUBMIT,
      });
      alert("작업물이 제출되었습니다.");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleSubmitWorkContent}>
      <SubmitButton />
    </form>
  );
}
