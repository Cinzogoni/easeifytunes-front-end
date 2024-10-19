import classNames from "classnames/bind";
import styles from "./AlbumInfo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRotate,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);
function AlbumInfo({ albumInfo }) {
  const stageName =
    albumInfo && albumInfo.albumPerformer ? albumInfo.albumPerformer : "";
  const avatar =
    albumInfo && albumInfo.albumAvatar ? albumInfo.albumAvatar : "";
  const albumName = albumInfo && albumInfo.albumName ? albumInfo.albumName : "";
  const releaseDay =
    albumInfo && albumInfo.releaseDay ? albumInfo.releaseDay : "";

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Link
          to={routesConfig.musicMakerPage.replace(
            `:stageName`,
            stageName.replace(/\//g, "-")
          )}
        >
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Link>
      </div>

      <div className={cx("container")}>
        <img className={cx("avatar")} src={avatar} alt={albumName} />
        <div className={cx("info")}>
          <h3 className={cx("album-name")}>{albumName}</h3>
          <h4 className={cx("performer")}>{stageName}</h4>
          <h4 className={cx("release-day")}>Release day: {releaseDay}</h4>
          <div className={cx("player-func")}>
            <div className={cx("random-bg")}>
              <FontAwesomeIcon className={cx("random")} icon={faShuffle} />
            </div>
            <div className={cx("loop-bg")}>
              <FontAwesomeIcon className={cx("loop")} icon={faRotate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;
