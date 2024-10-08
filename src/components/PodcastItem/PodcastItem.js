import classNames from "classnames/bind";
import styles from "./PodcastItem.module.scss";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);

function PodcastItem({ podcastAvatar, podcastTopic, podcastDescription }) {
  return (
    <div className={cx("wrapper")}>
      <Link
        to={routesConfig.podcastPage.replace(`:podcastTopic`, podcastTopic)}
      >
        <div className={cx("audio-info")}>
          <img
            className={cx("avatar")}
            src={podcastAvatar}
            alt={podcastTopic}
          />
          <div>
            <h6 className={cx("topic")}>{podcastTopic}</h6>
            <p className={cx("description")}>{podcastDescription}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PodcastItem;
