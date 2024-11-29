import fetchWithRetry from "@/functions/api";
import { WorkListWithData } from "./client-component/WorkListWithData";

async function getWorkList(usrId) {
  const getWorkListResponse = await fetchWithRetry(
    `/profile/${usrId}/detailed-announcement/top4`
  );

  if (!getWorkListResponse.ok)
    if (getWorkListResponse.status === 404) return [];
    else throw new Error("작업을 조회하는 중 에러가 발생했습니다.");

  return await getWorkListResponse.json();
}

export default async function Work({ usrId }) {
  const worksPromise = getWorkList(usrId);

  return <WorkListWithData promise={worksPromise} />;
}
