import classNames from "classnames/bind";
import styles from "./SidebarSupports.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function SidebarSupports() {
  return (
    <div className={cx("supports")}>
      <div className={cx("helps")}>
        <a href="/">
          <h6 className={cx("title")}>About Us</h6>
        </a>
        <a href="/">
          <h6 className={cx("title")}>Help Center</h6>
        </a>
        <a href="/">
          <h6 className={cx("title")}>Privacy Policy</h6>
        </a>
      </div>

      <button className={cx("languages")}>
        <FontAwesomeIcon className={cx("icon")} icon={faGlobe} />
        <h4 className={cx("choose")}>Languages</h4>
      </button>
    </div>
  );
}

export default SidebarSupports;
