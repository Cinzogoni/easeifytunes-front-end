import classNames from "classnames/bind";
import styles from "./AlbumPage.module.scss";

const cx = classNames.bind(styles);
function AlbumPage() {
  return (
    <div className={cx("wrapper")}>
      <h1>Album Page</h1>
    </div>
  );
}

export default AlbumPage;
