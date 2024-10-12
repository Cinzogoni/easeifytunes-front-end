import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./TrackPopper.module.scss";

const cx = classNames.bind(styles);
function TrackPopper({
  children,
  trackPerformer,
  trackTitle,
  trackType,
  trackGenre,
  releaseDay,
}) {
  return (
    <Tippy
      render={(attrs) => (
        <>
          <div className={cx("info-box")} tabIndex={-1} {...attrs}>
            <h6 className={cx("desc")}>Performer: {trackPerformer}</h6>
            <h6 className={cx("desc")}>Title: {trackTitle}</h6>
            <h6 className={cx("desc")}>Type: {trackType}</h6>
            <h6 className={cx("desc")}>Genre: {trackGenre} </h6>
            <h6 className={cx("desc")}>Release day: {releaseDay}</h6>
          </div>
          <div className={cx("triangle-box")}>
            <div className={cx("triangle")}></div>
          </div>
        </>
      )}
    >
      {children}
    </Tippy>
  );
}

export default TrackPopper;
