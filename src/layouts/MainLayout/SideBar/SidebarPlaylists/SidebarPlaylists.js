import classNames from "classnames/bind";
import styles from "./SidebarPlaylists.module.scss";

import AuthService from "~/services/authService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SidebarPlaylist from "./SidebarPlaylist/SidebarPlaylist";

const cx = classNames.bind(styles);
function SidebarPlaylists({ children }) {
  return (
    <div className={cx("playlists")}>
      <div className={cx("heading")}>
        <h3>Your Playlists</h3>
        <FontAwesomeIcon className={cx("icon")} icon={faPlus} />
      </div>

      <div className={cx("frame")}>
        {AuthService() ? (
          // Đã đăng nhập
          <SidebarPlaylist>{children}</SidebarPlaylist>
        ) : (
          // Chưa đăng nhập
          <div className={cx("services")}></div>
        )}
      </div>
    </div>
  );
}

export default SidebarPlaylists;
