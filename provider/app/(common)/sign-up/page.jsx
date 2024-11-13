import SignUp from "./SignUp";
import signupstyle from "./signup.module.css";

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_MAP_URL,
  title: "루디움 회원가입",
  description:
    "Web 3.0 기술과 블록체인 지식을 배우고 싶다면, 지금 루디움에 가입해 보세요. 함께 성장해요.",
  openGraph: {
    title: "루디움 회원가입",
    description:
      "Web 3.0 기술과 블록체인 지식을 배우고 싶다면, 지금 루디움에 가입해 보세요. 함께 성장해요.",
    url: process.env.NEXT_PUBLIC_SITE_MAP_URL,
    siteName: "루디움",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "logo1.png",
        width: 70,
        height: 32,
        alt: "루디움 로고",
      },
    ],
  },
};

export default function SignUpPage() {
  return (
    <div className={signupstyle.signupPage}>
      <div>
        <SignUp />
      </div>
    </div>
  );
}
