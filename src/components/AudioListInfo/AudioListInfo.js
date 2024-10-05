import classNames from "classnames/bind";
import styles from "./AudioListInfo.module.scss";

const cx = classNames.bind(styles);

function AudioListInfo() {
  return (
    <div className={cx("wrapper")}>
      <h1>Audio List Info</h1>
    </div>
  );
}

export default AudioListInfo;
