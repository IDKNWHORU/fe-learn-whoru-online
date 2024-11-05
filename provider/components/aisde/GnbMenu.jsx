import Image from "next/image";
import Link from "next/link";

export default function GnbMenu({
  href,
  src,
  alt,
  width,
  height,
  text,
  iconClass,
}) {
  return (
    <Link className="gnb-menu-2" href={href}>
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
