import classNames from "classnames/bind";
import styles from "./AlbumList.module.scss";

import { useState, useCallback, memo } from "react";
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
function AlbumList({ trackList, avatar, onNext, onPrev }) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    isTrackEnded,
    handleNextTrack,
    handlePrevTrack,
  } = useAudioPlayer();
  const [isPlaying, setIsPlaying] = useState(null);

  const handleTrackPlay = (track) => {
    handlePlay(
      track.id,
      {
        trackTitle: track.title,
        trackPerformer: track.stageName,
      },
      track.link
    );
    setIsPlaying(track.id);
  };

  const handleTrackPause = (track) => {
    handlePause(track.id);
    setIsPlaying(null);
  };

  // console.log("AlbumList - onNext type:", typeof onNext);
  // console.log("AlbumList - onPrev type:", typeof onPrev);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("tracks")}>
          {trackList.map((track) => (
            <div
              className={cx("track-box", {
                playing: isPlaying === track.id,
                transparent: isTrackEnded,
              })}
              key={track.id}
            >
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
                  onPlay={() => handleTrackPlay(track)}
                  onPause={() => handleTrackPause(track)}
                  onNext={handleNextTrack}
                  onPrev={handlePrevTrack}
                  //
                  frameSingleTracks
                  playerSingleTracks
                  playerAlbumList
                  waveformBoxSingleTracks
                  stopperAlbumList
                  actionsAlbumList
                  hideAlbumList
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

export default memo(AlbumList);
