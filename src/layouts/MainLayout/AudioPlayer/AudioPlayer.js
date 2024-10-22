import styles from "./AudioPlayer.module.scss";
import classNames from "classnames/bind";

import { useAudioPlayer } from "~/components/AudioPlayerProvider";

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
    handleRandomTrack,
    activeLoopClick,
    setActiveLoopClick,
    activeRandomClick,
    setActiveRandomClick,
  } = useAudioPlayer();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <Player
          trackId={currentTrackId}
          trackTitle={currentTrack?.trackTitle || "Unknown Title"}
          trackPerformer={currentTrack?.trackPerformer || "Unknown Performer"}
          trackLink={trackLink}
          trackType={currentTrack?.trackType || "Unknown Type"}
          isStatus={!!currentTrackId}
          onPlay={() => handlePlay(currentTrackId, currentTrack, trackLink)}
          onPause={handlePause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onLoop={handleLoop}
          onRandom={handleRandomTrack}
          activeLoopClick={activeLoopClick}
          setActiveLoopClick={setActiveLoopClick}
          activeRandomClick={activeRandomClick}
          setActiveRandomClick={setActiveRandomClick}
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
