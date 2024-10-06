import classNames from "classnames/bind";
import styles from "./MusicMakerItems.module.scss";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);
function MusicMakerItems({
  musicMakerAvatar,
  musicMakerStageName,
  musicMakerRole,
}) {
  return (
    <div className={cx("wrapper")}>
      <Link
        to={routesConfig.musicMakerPage.replace(
          `:stageName`,
          musicMakerStageName
        )}
      >
        <div className={cx("info-box")}>
          <img
            className={cx("avatar")}
            src={musicMakerAvatar}
            alt={musicMakerStageName}
          />
          <div>
            <h6 className={cx("name")}>{musicMakerStageName}</h6>
            <p className={cx("role")}>{musicMakerRole}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MusicMakerItems;
