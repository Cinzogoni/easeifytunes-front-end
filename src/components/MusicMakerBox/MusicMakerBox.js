import classNames from "classnames/bind";
import styles from "./MusicMakerBox.module.scss";

import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function MusicMakerBox({ avatar, stageName, role }) {
  return (
    <div className={cx("container")}>
      <Link
        className={cx("link")}
        to={routesConfig.musicMakerPage.replace(`:stageName`, stageName)}
      />

      <div className={cx("frame")}>
        <img className={cx("avatar")} src={avatar} alt={stageName} />
      </div>

      <div className={cx("desc")}>
        <h5 className={cx("name")}>{stageName}</h5>
        <h6 className={cx("role")}>{role}</h6>
      </div>
    </div>
  );
}

export default MusicMakerBox;
