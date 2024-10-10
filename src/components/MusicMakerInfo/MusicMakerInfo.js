import classNames from "classnames/bind";
import styles from "./MusicMakerInfo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";

const cx = classNames.bind(styles);

function MusicMakerInfo({ musicMakerName }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Navigation id="music-maker-viewAll">
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Navigation>
      </div>

      <div className={cx("container")}>
        <img
          className={cx("avatar")}
          src={musicMakerName.avatar}
          alt={musicMakerName.stageName}
        />
        <div className={cx("info")}>
          <h3 className={cx("stage-name")}>{musicMakerName.stageName}</h3>
          <h4 className={cx("role")}>{musicMakerName.role}</h4>
        </div>
      </div>
    </div>
  );
}

export default MusicMakerInfo;
