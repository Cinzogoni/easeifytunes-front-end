import classNames from "classnames/bind";
import styles from "./MusicTrackItem.module.scss";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);

function MusicTrackItem({ trackAvatar, trackTitle, trackPerformer }) {
  return (
    <div className={cx("wrapper")}>
      <Link
        to={routesConfig.track.replace(
          ":trackTitle",
          encodeURIComponent(trackTitle)
        )}
      >
        <div className={cx("info-box")}>
          <img className={cx("avatar")} src={trackAvatar} alt={trackTitle} />
          <div>
            <h6 className={cx("track-name")}>{trackTitle}</h6>
            <p className={cx("track-performer")}>{trackPerformer}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MusicTrackItem;
