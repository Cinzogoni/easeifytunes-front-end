import classNames from "classnames/bind";
import styles from "./PodcastInfo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRotate,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";

const cx = classNames.bind(styles);
function PodcastInfo({ podcastInfo }) {
  const avatar = podcastInfo && podcastInfo.avatar ? podcastInfo.avatar : "";
  const topic = podcastInfo && podcastInfo.topic ? podcastInfo.topic : "";
  const description =
    podcastInfo && podcastInfo.description ? podcastInfo.description : "";

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Navigation id="podcast-viewAll">
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Navigation>
      </div>

      <div className={cx("container")}>
        <img className={cx("avatar")} src={avatar} alt={topic} />
        <div className={cx("info")}>
          <h3 className={cx("podcast-topic")}>{topic}</h3>
          <h4 className={cx("performer")}>{description}</h4>
          <div className={cx("player-func")}>
            <div className={cx("random-bg")}>
              <FontAwesomeIcon className={cx("random")} icon={faShuffle} />
            </div>
            <div className={cx("loop-bg")}>
              <FontAwesomeIcon className={cx("loop")} icon={faRotate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastInfo;
