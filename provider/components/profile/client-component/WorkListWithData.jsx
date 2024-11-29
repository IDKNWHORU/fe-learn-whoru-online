"use client";

import Link from "next/link";
import { Fragment, use } from "react";

export function WorkListWithData({ promise }) {
  const works = use(promise);

  return (
    <>
      {works.map((work, index) => (
        <Fragment key={work.detailId}>
          <div className="frame-44">
            <div className="frame-4-1 background-white border-purple-01">
              <p className="caption-12 color-purple-01">마감 미설정</p>
            </div>
            <Link
              className="h4-20 color-gray-02 link"
              href={`/work/${work.detailId}`}
            >
              {work.title}
            </Link>
          </div>
          {index < works.length - 1 ? <div className="line-gray-05" /> : null}
        </Fragment>
      ))}
    </>
  );
}
