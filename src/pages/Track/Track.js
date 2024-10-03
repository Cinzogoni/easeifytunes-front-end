import classNames from "classnames/bind";
import styles from "./Track.module.scss";
import TrackInfo from "~/components/TrackInfo";

import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";

const cx = classNames.bind(styles);

function Track() {
  const { newReleases, trendingSongs } = useTrackInfo();
  const { trackTitle } = useParams();

  const allTrack = [...newReleases, ...trendingSongs];

  const track = allTrack.find((t) => t.trackTitle === trackTitle);

  const lyrics = track.trackLyric ? track.trackLyric.split("\n") : [];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("frame")}>
          <TrackInfo track={track} />
        </div>

        <div className={cx("lyric-box")}>
          <div className={cx("lyric")}>
            {lyrics.map((line, index) => (
              <h4 key={index} className={cx("lyric-line")}>
                {line}
              </h4>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
