import classNames from "classnames/bind";
import styles from "./PodcastViewAll.module.scss";

const cx = classNames.bind(styles);
function PodcastViewAll() {
  return (
    <div className={cx("wrapper")}>
      <h1>Podcast View All</h1>
    </div>
  );
}

export default PodcastViewAll;
