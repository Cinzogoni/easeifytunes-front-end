import classNames from "classnames/bind";
import styles from "./PlaylistPage.module.scss";

const cx = classNames.bind(styles);

function PlaylistPage() {
  return (
    <div className={cx("wrapper")}>
      <h1>Playlist Page</h1>
    </div>
  );
}

export default PlaylistPage;
