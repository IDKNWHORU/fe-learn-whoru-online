"use client";

import Link from "next/link";
import { Fragment, use } from "react";

export function ApplicationListWithData({ promise }) {
  const applications = use(promise);

  return (
    <>
      {applications.map((application, index) => (
        <Fragment key={application.applicationId}>
          <div className="frame-44">
            <div className="frame-4-1 background-white border-purple-01">
              <p className="caption-12 color-purple-01">마감 미설정</p>
            </div>
            <Link
              className="h4-20 color-gray-02 link"
              href={`/announcement/${application.postingId}/${application.detailId}/apply/edit?role=${application.role}`}
            >
              {application.title}
            </Link>
          </div>
          {index < applications.length - 1 ? (
            <div className="line-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
