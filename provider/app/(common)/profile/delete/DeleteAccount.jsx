"use client";

import { deleteAccount } from "@/app/actions/account";
import Button from "@/components/common/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="primary" size="large" type="submit" disabled={pending}>
      {pending ? "탈퇴 처리중입니다..." : "탈퇴신청"}
    </Button>
  );
};

export default function DeleteAccount() {
  const router = useRouter();

  const handleDeleteAccount = async (e) => {
    try {
      const isDeleted = confirm("탈퇴를 진행하시겠습니까?");

      if (!isDeleted) return;

      await deleteAccount();
      alert("탈퇴 신청이 완료되었습니다.");

      router.replace("/");
      router.refresh();
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleDeleteAccount}>
      <div className="frame-157">
        <SubmitButton />
      </div>
    </form>
  );
}
