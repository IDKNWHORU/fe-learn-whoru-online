import BackButton from "@/components/BackButton";
import profilestyle from "./profile.module.css";

export default function () {
  return (
    <>
      <header className="nb">
        <BackButton />
      </header>
      <article className="wrapper">
        <div className="frame-76">
          <div className={profilestyle.avatarLoading}></div>
          <div className="frame-42">
            <div className={profilestyle.boardLoading}>
              <div className="frame-35-2">
                <h4 className="h4-20 color-black">나의 지원서</h4>
              </div>
            </div>
            <div className={profilestyle.boardLoading}>
              <div className="frame-35-2">
                <h4 className="h4-20 color-black">나의 작업</h4>
              </div>
            </div>
          </div>
          <div className="frame-42">
            <div className={profilestyle.boardLoading}>
              <div className="frame-35-2">
                <h4 className="h4-20 color-black">나의 학습</h4>
              </div>
              <div className="frame-96">
                <div className="frame-93-6"></div>
              </div>
            </div>
            <div className={profilestyle.boardLoading}>
              <div className="frame-35-2">
                <h4 className="h4-20 color-black">나의 미션</h4>
              </div>
            </div>
          </div>
          <div className="frame-42">
            <div className={profilestyle.boardLoading}>
              <div className="frame-35-3">
                <h4 className="h4-20 color-black">나의 보상</h4>
              </div>
              <div className="frame-96">
                <div className="frame-93-6"></div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
