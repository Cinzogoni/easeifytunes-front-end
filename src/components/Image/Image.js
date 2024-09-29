import classNames from "classnames/bind";
import styles from "./Image.module.scss";

import avatar from "~/assets/images/avatar/avatar.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Image() {
  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon className={cx("icon")} icon={faBell} />
      <img className={cx("user-avatar")} src={avatar} alt="" />
    </div>
  );
}

export default Image;
