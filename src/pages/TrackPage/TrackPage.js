import classNames from "classnames/bind";
import styles from "./TrackPage.module.scss";

import TrackInfo from "~/components/TrackInfo";

import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";
import Track from "~/components/Track";

const cx = classNames.bind(styles);

function TrackPage() {
  const { newReleases, trendingSongs, musicMaker } = useTrackInfo();
  const { trackTitle, stageName } = useParams();

  const allTrack = [
    ...newReleases,
    ...trendingSongs,
    ...musicMaker.flatMap((maker) => [
      ...(maker.singles || []),
      ...maker.albums.flatMap((album) => album.tracks || []),
    ]),
  ];
  const track = allTrack.find((t) => t.title === trackTitle);

  const id = track && track.id ? track.id : "";
  const link = track && track.link ? track.link : "";
  const avatar = track && track.avatar ? track.avatar : "";
  const title = track && track.title ? track.title : "";
  const childStageName = track && track.stageName ? track.stageName : "";
  const type = track && track.type ? track.type : "";
  const genre = track && track.genre ? track.genre : "";
  const releaseDay = track && track.releaseDay ? track.releaseDay : "";
  const streamed = track && track.streamed ? track.streamed : "";

  const lyrics = track && track.lyric ? track.lyric.split("\n") : "";

  const allStageName = [...musicMaker];
  const musicMakerName = allStageName.find((t) => t.stageName === stageName);
  const mainStageName =
    musicMakerName && musicMakerName.stageName ? musicMakerName.stageName : "";

  return (
    <Track
      info={
        <TrackInfo
          id={id}
          link={link}
          avatar={avatar}
          title={title}
          childStageName={childStageName}
          type={type}
          genre={genre}
          releaseDay={releaseDay}
          streamed={streamed}
          mainStageName={mainStageName}
        />
      }
      list={
        <div className={cx("lyric")}>
          {lyrics.length > 0 ? (
            lyrics.map((line, index) => (
              <h4 key={index} className={cx("lyric-line")}>
                {line}
              </h4>
            ))
          ) : (
            <h4 className={cx("lyric-line")}>
              The lyrics are currently being updated
            </h4>
          )}
        </div>
      }
    />
  );
}

export default TrackPage;
