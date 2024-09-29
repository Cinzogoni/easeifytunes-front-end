import classNames from "classnames/bind";
import styles from "./PodcastPage.module.scss";

const cx = classNames.bind(styles);

function PodcastPage() {
  return (
    <div className={cx("wrapper")}>
      <h1>Podcast Page</h1>
    </div>
  );
}

export default PodcastPage;
