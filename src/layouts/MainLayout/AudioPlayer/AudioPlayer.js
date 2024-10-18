import styles from "./AudioPlayer.module.scss";
import classNames from "classnames/bind";

import { useEffect } from "react";
import { useAudioPlayer } from "~/components/AudioPlayerProvider";
import { useLocation } from "react-router-dom";

import Player from "~/components/Player";

const cx = classNames.bind(styles);
function AudioPlayer() {
  const {
    currentTrackId,
    currentTrack,
    setCurrentTrack,
    trackLink,
    handlePlay,
    handlePause,
    handleNextTrack,
    handlePrevTrack,
    handleLoop,
    trackList,
  } = useAudioPlayer();

  const location = useLocation();
  const isAlbumPage = location.pathname.startsWith(`/albumPage`);
  const isPlayListPage = location.pathname.startsWith(`/playListPage`);

  useEffect(() => {
    // console.log("AudioPlayer - Current Track:", currentTrack);
  }, [currentTrack]);

  useEffect(() => {
    if (trackList.length > 0 && (isAlbumPage || isPlayListPage)) {
      const track = trackList[currentTrackId];
      setCurrentTrack(track);
    }
  }, [currentTrackId, trackList, isAlbumPage, isPlayListPage]);

  const handlePlayTrack = () => {
    const track = trackList[currentTrackId];
    setCurrentTrack(track);
    handlePlay(currentTrackId, track, trackLink);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <Player
          trackId={currentTrackId}
          trackTitle={currentTrack?.trackTitle || "Unknown Title"}
          trackPerformer={currentTrack?.trackPerformer || "Unknown Performer"}
          trackLink={trackLink}
          isStatus={!!currentTrackId}
          onPlay={handlePlayTrack}
          onPause={handlePause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onLoop={() => handleLoop()}
          //
          frameFooterResize
          playerFooterResize
          playerFooterBtn
          playFooterIcon
          stopperFooterBtn
          stopFooterIcon
          waveformBoxFooter
          footerInfo
          playTimeFooter
          actionsFooter
          actionsFooterLeft
          actionsFooterRight
          //
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
