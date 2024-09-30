import classNames from "classnames/bind";
import styles from "./MomentBox.module.scss";

import { useState } from "react";

const cx = classNames.bind(styles);

function MomentBox({ link, date, name }) {
  return (
    <div className={cx("wrapper")}>
      <video className={cx("video-player")} controls controlsList="nodownload">
        <source src={link} type="video/mp4" />
      </video>

      <div className={cx("video-box")}>
        <div className={cx("info")}>
          <h6 className={cx("date")}>{date}</h6>
          <h6 className={cx("title")}>{name}</h6>
        </div>
      </div>
    </div>
  );
}

export default MomentBox;
