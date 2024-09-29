import classNames from "classnames/bind";
import styles from "./AlbumBox.module.scss";

const cx = classNames.bind(styles);

function AlbumBox({ albumId, albumAvatar, albumName, albumPerformer }) {
  return (
    <div className={cx("container")}>
      <div className={cx("frame")}>
        <img className={cx("avatar")} src={albumAvatar} alt={albumName} />
      </div>

      <div className={cx("desc")}>
        <h5 className={cx("album-name")}>{albumName}</h5>
        <h6 className={cx("album-performer")}>{albumPerformer}</h6>
      </div>
    </div>
  );
}

export default AlbumBox;
