"use client";

import Button from "@/components/common/button";
import APPLY_CATEGORY from "@/enums/APPLY_CATEGORY";
import { useRouter } from "next/navigation";

export default function RedirectApplicationButton({
  announcementId,
  detailId,
  isClosed,
}) {
  const router = useRouter();

  const handleRedirectApplication = () => {
    router.push(
      `/announcement/${announcementId}/${detailId}/apply?role=${APPLY_CATEGORY.PROVIDER}`
    );
  };

  return (
    <Button
      variant="primary"
      size="small"
      type="button"
      onClick={handleRedirectApplication}
      disabled={isClosed}
    >
      {isClosed ? "마감되었습니다" : "지원하기"}
    </Button>
  );
}
