import classNames from "classnames/bind";
import styles from "./NewReleasesBox.module.scss";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEllipsisVertical,
  faHeadphones,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import Player from "../Player";
import TrackPopper from "~/layouts/MainLayout/Popper/TrackPopper";

import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NewReleasesBox({
  trackId,
  trackLink,
  trackTitle,
  trackPerformer,
  trackAvatar,
  trackType,
  trackGenre,
  releaseDay,
}) {
  const { currentTrackId, handlePlay, handlePause, listeners, setTrackList } =
    useAudioPlayer();

  const handlePlayTrack = () => {
    setTrackList((prevTrackList) => {
      const isTrackExists = prevTrackList.some((track) => track.id === trackId);
      if (!isTrackExists) {
        return [
          ...prevTrackList,
          {
            id: trackId,
            title: trackTitle,
            performer: trackPerformer,
            link: trackLink,
          },
        ];
      }
      return prevTrackList;
    });

    handlePlay(trackId, { trackTitle, trackPerformer }, trackLink);
  };

  return (
    <div className={cx("container")}>
      <Link
        className={cx("link")}
        to={routesConfig.track
          .replace(`:stageName`, trackPerformer)
          .replace(`:trackTitle`, trackTitle)}
      />

      <div className={cx("player")}>
        <img className={cx("avatar")} src={trackAvatar} alt={trackTitle} />

        <Player
          trackId={trackId}
          trackLink={trackLink}
          trackTitle={trackTitle}
          trackPerformer={trackPerformer}
          //
          isStatus={trackId === currentTrackId}
          onPlay={handlePlayTrack}
          onPause={() => handlePause(trackId)}
        />
      </div>

      <div className={cx("menu")}>
        <div className={cx("streams")}>
          <FontAwesomeIcon className={cx("headphone")} icon={faHeadphones} />
          <div className={cx("listens")}>
            <h6 className={cx("listener")}>{listeners[trackId] || 0}</h6>
          </div>
        </div>

        <TrackPopper
          trackPerformer={trackPerformer}
          trackTitle={trackTitle}
          trackType={trackType}
          trackGenre={trackGenre}
          releaseDay={releaseDay}
        >
          <div className={cx("info")}>
            <FontAwesomeIcon className={cx("icon")} icon={faInfo} />
          </div>
        </TrackPopper>

        <div className={cx("more-function")}>
          <FontAwesomeIcon className={cx("more")} icon={faEllipsisVertical} />
        </div>
      </div>
    </div>
  );
}

export default NewReleasesBox;
