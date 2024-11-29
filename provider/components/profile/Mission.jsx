import fetchWithRetry from "@/functions/api";

import { MissionListWithData } from "./client-component/MissionListWithData";

async function getMissionList(usrId) {
  const getMissionListResponse = await fetchWithRetry(
    `/profile/${usrId}/mission/top4`
  );

  if (!getMissionListResponse.ok)
    if (getMissionListResponse.status === 404) return [];
    else throw new Error("미션을 조회하는 중 에러가 발생했습니다.");

  return await getMissionListResponse.json();
}

export default async function Mission({ usrId }) {
  const missionsPromise = getMissionList(usrId);

  return <MissionListWithData promise={missionsPromise} />;
}
