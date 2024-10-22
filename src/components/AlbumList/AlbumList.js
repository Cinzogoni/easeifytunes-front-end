import classNames from "classnames/bind";
import styles from "./AlbumList.module.scss";

import { useEffect } from "react";
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
    isTrackEnded,
    setTrackIndex,
    setTrackList,
    setShuffledTrackList,
    shuffledTrackList,
    isRandom,
  } = useAudioPlayer();

  const shuffleArray = (array) => {
    const shuffledArray = array.filter((track) => track.id !== currentTrackId);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    if (currentTrackId) {
      const currentTrack = array.find((track) => track.id === currentTrackId);
      if (currentTrack) {
        shuffledArray.unshift(currentTrack);
      }
    }

    return shuffledArray;
  };

  useEffect(() => {
    if (trackList.length > 0) {
      setTrackList(trackList);
      if (isRandom) {
        const shuffledList = shuffleArray(trackList);
        setShuffledTrackList(shuffledList);
      }
    }
  }, [trackList, isRandom, setTrackList, setShuffledTrackList]);

  const displayTrackList = isRandom ? shuffledTrackList : trackList;

  useEffect(() => {
    const index = currentTrackId
      ? displayTrackList.findIndex((track) => track.id === currentTrackId)
      : -1;
    if (index !== -1) {
      setTrackIndex(index);
    }
    // console.log("Current Index:", index);
    // console.log("Current Track Id:", currentTrackId);
  }, [currentTrackId, displayTrackList, setTrackIndex]);

  const handleTrackPlay = (track) => {
    setTrackIndex(displayTrackList.findIndex((t) => t.id === track.id));
    handlePlay(
      track.id,
      {
        trackTitle: track.title,
        trackPerformer: track.stageName,
        trackType: track.type,
      },
      track.link
    );
  };

  const handleTrackPause = (track) => {
    setTrackIndex(displayTrackList.findIndex((t) => t.id === track.id));
    handlePause(track.id);
  };

  const isLastTrack = (track) => {
    return displayTrackList[displayTrackList.length - 1]?.id === track.id;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("tracks")}>
          {displayTrackList.map((track) => (
            <div
              className={cx("track-box", {
                playing: track.id === currentTrackId,
                transparent: isTrackEnded && isLastTrack(track),
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
