import dynamic from "next/dynamic";
import Icon from "../Icon";
import Link from "next/link";
import style from "./profile.module.css";
import walletStyle from "../blockchain/wallet/wallet.module.css";
import "./profile_toast.css";

const NearWallet = dynamic(() => import("../blockchain/wallet/NearWallet"), {
  ssr: false,
  loading: () => (
    <div
      className={`${walletStyle.card_mywallet} ${walletStyle.card_mywallet_blur}`}
    >
      <div className={walletStyle.mywallet}>
        <div className={walletStyle.mywallet_text}>
          <h4 className={walletStyle.h4_18}>나의 지갑</h4>
        </div>
        <div
          className={`${walletStyle.wallet_logo_mywallet_information} ${walletStyle.zero_padding}`}
        >
          <hr className={walletStyle.divder_blur} />
          <div className={walletStyle.wallet_logo_with_button}>
            <div
              className={`${walletStyle.wallet_logo} ${walletStyle.wallet_logo_blur}`}
            >
              <Icon
                src="/Wallet-logo-white.png"
                width={61}
                height={71}
                alt="MyNearWallet Logo"
              />
            </div>
            <div className={walletStyle.mywallet_button}>
              <h5>지갑 연결하기</h5>
              <Icon
                src="/icon_wallet_white.png"
                width={24}
                height={24}
                alt="지갑 연결하기"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});
const Viewer = dynamic(() => import("@/components/Viewer"), { ssr: false });

export default function Avatar({ profile }) {
  return (
    <div className={style.card_profile_wallet}>
      <div className={style.card_profile}>
        <div className={style.profile}>
          <div className={style.profile_name}>
            <Icon
              className="avatar"
              src={profile.avatar}
              alt="아바타"
              width={60}
              height={60}
            />
            <p className={style.profile_nick}>
              안녕하세요, <span className="avatar-nick">{profile.nick}</span>님
            </p>
          </div>
          <div className={style.profile_text_setting_button}>
            <div className={style.profile_text}>
              <Viewer content={profile.selfIntro.split("\n")[0]} />
              <div className={style.phone_number}>
                <Icon
                  className="tel"
                  src="/icon_tel.png"
                  alt="tel"
                  width={24}
                  height={24}
                />
                <p className={style.p1_16}>{profile.phnNmb}</p>
              </div>
            </div>
            <Link className={style.setting_button} href="/profile/edit">
              <Icon
                src="/icon_cog_wheel.png"
                alt="cog wheel"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
      <NearWallet />
    </div>
  );
}
