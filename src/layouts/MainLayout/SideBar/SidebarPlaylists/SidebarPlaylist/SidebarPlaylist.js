import styles from "./SidebarPlaylist.module.scss";
import classNames from "classnames/bind";

import Playlist from "~/components/Playlist";

const cx = classNames.bind(styles);
function SidebarPlaylist() {
  return <div className={cx("wrapper")}>{<Playlist />}</div>;
}

export default SidebarPlaylist;
