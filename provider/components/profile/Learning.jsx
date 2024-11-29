import fetchWithRetry from "@/functions/api";
import { LearningListWithData } from "./client-component/LearningListWithData";

async function getLearningList(usrId) {
  const getLearningListResponse = await fetchWithRetry(
    `/profile/${usrId}/learning/top4`
  );

  if (!getLearningListResponse.ok)
    if (getLearningListResponse.status === 404) return [];
    else throw new Error("학습을 조회하는 중 에러가 발생했습니다.");

  return await getLearningListResponse.json();
}

export default async function Learning({ usrId }) {
  const learningsPromise = getLearningList(usrId);

  return <LearningListWithData promise={learningsPromise} />;
}
