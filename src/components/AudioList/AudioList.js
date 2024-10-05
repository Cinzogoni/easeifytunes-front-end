import classNames from "classnames/bind";
import styles from "./AudioList.module.scss";

const cx = classNames.bind(styles);

function AudioList() {
  return (
    <div className={cx("wrapper")}>
      <h1> Audio List</h1>
    </div>
  );
}

export default AudioList;
