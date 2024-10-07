import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";

import Track from "~/components/Track";
import MusicMakerInfo from "~/components/MusicMakerInfo";
import MusicMakerList from "~/components/MusicMakerList";

function MusicMakerPage() {
  const { musicMaker } = useTrackInfo();
  const { stageName } = useParams();

  const allStageName = [...musicMaker];

  const musicMakerName = allStageName.find((t) => t.stageName === stageName);
  const musicAlbums =
    musicMakerName && musicMakerName.albums ? musicMakerName.albums : [];

  const musicSingles =
    musicMakerName && musicMakerName.singles ? musicMakerName.singles : [];
  return (
    <Track
      info={<MusicMakerInfo musicMakerName={musicMakerName} />}
      list={
        <MusicMakerList musicAlbums={musicAlbums} musicSingles={musicSingles} />
      }
    />
  );
}

export default MusicMakerPage;
