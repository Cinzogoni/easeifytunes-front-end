import classNames from "classnames/bind";
import styles from "./PodcastBox.module.scss";

import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Podcast({ podcastAvatar, podcastTopic, podcastDescription }) {
  return (
    <div className={cx("container")}>
      <Link
        className={cx("link")}
        to={routesConfig.podcastPage.replace(`:podcastTopic`, podcastTopic)}
      />

      <div className={cx("frame")}>
        <img className={cx("avatar")} src={podcastAvatar} alt={podcastTopic} />
      </div>

      <div className={cx("desc")}>
        <h5 className={cx("podcast-name")}>{podcastTopic}</h5>
        <h6 className={cx("podcast-desc")}>{podcastDescription}</h6>
      </div>
    </div>
  );
}

export default Podcast;
