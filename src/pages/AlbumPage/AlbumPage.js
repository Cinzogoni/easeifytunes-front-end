import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";

import Track from "~/components/Track";
import AlbumInfo from "~/components/AlbumInfo";
import AlbumList from "~/components/AlbumList";

function AlbumPage() {
  const { musicMaker } = useTrackInfo();
  const { albumName, albumPerformer } = useParams();

  const allPerformer = [
    ...musicMaker.flatMap((performer) => performer.albums || []),
  ];

  const findAlbum = allPerformer.find(
    (t) => t.albumName === albumName && t.albumPerformer === albumPerformer
  );

  const avatar = findAlbum ? findAlbum.albumAvatar || "" : "";
  const trackList = findAlbum ? findAlbum.tracks || [] : [];

  return (
    <Track
      info={<AlbumInfo albumInfo={findAlbum} />}
      list={<AlbumList trackList={trackList} avatar={avatar} />}
    />
  );
}

export default AlbumPage;
