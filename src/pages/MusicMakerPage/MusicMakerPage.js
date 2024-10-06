import classNames from "classnames/bind";
import styles from "./MusicMakerPage.module.scss";

import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";

import Track from "~/components/Track";
import MusicMakerInfo from "~/components/MusicMakerInfo";
import MusicMakerList from "~/components/MusicMakerList";

const cx = classNames.bind(styles);

function MusicMakerPage() {
  const { musicMaker } = useTrackInfo();
  const { stageName } = useParams();

  const allStageName = [...musicMaker];

  const musicMakerName = allStageName.find((t) => t.stageName === stageName);
  const musicAlbums =
    musicMakerName && musicMakerName.albums ? musicMakerName.albums : [];

  return (
    <Track
      info={<MusicMakerInfo musicMakerName={musicMakerName} />}
      list={<MusicMakerList musicAlbums={musicAlbums} />}
    />
  );
}

export default MusicMakerPage;
