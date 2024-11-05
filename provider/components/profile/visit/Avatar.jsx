import Icon from "@/components/Icon";
import dynamic from "next/dynamic";
import style from "../profile.module.css";

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
              <span className="avatar-nick">{profile.nick}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
