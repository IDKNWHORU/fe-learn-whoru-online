import { Suspense } from "react";
import Loading from "./loading";

export default function ProfileLayout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
