import SignUp from "./SignUp";
import signupstyle from "./signup.module.css";

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_MAP_URL,
  title: "회원가입",
  description:
    "기술과 IT 지식을 배우고 싶다면, 지금 가입해 보세요. 함께 성장해요.",
  openGraph: {
    title: "회원가입",
    description:
      "기술과 IT 지식을 배우고 싶다면, 지금 가입해 보세요. 함께 성장해요.",
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

export default function SignUpPage() {
  return (
    <div className={signupstyle.signupPage}>
      <div>
        <SignUp />
      </div>
    </div>
  );
}
