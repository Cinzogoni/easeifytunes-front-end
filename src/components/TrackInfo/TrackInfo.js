import classNames from "classnames/bind";
import styles from "./TrackInfo.module.scss";

import { useAudioPlayer } from "../AudioPlayerProvider";

import Player from "../Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faLink,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function TrackInfo({ track }) {
  const { currentTrackId, handlePlay, handlePause } = useAudioPlayer();

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

          <div className={cx("more")}>
            <div className={cx("streams")}>
              <FontAwesomeIcon
                className={cx("listeners")}
                icon={faHeadphones}
              />
              <h6 className={cx("streamed")}>1,000,000</h6>
            </div>
            <div className={cx("share")}>
              <FontAwesomeIcon className={cx("link")} icon={faLink} />
            </div>
            <div className={cx("add")}>
              <FontAwesomeIcon className={cx("plus")} icon={faPlus} />
            </div>
          </div>

          <Player
            trackId={track.id}
            trackLink={track.trackLink}
            trackTitle={track.trackTitle}
            trackPerformer={track.trackPerformer}
            //
            isStatus={track.id === currentTrackId}
            onPlay={() =>
              handlePlay(
                track.id,
                {
                  trackTitle: track.trackTitle,
                  trackPerformer: track.trackPerformer,
                },
                track.trackLink
              )
            }
            onPause={() => handlePause(track.id)}
            //
            waveformBoxFooter
            frameTrackInfoResize
            playerTrackInfoResize
            playerTrackInfo
            playFooterIcon
            stopperTrackInfo
            stopFooterIcon
            playtimeTrackInfo
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
