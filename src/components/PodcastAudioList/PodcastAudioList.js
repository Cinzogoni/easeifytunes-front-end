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
    shuffledTrackList,
    isRandom,
  } = useAudioPlayer();

  const displayTrackList = isRandom ? shuffledTrackList : audioList;

  const sortedPodcast = displayTrackList.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

  useEffect(() => {
    if (audioList.length > 0) {
      setTrackList(audioList);
    }
  }, [audioList, setTrackList]);

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
        trackPerformer: audio.performer,
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
                  trackPerformer={audio.performer}
                  trackType={audio.type}
                  //
                  isStatus={audio.id === currentTrackId}
                  onPlay={() => handleTrackPlay(audio)}
                  onPause={() => handleTrackPause(audio)}
                  //
                  frameSingleTracks
                  playerSingleTracks
                  playerAlbumList
                  waveformBoxSingleTracks
                  stopperAlbumList
                />
              </div>

              <div className={cx("audio-info")}>
                <Link
                  className={cx("audio-link")}
                  to={routesConfig.podcastAudioPage
                    .replace(`:performer`, audio.performer.replace(/\//g, "-"))
                    .replace(`:title`, audio.title.replace(/\//g, "-"))}
                />

                <h4 className={cx("audio-title")}>{audio.title}</h4>
                <h5 className={cx("audio-performer")}>{audio.performer}</h5>
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
