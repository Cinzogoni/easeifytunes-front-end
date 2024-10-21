import styles from "./SidebarPlaylist.module.scss";
import classNames from "classnames/bind";

import YourPlaylist from "~/components/YourPlaylist";

const cx = classNames.bind(styles);
function SidebarPlaylist() {
  return <div className={cx("wrapper")}>{<YourPlaylist />}</div>;
}

export default SidebarPlaylist;
