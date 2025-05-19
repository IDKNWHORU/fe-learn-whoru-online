import Link from "next/link";
import Icon from "../Icon";
import Logo2 from "./Logo2";
import Contributors from "./Contributors";

export default function Footer() {
  return (
    <footer className="footer">
      <Logo2 />
      <address className="address">
        <div className="address-inner">
          <div>
            <p className="contact">Contact us</p>
          </div>
          <div className="sns">
            <Link
              className="sns-text"
              href="https://twitter.com/"
              target="_blank"
            >
              <Icon
                src="/icon_x.png"
                alt="X(트위터)로 이동하기"
                width={16}
                height={16}
              />
              Twitter
            </Link>
            <Link
              className="sns-text"
              href="https://discord.com/"
              target="_blank"
            >
              <Icon
                src="/icon_discord.png"
                alt="디스코드로 이동하기"
                width={16}
                height={16}
              />
              Discord
            </Link>
            <Link
              className="sns-text"
              href="https://www.youtube.com/"
              target="_blank"
            >
              <Icon
                src="/icon_youtube.png"
                alt="유튜브로 이동하기"
                width={16}
                height={16}
              />
              Youtube
            </Link>
            <Link
              className="sns-text"
              href="https://github.com/"
              target="_blank"
            >
              <Icon
                src="/icon_github.png"
                alt="깃허브로 이동하기"
                width={16}
                height={16}
              />
              Github
            </Link>
            <Link
              className="sns-text"
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_MAIL}?subject=${process.env.NEXT_PUBLIC_SITE_NAME} 문의`}
              target="_blank"
            >
              <Icon
                src="/icon_customer_service.png"
                alt="이메일로 지원 받기"
                width={16}
                height={16}
              />
              Customer Service
            </Link>
            <Contributors />
          </div>
        </div>
        <div className="copyright">
          <p className="copyright-text">
            &copy;2024 {process.env.NEXT_PUBLIC_SITE_NAME}
          </p>
          <p className="copyright-text">.ALL RIGHTS RESERVED.</p>
        </div>
      </address>
    </footer>
  );
}
