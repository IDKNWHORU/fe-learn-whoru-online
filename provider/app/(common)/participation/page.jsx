import BackButton from "@/components/BackButton";
import dynamic from "next/dynamic";

const LearningList = dynamic(() => import("./LearningList"), {
  loading: () => <p>학습을 불러오는 중입니다...</p>,
});

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_MAP_URL,
  title: "학습 참여",
  description: "평등한 참여와 학습으로 보상 받는 커뮤니티를 경험하세요.",
  openGraph: {
    title: "학습 참여",
    description: "평등한 참여와 학습으로 보상 받는 커뮤니티를 경험하세요.",
    url: process.env.NEXT_PUBLIC_SITE_MAP_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: process.env.NEXT_PUBLIC_LOCALE,
    type: "website",
    images: [
      {
        url: process.env.NEXT_PUBLIC_OPEN_GRAPH_IMAGE_URL,
        width: 70,
        height: 32,
        alt: process.env.NEXT_PUBLIC_SITE_NAME,
      },
    ],
  },
};

export default async function ParticipationListPage() {
  return (
    <>
      <header className="nb">
        <BackButton />
      </header>
      <article className="wrapper">
        <div className="frame-93">
          <h1 className="h3-24">학습 참여</h1>
          <div className="frame-34">
            <div className="frame-101">
              <div className="frame-9">
                <h2 className="h4-20 color-black">학습 목록</h2>
              </div>
            </div>
            <LearningList />
          </div>
        </div>
      </article>
    </>
  );
}
