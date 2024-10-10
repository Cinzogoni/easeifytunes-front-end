import classNames from "classnames/bind";
import styles from "./AlbumList.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faLink,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../AudioPlayerProvider";
import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import Player from "../Player";

const cx = classNames.bind(styles);
function AlbumList({ trackList, avatar }) {
  const { currentTrackId, handlePlay, handlePause } = useAudioPlayer();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("tracks")}>
          {trackList.map((track) => (
            <div className={cx("track-box")} key={track.id}>
              <div className={cx("player")}>
                <img
                  className={cx("track-avatar")}
                  src={avatar}
                  alt={track.title}
                />
                <Player
                  trackId={track.id}
                  trackLink={track.link}
                  trackAvatar={track.avatar}
                  trackTitle={track.title}
                  trackPerformer={track.stageName}
                  trackType={track.type}
                  //
                  isStatus={track.id === currentTrackId}
                  onPlay={() =>
                    handlePlay(
                      track.id,
                      {
                        trackTitle: track.title,
                        trackPerformer: track.stageName,
                      },
                      track.link
                    )
                  }
                  onPause={() => handlePause(track.id)}
                  //
                  frameSingleTracks
                  playerSingleTracks
                  playerAlbumList
                  waveformBoxSingleTracks
                  stopperAlbumList
                />
              </div>

              <div className={cx("track-info")}>
                <Link
                  className={cx("track-link")}
                  to={routesConfig.track
                    .replace(`:stageName`, track.stageName.replace(/\//g, "-"))
                    .replace(`:trackTitle`, track.title.replace(/\//g, "-"))}
                />

                <h4 className={cx("track-title")}>{track.title}</h4>
                <h5 className={cx("track-performer")}>{track.stageName}</h5>
              </div>

              <div className={cx("more-func")}>
                <div className={cx("streams")}>
                  <FontAwesomeIcon
                    className={cx("listeners")}
                    icon={faHeadphones}
                  />
                  <h5 className={cx("streamed")}>
                    {new Intl.NumberFormat().format(track.streamed || 0)}
                  </h5>
                </div>
                <div className={cx("share")}>
                  <FontAwesomeIcon className={cx("share-link")} icon={faLink} />
                </div>
                <div className={cx("add")}>
                  <FontAwesomeIcon className={cx("plus")} icon={faPlus} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlbumList;
