import classNames from "classnames/bind";
import styles from "./Track.module.scss";
import TrackInfo from "~/components/TrackInfo";

const cx = classNames.bind(styles);

function Track() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("frame")}>
          <TrackInfo />
        </div>
        <div className={cx("lyric-box")}>
          <div className={cx("lyric")}>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
            <h4 className={cx("lyric-line")}>Lyric line 1</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
