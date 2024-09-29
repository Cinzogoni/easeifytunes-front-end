import classNames from "classnames/bind";
import styles from "./AlbumViewAll.module.scss";

const cx = classNames.bind(styles);
function AlbumViewAll() {
  return (
    <div className={cx("wrapper")}>
      <h1>Album View All</h1>
    </div>
  );
}

export default AlbumViewAll;
