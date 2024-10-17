import classNames from "classnames/bind";
import styles from "./AlbumList.module.scss";

import { useState, useEffect } from "react";
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
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    setTrackList,
    handleNextTrack,
    handlePrevTrack,
    setTrackIndex,
  } = useAudioPlayer();
  // const [isUI, setIsUI] = useState(null);

  useEffect(() => {
    if (trackList.length > 0) {
      setTrackList(trackList);
    }
  }, [trackList, setTrackList]);

  useEffect(() => {
    const index = currentTrackId
      ? trackList.findIndex((track) => track.id === currentTrackId)
      : -1;
    if (index !== -1) {
      setTrackIndex(index);
    }
    // console.log("Current Index:", index);
    // console.log("Current Track Id:", currentTrackId);
  }, [currentTrackId, trackList, setTrackIndex]);

  const handleTrackPlay = (track) => {
    setTrackIndex(trackList.findIndex((t) => t.id === track.id));
    handlePlay(
      track.id,
      {
        trackTitle: track.title,
        trackPerformer: track.stageName,
      },
      track.link
    );
  };

  const handleTrackPause = (track) => {
    setTrackIndex(trackList.findIndex((t) => t.id === track.id));
    handlePause(track.id);
  };

  const handleNext = () => {
    const nextTrack = handleNextTrack();
    if (nextTrack) {
      handleTrackPlay(nextTrack);
    }
  };

  const handlePrev = () => {
    const prevTrack = handlePrevTrack();
    if (prevTrack) {
      handleTrackPlay(prevTrack);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("tracks")}>
          {trackList.map((track) => (
            <div
              className={cx("track-box", {
                playing: track.id === currentTrackId,
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
                  onNext={handleNext}
                  onPrev={handlePrev}
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
