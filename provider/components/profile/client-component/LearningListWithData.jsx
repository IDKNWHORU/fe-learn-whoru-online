"use client";

import Link from "next/link";
import { Fragment, use } from "react";

export function LearningListWithData({ promise }) {
  const learnings = use(promise);

  return (
    <>
      {learnings.map((learning, index) => (
        <Fragment key={learning.postingId}>
          <div className="frame-35-4">
            <div className="frame-92-2">
              <div className="frame-4-1 background-white border-purple-01">
                <p className="caption-12 color-purple-01">마감 미설정</p>
              </div>
              <Link
                className="link"
                href={`/participation/${learning.postingId}`}
              >
                <h2 className="h4-20 color-gray-02">{learning.title}</h2>
                {/* <p className="caption-12 color-gray-02">
                          {learning.title}
                        </p> */}
              </Link>
            </div>
            {/* 학습 달성률 */}
            {/* <div className="frame-85">
                    <div className="frame-9-5">
                      <p className="caption-12 color-black">달성률</p>
                      <p className="p2-16 color-purple-02">100%</p>
                    </div>
                  </div> */}
          </div>
          {index < learnings.length - 1 ? (
            <div className="line-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
