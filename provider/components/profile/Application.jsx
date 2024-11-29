import fetchWithRetry from "@/functions/api";
import { ApplicationListWithData } from "./client-component/ApplicationListWithData";

async function getApplicationList(usrId) {
  const getApplicationListResponse = await fetchWithRetry(
    `/profile/${usrId}/application/top4`
  );

  if (!getApplicationListResponse.ok)
    if (getApplicationListResponse.status === 404) return [];
    else throw new Error("지원서를 조회하는 중 에러가 발생했습니다.");

  return await getApplicationListResponse.json();
}

export default async function Application({ usrId }) {
  const applicationsPromise = getApplicationList(usrId);

  return <ApplicationListWithData promise={applicationsPromise} />;
}
