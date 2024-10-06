import classNames from "classnames/bind";
import styles from "./Image.module.scss";

import avatar from "~/assets/images/avatar/avatar.jpg";

const cx = classNames.bind(styles);

function Image() {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("user-avatar")} src={avatar} alt="" />
    </div>
  );
}

export default Image;
