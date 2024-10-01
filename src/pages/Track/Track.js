import classNames from "classnames/bind";
import styles from "./Track.module.scss";
import TrackInfo from "~/components/TrackInfo";

import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";

const cx = classNames.bind(styles);

function Track() {
  const { newReleases, trendingSongs } = useTrackInfo();
  const { trackTitle } = useParams();
  console.log("New Releases:", newReleases);
  console.log("Trending Songs:", trendingSongs);

  const allTrack = [...newReleases, ...trendingSongs];

  const track = allTrack.find((t) => t.trackTitle === trackTitle);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("frame")}>
          <TrackInfo track={track} />
        </div>
        <div className={cx("lyric-box")}>
          <div className={cx("lyric")}>
            <h4 className={cx("lyric-line")}>Lyric line </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
