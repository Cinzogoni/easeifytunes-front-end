import classNames from "classnames/bind";
import styles from "./AlbumInfo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);
function AlbumInfo({ albumInfo }) {
  const mainMusicMaker =
    albumInfo && albumInfo.albumPerformer ? albumInfo.albumPerformer : "";

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Link
          to={routesConfig.musicMakerPage.replace(
            `:stageName`,
            mainMusicMaker.replace(/,/g, "-")
          )}
        >
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Link>
      </div>

      <div className={cx("container")}>
        <img
          className={cx("avatar")}
          src={albumInfo.albumAvatar}
          alt={albumInfo.albumName}
        />
        <div className={cx("info")}>
          <h3 className={cx("album-name")}>{albumInfo.albumName}</h3>
          <h4 className={cx("performer")}>{albumInfo.albumPerformer}</h4>
          <h4 className={cx("release-day")}>
            Release day: {albumInfo.releaseDay}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;
