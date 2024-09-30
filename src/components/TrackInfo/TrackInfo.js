import classNames from "classnames/bind";
import styles from "./TrackInfo.module.scss";

const cx = classNames.bind(styles);

function TrackInfo() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <img className={cx("avatar")} src="" alt="" />
        <div className={cx("info")}>
          <h2 className={cx("title")}>{}</h2>
          <h3 className={cx("performer")}>{}</h3>
        </div>
      </div>
    </div>
  );
}

export default TrackInfo;
