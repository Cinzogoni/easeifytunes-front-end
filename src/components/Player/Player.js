import { useRef, useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Player.module.scss";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardFast,
  faForwardFast,
  faPause,
  faPlay,
  faRotate,
  faShuffle,
  faStop,
  faVolumeHigh,
  faPlus,
  faExpand,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Player({
  trackId,
  trackLink,
  trackTitle,
  trackPerformer,
  //
  isStatus,
  onPlay,
  onPause,
  setListeners,
  // Trending Songs
  frameResize,
  playerResize,
  playBtn,
  playIcon,
  stopBtn,
  stopIcon,
  waveformBox,
  // Footer
  frameFooterResize,
  playerFooterResize,
  playerFooterBtn,
  playFooterIcon,
  stopperFooterBtn,
  stopFooterIcon,
  waveformBoxFooter,
  footerInfo,
  playTimeFooter,
  actionsFooterLeft,
  actionsFooterRight,
  //TrackInfo
  frameTrackInfoResize,
  playerTrackInfoResize,
  playtimeTrackInfo,
  randomTrackInfo,
  actionTrackInfoLeft,
  actionTrackInfoRight,
  prevTrackInfo,
  nextTrackInfo,
  playerTrackInfo,
  stopperTrackInfo,
  volumeBarTrackInfo,
}) {
  const {
    playerRefs,
    setCurrentTrackId,
    setCurrentTrack,
    setTrackLink,
    handleStop,
    handleLoop,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    isTrackEnded,
    setIsTrackEnded,
  } = useAudioPlayer();

  const [show, setShow] = useState(false);
  const [activeStopClick, setActiveStopClick] = useState(null);
  const [activeLoopClick, setActiveLoopClick] = useState(null);

  const timeStartRef = useRef(null);
  const timeEndRef = useRef(null);
  const timingBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const saveIsTrackListening = () => {
    const trackData = {
      trackId,
      trackLink,
      trackTitle,
      trackPerformer,
    };
    localStorage.setItem("reloadPage", JSON.stringify(trackData));
  };

  useEffect(() => {
    const savedTrack = localStorage.getItem("reloadPage");
    if (savedTrack) {
      const trackData = JSON.parse(savedTrack);
      setCurrentTrackId(trackData.trackId);
      setCurrentTrack(trackData);
      setTrackLink(trackData.trackLink || ``);
      handleStop();
    }
  }, [setCurrentTrack, setCurrentTrackId, setTrackLink]);

  useEffect(() => {
    const player = playerRefs.current;

    const loadedMetadata = () => {
      if (timeEndRef.current) {
        timeEndRef.current.innerHTML = formatTime(player.duration);
        setDuration(player.duration);
      }
    };

    const timeUpdate = () => {
      if (timeStartRef.current) {
        timeStartRef.current.innerHTML = formatTime(player.currentTime);
        setCurrentTime(player.currentTime);
      }
    };

    player.addEventListener("loadedmetadata", loadedMetadata);
    player.addEventListener("timeupdate", timeUpdate);

    return () => {
      player.removeEventListener("loadedmetadata", loadedMetadata);
      player.removeEventListener("timeupdate", timeUpdate);
    };
  }, []);

  const handlePlayClick = () => {
    onPlay();
    setTimeout(() => {
      setIsTrackEnded(false);
      setShow(true);
    }, 100);
    saveIsTrackListening();
    console.log("The track is playing!");
  };

  const handlePauseClick = () => {
    onPause();
    setTimeout(() => {
      setIsTrackEnded(true);
      setShow(false);
    }, 100);
    console.log("The track has paused!");
  };

  const handleStopClick = () => {
    handleStop();
    setActiveStopClick("stopClick-bg");
    setTimeout(() => {
      setIsTrackEnded(true);
      setShow(false);
    }, 100);
    setTimeout(() => {
      setActiveStopClick(null);
    }, 250);
    console.log("The track has stopped and reset!");
  };

  const handleLoopClick = () => {
    if (activeLoopClick === "loopTrack-bg") {
      handleLoop(false);
      setActiveLoopClick(null);
      console.log("Track looping mode off!");
    } else {
      handleLoop(true);
      setActiveLoopClick("loopTrack-bg");
      console.log("Track looping mode on!");
    }
  };

  const handleVolumeChange = (e) => {
    const bar = volumeBarRef.current;
    const position = bar.getBoundingClientRect();
    const offsetX = e.clientX - position.left;
    const pointVolume = Math.min(Math.max(offsetX / position.width, 0), 1);
    setVolume(pointVolume);
    playerRefs.current.volume = pointVolume;
  };

  const handleTimingChange = (e) => {
    const timeBar = timingBarRef.current;
    const positionTime = timeBar.getBoundingClientRect();
    const offsetX = e.clientX - positionTime.left;
    const pointTime = Math.min(Math.max(offsetX / positionTime.width, 0), 1);
    const selectTime = pointTime * playerRefs.current.duration;
    setCurrentTime(selectTime);
    playerRefs.current.currentTime = selectTime;
  };

  const handleMouseDownVolume = (e) => {
    handleVolumeChange(e);
    document.addEventListener("mousemove", handleVolumeChange);
    document.addEventListener("mouseup", handleMouseUpVolume);
  };

  const handleMouseUpVolume = () => {
    document.removeEventListener("mousemove", handleVolumeChange);
    document.removeEventListener("mouseup", handleMouseUpVolume);
  };

  const handleMouseDownTiming = (e) => {
    handleTimingChange(e);
    document.addEventListener("mousemove", handleTimingChange);
    document.addEventListener("mouseup", handleMouseUpTiming);
  };

  const handleMouseUpTiming = () => {
    document.removeEventListener("mousemove", handleTimingChange);
    document.removeEventListener("mouseup", handleMouseUpTiming);
  };

  return (
    <div
      className={cx(
        "frame",
        {
          show: show && isStatus && !isTrackEnded,
        },
        { frameResize },
        { frameFooterResize },
        { frameTrackInfoResize }
      )}
    >
      {/* AudioPlayer Footer */}
      <div className={cx("info", { footerInfo })}>
        <div className={cx("zoom")}>
          <FontAwesomeIcon className={cx("expand")} icon={faExpand} />
        </div>

        <div className={cx("sign")}>
          <h6 className={cx("title")}>{`${trackTitle} - ${trackPerformer}`}</h6>
        </div>

        <div className={cx("add")}>
          <FontAwesomeIcon className={cx("plus")} icon={faPlus} />
        </div>
      </div>

      {/* AudioPlayer Footer */}
      <div
        className={cx("play-time", { playTimeFooter }, { playtimeTrackInfo })}
      >
        <h6 className={cx("time-start")} ref={timeStartRef}>
          {formatTime(currentTime)}
        </h6>

        <div
          className={cx("time-bar")}
          ref={timingBarRef}
          onMouseDown={handleMouseDownTiming}
        >
          <div
            className={cx("timing")}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className={cx("point-bg")}
            style={{
              position: `absolute`,
              left: `${(currentTime / duration) * 98}%`,
            }}
          >
            <FontAwesomeIcon className={cx("breakpoint")} icon={faCircle} />
          </div>
        </div>

        <h6 className={cx("time-end")} ref={timeEndRef}>
          {formatTime(duration)}
        </h6>
      </div>
      {/* ---------------- */}

      <div
        className={cx(
          "player",
          { playerResize },
          { playerFooterResize },
          { playerTrackInfoResize }
        )}
      >
        {isStatus && !isTrackEnded && (
          <div
            className={cx(
              "waveform-box",
              { waveformBox },
              { waveformBoxFooter }
            )}
          >
            <div className={cx("waveform")}>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
            </div>
          </div>
        )}

        {/* AudioPlayer Footer */}
        <div
          className={cx(
            "actions",
            { actionsFooterLeft },
            { actionTrackInfoLeft }
          )}
        >
          <div className={cx("randomTrack-bg", { randomTrackInfo })}>
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faShuffle}
            />
          </div>

          <div
            className={cx("loopTrack-bg")}
            onClick={handleLoopClick}
            style={{
              backgroundColor:
                activeLoopClick === "loopTrack-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeLoopClick === "loopTrack-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
              transition: "transform 0.5s linear",
              transform:
                activeLoopClick === "loopTrack-bg"
                  ? "rotate(360deg)"
                  : "rotate(0deg)",
            }}
          >
            <FontAwesomeIcon className={cx("actions-footer")} icon={faRotate} />
          </div>

          <div
            className={cx("stopClick-bg")}
            onClick={handleStopClick}
            style={{
              backgroundColor:
                activeStopClick === "stopClick-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeStopClick === "stopClick-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
            }}
          >
            <FontAwesomeIcon className={cx("actions-footer")} icon={faPause} />
          </div>

          <div className={cx("prevTrack-bg", { prevTrackInfo })}>
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faBackwardFast}
            />
          </div>
        </div>
        {/* ---------------- */}
        {(!isStatus || isTrackEnded) && (
          <div
            className={cx(
              "player-btn",
              { playBtn },
              { playerFooterBtn },
              { playerTrackInfo }
            )}
            onClick={handlePlayClick}
          >
            <div className={cx("play-box")}>
              <FontAwesomeIcon
                className={cx("play", { playIcon }, { playFooterIcon })}
                icon={faPlay}
              />
            </div>
          </div>
        )}

        {isStatus && !isTrackEnded && (
          <div
            className={cx(
              "stopper-btn",
              { stopBtn },
              { stopperFooterBtn },
              { stopperTrackInfo }
            )}
            onClick={handlePauseClick}
          >
            <div className={cx("stop-box")}>
              <FontAwesomeIcon
                className={cx("stop", { stopIcon }, { stopFooterIcon })}
                icon={faStop}
              />
            </div>
          </div>
        )}

        {/* AudioPlayer Footer */}
        <div
          className={cx(
            "actions",
            { actionsFooterRight },
            { actionTrackInfoRight }
          )}
        >
          <div className={cx("nextTrack-bg", { nextTrackInfo })}>
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faForwardFast}
            />
          </div>

          <div className={cx("volume-bg")}>
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faVolumeHigh}
            />
          </div>

          <div
            className={cx("volume-bar", { volumeBarTrackInfo })}
            ref={volumeBarRef}
            onMouseDown={handleMouseDownVolume}
          >
            <div
              className={cx("volume-line")}
              style={{
                width: `${volume * 100}%`,
              }}
            />

            <div
              className={cx("volume-dot")}
              style={{
                position: `absolute`,
                left: `${volume * 100}%`,
              }}
            >
              <FontAwesomeIcon className={cx("volume-point")} icon={faCircle} />
            </div>
          </div>
        </div>
        {/* ---------------- */}
        {isStatus && !isTrackEnded && (
          <div
            className={cx(
              "waveform-box",
              { waveformBox },
              { waveformBoxFooter }
            )}
          >
            <div className={cx("waveform")}>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Player;
