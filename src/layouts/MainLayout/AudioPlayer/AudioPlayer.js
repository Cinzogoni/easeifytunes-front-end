import styles from "./AudioPlayer.module.scss";
import classNames from "classnames/bind";

import { useAudioPlayer } from "~/components/AudioPlayerProvider";
import { useTrackInfo } from "~/components/TrackInfoProvider";

import Player from "~/components/Player";

const cx = classNames.bind(styles);
function AudioPlayer() {
  const {
    currentTrackId,
    currentTrack,
    trackLink,
    handlePlay,
    handlePause,
    handleNextTrack,
    handlePrevTrack,
    handleLoop,
    activeLoopClick,
    setActiveLoopClick,
  } = useAudioPlayer();
  const { musicMaker } = useTrackInfo();

  const allTracksInAlbum =
    musicMaker?.albums?.flatMap((album) => album.tracks) || [];
  const trackInAlbum = allTracksInAlbum.find(
    (track) => track.id === currentTrackId
  );
  const isAlbum = !!trackInAlbum;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <Player
          trackId={currentTrackId}
          trackTitle={currentTrack?.trackTitle || "Unknown Title"}
          trackPerformer={currentTrack?.trackPerformer || "Unknown Performer"}
          trackLink={trackLink}
          isStatus={!!currentTrackId}
          onPlay={() =>
            handlePlay(currentTrackId, currentTrack, trackLink, isAlbum)
          }
          onPause={handlePause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onLoop={handleLoop}
          activeLoopClick={activeLoopClick}
          setActiveLoopClick={setActiveLoopClick}
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
