import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";
import { useEffect, useState, useCallback } from "react";

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

  // Chuyển vào Provider
  const [trackListData, setTrackListData] = useState(trackList);
  const [val, setVal] = useState(0);

  useEffect(() => {
    setTrackListData(trackList);
  }, [trackList]);

  const handleNextTrack = useCallback(() => {
    let index = (val + 1) % trackListData.length;
    setVal(index);
    setTrackListData(trackListData[index]);
  }, [val, trackListData]);

  const handlePrevTrack = useCallback(() => {
    let index = (val - 1 + trackList.length) % trackList.length;
    setVal(index);
    setTrackListData(trackList[index]);
  }, [val, trackListData]);

  return (
    <Track
      info={<AlbumInfo albumInfo={findAlbum} />}
      list={
        <AlbumList
          trackList={trackListData}
          avatar={avatar}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
        />
      }
    />
  );
}

export default AlbumPage;
