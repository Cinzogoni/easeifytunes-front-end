import classNames from "classnames/bind";
import styles from "./MomentBox.module.scss";

import { useState, useRef } from "react";

const cx = classNames.bind(styles);

function MomentBox({ link, name }) {
  const videoRef = useRef(null);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("video-box")}></div>

      <video ref={videoRef} className={cx("video-player")} width="300" controls>
        <source src={link} type="video/mp4" />
      </video>
    </div>
  );
}

export default MomentBox;
