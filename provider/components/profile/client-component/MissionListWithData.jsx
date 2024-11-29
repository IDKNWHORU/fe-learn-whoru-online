"use client";

import Link from "next/link";
import { Fragment, use } from "react";
import ko_kr from "@/langs/ko_kr";

export function MissionListWithData({ promise }) {
  const missions = use(promise);

  return (
    <>
      {missions.map((mission, index) => (
        <Fragment key={mission.missionId}>
          <div className="frame-40">
            <div className="frame-4-1 background-white border-purple-01">
              <p className="caption-12 color-purple-01">
                {ko_kr[mission.status]}
              </p>
            </div>
            <Link
              className="link"
              href={`/participation/${mission.postingId}/${mission.curriculumId}/mission/${mission.missionId}`}
            >
              <h2 className="h4-20 color-gray-02">{mission.title}</h2>
            </Link>
          </div>
          {index < missions.length - 1 ? (
            <div className="line-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
