import classNames from "classnames/bind";
import styles from "./Track.module.scss";

const cx = classNames.bind(styles);

function Track() {
  return (
    <div className={cx("wrapper")}>
      <h1>Track Page</h1>
    </div>
  );
}

export default Track;
