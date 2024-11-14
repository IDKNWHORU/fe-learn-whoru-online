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
          <div className="owner-info">
            <p className="address-text">(주)루디움 l 대표자 : 임동선</p>
            <p className="address-text">개인정보처리방침 l 이용약관</p>
            <p className="address-text">개인정보보호책임자 : 임동선</p>
          </div>
          <div>
            <p className="contact">Contact us</p>
          </div>
          <div className="sns">
            <Link
              className="sns-text"
              href="https://twitter.com/ludium_official"
              target="_blank"
            >
              <Icon
                src="/icon_x.png"
                alt="루디움 X(트위터)로 이동하기"
                width={16}
                height={16}
              />
              Twitter
            </Link>
            <Link
              className="sns-text"
              href="https://discord.com/invite/c8Snswayuw"
              target="_blank"
            >
              <Icon
                src="/icon_discord.png"
                alt="루디움 디스코드로 이동하기"
                width={16}
                height={16}
              />
              Discord
            </Link>
            <Link
              className="sns-text"
              href="https://www.youtube.com/@Ludium"
              target="_blank"
            >
              <Icon
                src="/icon_youtube.png"
                alt="루디움 유튜브로 이동하기"
                width={16}
                height={16}
              />
              Youtube
            </Link>
            <Link
              className="sns-text"
              href="https://github.com/Ludium-Official/ludium-world"
              target="_blank"
            >
              <Icon
                src="/icon_github.png"
                alt="루디움 깃허브로 이동하기"
                width={16}
                height={16}
              />
              Github
            </Link>
            <Link
              className="sns-text"
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_MAIL}?subject=디렉투스의 도움이 필요해`}
              target="_blank"
            >
              <Icon
                src="/icon_customer_service.png"
                alt="루디움에 이메일로 지원 받기"
                width={16}
                height={16}
              />
              Customer Service
            </Link>
            <Contributors />
          </div>
        </div>
        <div className="copyright">
          <p className="copyright-text">&copy;2024 LUDIUM</p>
          <p className="copyright-text">.ALL RIGHTS RESERVED.</p>
        </div>
      </address>
    </footer>
  );
}
