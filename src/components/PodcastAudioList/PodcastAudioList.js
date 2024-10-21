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
import routesConfig from "~/config/routes";

import Player from "../Player";

const cx = classNames.bind(styles);
function PodcastAudioList({ audioList }) {
  const { currentTrackId, handlePlay, handlePause } = useAudioPlayer();

  const sortedPodcast = audioList.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("audios")}>
          {sortedPodcast.map((audio) => (
            <div className={cx("audio-box")} key={audio.id}>
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
                  onPlay={() =>
                    handlePlay(
                      audio.id,
                      {
                        trackTitle: audio.title,
                        trackPerformer: audio.performer,
                      },
                      audio.link
                    )
                  }
                  onPause={() => handlePause(audio.id)}
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
