import classNames from "classnames/bind";
import styles from "./AlbumList.module.scss";

import { useCallback, useState } from "react";
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
  const { currentTrackId, handlePlay, handlePause, isTrackEnded } =
    useAudioPlayer();
  const [isPlaying, setIsPlaying] = useState(null);

  const currentTrackIndex = trackList.findIndex(
    (track) => track.id === currentTrackId
  );

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

  const handlePrevTrack = useCallback(() => {
    if (!trackList || trackList.length === 0) {
      console.error("trackList is undefined or empty.");
      return;
    }

    if (currentTrackIndex > 0) {
      const prevTrack = trackList[currentTrackIndex - 1];
      handleTrackPlay(prevTrack);
    }
  }, [trackList]);

  const handleNextTrack = useCallback(() => {
    if (!trackList || trackList.length === 0) {
      console.error("trackList is undefined or empty.");
      return;
    }

    if (currentTrackIndex !== -1 && currentTrackIndex < trackList.length - 1) {
      const nextTrack = trackList[currentTrackIndex + 1];
      handleTrackPlay(nextTrack);
    }
  }, [trackList]);

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
                  onPrevTrack={handlePrevTrack}
                  onNextTrack={handleNextTrack}
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

export default AlbumList;
