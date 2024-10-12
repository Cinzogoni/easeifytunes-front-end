import classNames from "classnames/bind";
import styles from "./TrackPage.module.scss";

import TrackInfo from "~/components/TrackInfo";

import { useParams, useNavigate } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";
import Track from "~/components/Track";

import routesConfig from "~/config/routes";
const cx = classNames.bind(styles);

function TrackPage() {
  const { musicMaker } = useTrackInfo();
  const { stageName, trackTitle, id } = useParams();
  const navigate = useNavigate();

  const allTrack = [
    ...musicMaker.flatMap((maker) => [
      ...(maker.singles || []),
      ...maker.albums.flatMap((album) =>
        album.tracks.map((track) => ({
          ...track,
          albumAvatar: album.albumAvatar,
        }))
      ),
    ]),
  ];

  const track = allTrack.find(
    (t) => t.stageName === stageName && t.title === trackTitle
  );

  const trackId = track && track.id ? track.id : "";
  const link = track && track.link ? track.link : "";
  const avatar =
    track && track.albumAvatar ? track.albumAvatar : track.avatar || "";
  const title = track && track.title ? track.title : "";
  const musicMakerName = track && track.stageName ? track.stageName : "";
  const mainMusicMaker =
    track && track.mainMusicMaker ? track.mainMusicMaker : "";
  const type = track && track.type ? track.type : "";
  const genre = track && track.genre ? track.genre : "";
  const releaseDay = track && track.releaseDay ? track.releaseDay : "";
  const streamed = track && track.streamed ? track.streamed : "";

  const lyrics = track && track.lyric ? track.lyric.split("\n") : "";

  const handleLink = () => {
    if (track) {
      const single = musicMaker.flatMap((maker) =>
        maker.tracks?.flatMap((single) =>
          single.singles.filter((t) => t.id === track.id)
        )
      );

      const album = musicMaker.flatMap((maker) =>
        maker.albums.flatMap((album) =>
          album.tracks
            .filter((t) => t.id === track.id)
            .map(() => ({
              albumPerformer: album.albumPerformer,
              albumName: album.albumName,
            }))
        )
      );

      if (single.length > 0) {
        const linkToNavigate = routesConfig.musicMakerPage.replace(
          ":stageName",
          track.mainMusicMaker.replace(/,/g, "-")
        );
        navigate(linkToNavigate);
      }
      //
      if (album.length > 0) {
        const { albumName, albumPerformer } = album[0];
        const linkToNavigate = routesConfig.albumPage
          .replace(`:albumPerformer`, albumPerformer.replace(/\//g, "-"))
          .replace(`:albumName`, albumName.replace(/\//g, "-"));
        navigate(linkToNavigate);
      }
    }
  };

  return (
    <Track
      info={
        <TrackInfo
          id={trackId}
          link={link}
          avatar={avatar}
          title={title}
          stageName={musicMakerName}
          type={type}
          genre={genre}
          releaseDay={releaseDay}
          streamed={streamed}
          mainMusicMaker={mainMusicMaker}
          linkTo={handleLink}
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
