import classNames from "classnames/bind";
import styles from "./TrackInfo.module.scss";

import Player from "../Player";

const cx = classNames.bind(styles);

function TrackInfo({ track }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <img
          className={cx("avatar")}
          src={track.trackAvatar}
          alt={track.trackTitle}
        />
        <div className={cx("info")}>
          <h2 className={cx("title")}>{track.trackTitle}</h2>
          <h3 className={cx("performer")}>{track.trackPerformer}</h3>
          <h4 className={cx("type")}>{track.trackType}</h4>
          <h4 className={cx("genre")}>{track.trackGenre}</h4>

          <Player
            waveformBoxFooter
            frameTrackInfoResize
            playerFooterResize
            playerTrackInfo
            playFooterIcon
            // stopperFooterBtn
            // stopFooterIcon
            playtimeTrackInfo
            timeStartTrackInfo
            timeEndTrackInfo
            actionTrackInfoLeft
            actionTrackInfoRight
            randomTrackInfo
            prevTrackInfo
            nextTrackInfo
            volumeBarTrackInfo
          />
        </div>
      </div>
    </div>
  );
}

export default TrackInfo;
