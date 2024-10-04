import classNames from "classnames/bind";
import styles from "./PlaylistPage.module.scss";

const cx = classNames.bind(styles);

function PlaylistPage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1>Playlist Page</h1>
      </div>
    </div>
  );
}

export default PlaylistPage;
