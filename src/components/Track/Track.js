import classNames from "classnames/bind";
import styles from "./Track.module.scss";

const cx = classNames.bind(styles);

function Track({ info, list, containerPodcast }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container", { containerPodcast })}>
        <div className={cx("frame")}>{info}</div>
        <div className={cx("box")}>{list}</div>
      </div>
    </div>
  );
}

export default Track;
