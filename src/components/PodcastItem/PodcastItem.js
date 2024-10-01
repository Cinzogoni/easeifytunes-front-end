import classNames from "classnames/bind";
import styles from "./PodcastItem.module.scss";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);

function PodcastItem({
  podcastAvatar,
  podcastPerformer,
  podcastTitle,
  podcastTopic,
}) {
  return (
    <div className={cx("wrapper")}>
      <Link to={routesConfig.podcast.replace(`:podcastTitle`, podcastTitle)}>
        <div className={cx("audio-info")}>
          <img
            className={cx("avatar")}
            src={podcastAvatar}
            alt={podcastPerformer}
          />
          <div>
            <h6 className={cx("audio-title")}>{podcastTitle}</h6>
            <p className={cx("audio-performer")}>{podcastPerformer}</p>
            <p className={cx("topic-name")}>{podcastTopic}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PodcastItem;
