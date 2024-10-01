import classNames from "classnames/bind";
import styles from "./PodcastAudio.module.scss";

const cx = classNames.bind(styles);

function PodcastAudio() {
  return (
    <div className={cx("wrapper")}>
      <h1>Podcast Audio</h1>
    </div>
  );
}

export default PodcastAudio;
