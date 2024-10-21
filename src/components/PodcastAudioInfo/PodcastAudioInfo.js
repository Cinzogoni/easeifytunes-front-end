import classNames from "classnames/bind";
import styles from "./PodcastAudioInfo.module.scss";

import { useAudioPlayer } from "../AudioPlayerProvider";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faLink,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import Player from "../Player";
import routesConfig from "~/config/routes";
import { useEffect } from "react";

const cx = classNames.bind(styles);
function PodcastAudioInfo({
  id,
  link,
  topic,
  avatar,
  title,
  performer,
  type,
  releaseDay,
  streamed,
}) {
  const { currentTrackId, handlePlay, handlePause } = useAudioPlayer();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Link
          to={routesConfig.podcastPage.replace(
            `:podcastTopic`,
            topic.replace(/,/g, "-")
          )}
        >
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Link>
      </div>

      <div className={cx("container")}>
        <img className={cx("avatar")} src={avatar} alt={title} />
        <div className={cx("info")}>
          <h3 className={cx("title")}>{title}</h3>
          <h4 className={cx("performer")}>{performer}</h4>
          <h5 className={cx("type")}>{type}</h5>
          <h5 className={cx("release-day")}>Release day: {releaseDay}</h5>

          <div className={cx("more")}>
            <div className={cx("streams")}>
              <FontAwesomeIcon
                className={cx("listeners")}
                icon={faHeadphones}
              />
              <h6 className={cx("streamed")}>
                {new Intl.NumberFormat().format(streamed || 0)}
              </h6>
            </div>
            <div className={cx("share")}>
              <FontAwesomeIcon className={cx("link")} icon={faLink} />
            </div>
            <div className={cx("add")}>
              <FontAwesomeIcon className={cx("plus")} icon={faPlus} />
            </div>
          </div>

          <Player
            trackId={id}
            trackLink={link}
            trackTitle={title}
            trackPerformer={performer}
            trackType={type}
            //
            isStatus={id === currentTrackId}
            onPlay={() =>
              handlePlay(
                id,
                {
                  trackTitle: title,
                  trackPerformer: performer,
                },
                link
              )
            }
            onPause={() => handlePause(id)}
            //
            waveformBoxFooter
            frameTrackInfoResize
            playerTrackInfoResize
            loopTrackInfo
            loopBGTrackInfo
            pauseTrackInfo
            pauseBGTrackInfo
            playerTrackInfo
            playIconTrackInfo
            playFooterIcon
            stopperTrackInfo
            stopIconTrackInfo
            stopFooterIcon
            playtimeTrackInfo
            actionTrackInfoLeft
            actionTrackInfoRight
            randomTrackInfo
            prevTrackInfo
            nextTrackInfo
            volumeBarTrackInfo
            volumeBGTrackInfo
            volumeIconTrackInfo
          />
        </div>
      </div>
    </div>
  );
}

export default PodcastAudioInfo;
