import classNames from "classnames/bind";
import styles from "./MusicMakerViewAll.module.scss";

const cx = classNames.bind(styles);
function MusicMakerViewAll() {
  return (
    <div className={cx("wrapper")}>
      <h1>Music Maker View All</h1>
    </div>
  );
}

export default MusicMakerViewAll;
