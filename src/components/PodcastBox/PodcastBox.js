import classNames from "classnames/bind";
import styles from "./PodcastBox.module.scss";

const cx = classNames.bind(styles);

function Podcast({ podcastId, podcastAvatar, podcastTopic }) {
  return (
    <div className={cx("container")}>
      <div className={cx("frame")}>
        <img className={cx("avatar")} src={podcastAvatar} alt={podcastTopic} />
      </div>

      <div className={cx("desc")}>
        <h5 className={cx("podcast-name")}>{podcastTopic}</h5>
      </div>
    </div>
  );
}

export default Podcast;
