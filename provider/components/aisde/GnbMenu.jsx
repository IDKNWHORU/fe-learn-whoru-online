"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GnbMenu({
  href,
  src,
  alt,
  width,
  height,
  text,
  iconClass,
}) {
  const pathName = usePathname();
  const className = pathName === href ? "gnb-menu-2 active" : "gnb-menu-2";

  return (
    <Link className={className} href={href}>
      <Image
        className={iconClass}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
      />
      <p className="text-wrapper h4-20">{text}</p>
    </Link>
  );
}
