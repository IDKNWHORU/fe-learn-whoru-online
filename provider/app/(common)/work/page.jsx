import BackButton from "@/components/BackButton";
import dynamic from "next/dynamic";

const WorkList = dynamic(() => import("./WorkList"), {
  loading: () => <p>작업을 불러오는 중입니다...</p>,
});

export const metadata = {
  title: "작업",
  description:
    "프로젝트에 기여하고, 자유롭고 평등한 커뮤니티에서 보상을 경험하세요.",
  openGraph: {
    title: "작업",
    description:
      "프로젝트에 기여하고, 자유롭고 평등한 커뮤니티에서 보상을 경험하세요.",
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

export default async function WorkListPage() {
  return (
    <>
      <header className="nb">
        <BackButton />
      </header>
      <article className="wrapper">
        <div className="frame-93-7">
          <div className="frame-57">
            <h1 className="h3-24 color-black">작업 목록</h1>
          </div>
          <div className="frame-34">
            <WorkList />
          </div>
        </div>
      </article>
    </>
  );
}
