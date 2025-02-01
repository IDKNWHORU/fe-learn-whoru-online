"use client";

import {
  cancleRecommendContent,
  recommendContent,
} from "@/app/actions/content";
import Button from "@/components/common/button";
import style from "@/components/common/button.module.css";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ isContentRecommendExist }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="ghost"
      size="small"
      className={`${style.caption} ${
        isContentRecommendExist ? style.blue : style.grayed
      }`}
      type="submit"
      disabled={pending}
    >
      추천
    </Button>
  );
};

export default function ContentRecommendButton({
  contentId,
  isContentRecommendExist,
}) {
  const handleRecommendContent = async () => {
    try {
      if (isContentRecommendExist) {
        await cancleRecommendContent({ contentId });
        alert("추천이 해제되었습니다.");
      } else {
        await recommendContent({ contentId });
        alert("추천되었습니다.");
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleRecommendContent}>
      <SubmitButton isContentRecommendExist={isContentRecommendExist} />
    </form>
  );
}
