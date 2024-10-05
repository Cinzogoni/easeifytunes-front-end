import classNames from "classnames/bind";
import styles from "./TrackPage.module.scss";

import TrackInfo from "~/components/TrackInfo";

import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";
import Track from "~/components/Track";

const cx = classNames.bind(styles);

function TrackPage() {
  const { newReleases, trendingSongs } = useTrackInfo();
  const { trackTitle } = useParams();

  const allTrack = [...newReleases, ...trendingSongs];

  const track = allTrack.find((t) => t.trackTitle === trackTitle);

  const lyrics = track.trackLyric ? track.trackLyric.split("\n") : [];

  return (
    <Track
      info={<TrackInfo track={track} />}
      list={
        <div className={cx("lyric")}>
          {lyrics.map((line, index) => (
            <h4 key={index} className={cx("lyric-line")}>
              {line}
            </h4>
          ))}
        </div>
      }
    />
  );
}

export default TrackPage;
