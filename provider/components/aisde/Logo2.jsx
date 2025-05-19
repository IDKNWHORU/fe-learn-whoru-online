import Image from "next/image";

export default function Logo2() {
  return (
    <Image
      className="logo2"
      src="/logo2.png"
      alt="로고"
      width={52}
      height={24}
      priority
    />
  );
}
