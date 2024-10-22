import classNames from "classnames/bind";
import styles from "./PodcastAudioList.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faLink,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { Link } from "react-router-dom";
import { useEffect } from "react";

import routesConfig from "~/config/routes";

import Player from "../Player";

const cx = classNames.bind(styles);
function PodcastAudioList({ audioList }) {
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
    if (audioList.length > 0) {
      setTrackList(audioList);
      if (isRandom) {
        const shuffledList = shuffleArray(audioList);
        setShuffledTrackList(shuffledList);
      }
    }
  }, [audioList, isRandom, setTrackList, setShuffledTrackList]);

  const displayTrackList = isRandom ? shuffledTrackList : audioList;

  const sortedPodcast = displayTrackList.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

  useEffect(() => {
    const index = currentTrackId
      ? displayTrackList.findIndex((audio) => audio.id === currentTrackId)
      : -1;
    if (index !== -1) {
      setTrackIndex(index);
    }
  }, [currentTrackId, displayTrackList, setTrackIndex]);

  const handleTrackPlay = (audio) => {
    setTrackIndex(displayTrackList.findIndex((t) => t.id === audio.id));
    handlePlay(
      audio.id,
      {
        trackTitle: audio.title,
        trackPerformer: audio.publisher,
        trackType: audio.type,
      },
      audio.link
    );
  };

  const handleTrackPause = (audio) => {
    setTrackIndex(displayTrackList.findIndex((t) => t.id === audio.id));
    handlePause(audio.id);
  };

  const isLastTrack = (audio) => {
    return displayTrackList[displayTrackList.length - 1]?.id === audio.id;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("audios")}>
          {sortedPodcast.map((audio) => (
            <div
              className={cx("audio-box", {
                playing: audio.id === currentTrackId,
                transparent: isTrackEnded && isLastTrack(audio),
              })}
              key={audio.id}
            >
              <div className={cx("player")}>
                <img
                  className={cx("audio-avatar")}
                  src={audio.avatar}
                  alt={audio.title}
                />
                <Player
                  trackId={audio.id}
                  trackLink={audio.link}
                  trackAvatar={audio.avatar}
                  trackTitle={audio.title}
                  trackPerformer={audio.publisher}
                  trackType={audio.type}
                  //
                  isStatus={audio.id === currentTrackId}
                  onPlay={() => handleTrackPlay(audio)}
                  onPause={() => handleTrackPause(audio)}
                  //
                  framePodcastResize
                  playerPodcastList
                  playerAlbumList
                  waveformBoxSingleTracks
                  stopperPodcastList
                />
              </div>

              <div className={cx("audio-info")}>
                <Link
                  className={cx("audio-link")}
                  to={routesConfig.podcastAudioPage
                    .replace(`:author`, audio.author.replace(/\//g, "-"))
                    .replace(`:publisher`, audio.publisher.replace(/\//g, "-"))
                    .replace(`:title`, audio.title.replace(/\//g, "-"))}
                />
                <h4 className={cx("audio-title")}>{audio.title}</h4>
                <h5 className={cx("audio-publisher")}>
                  Publisher: {audio.publisher}
                </h5>
                <h5 className={cx("audio-author")}>Author: {audio.author}</h5>
              </div>

              <div className={cx("more-func")}>
                <div className={cx("streams")}>
                  <FontAwesomeIcon
                    className={cx("listeners")}
                    icon={faHeadphones}
                  />
                  <h5 className={cx("streamed")}>
                    {new Intl.NumberFormat().format(audio.streamed || 0)}
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

export default PodcastAudioList;
