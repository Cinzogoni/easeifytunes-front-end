import { useRef, useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Player.module.scss";

import { Link, useLocation } from "react-router-dom";
import { useAudioPlayer } from "../AudioPlayerProvider";

import routesConfig from "~/config/routes";

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
  faCircle,
  faListCheck,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Player({
  trackId,
  trackTitle,
  trackPerformer,
  trackType,
  //
  isStatus,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onLoop,
  onRandom,
  activeLoopClick,
  setActiveLoopClick,
  activeRandomClick,
  setActiveRandomClick,
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
  loopTrackInfo,
  loopBGTrackInfo,
  pauseTrackInfo,
  pauseBGTrackInfo,
  playerTrackInfo,
  playIconTrackInfo,
  stopperTrackInfo,
  stopIconTrackInfo,
  volumeBarTrackInfo,
  volumeBGTrackInfo,
  volumeIconTrackInfo,
  //Single Tracks
  frameSingleTracks,
  playerSingleTracks,
  waveformBoxSingleTracks,
  stopperSingleTracks,
  //AlbumList
  playerAlbumList,
  stopperAlbumList,
  actionsAlbumList,
  hideAlbumList,
  //AlbumInfo
  playerAlbumInfo,
  playerAlbumInfoResize,
  actionsAlbumInfo,
  hideAlbumInfo,
  frameAlbumInfo,
  spaceAlbumInfo,
  //
  framePodcastResize,
  playerPodcastList,
  stopperPodcastList,
}) {
  const {
    playerRefs,
    setCurrentTrackId,
    setCurrentTrack,
    handleStop,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    isTrackEnded,
    trackIndex,
    trackList,
    setIsTrackEnded,
  } = useAudioPlayer();

  const [show, setShow] = useState(false);
  const [activeClick, setActiveClick] = useState(null);

  const timeStartRef = useRef(null);
  const timeEndRef = useRef(null);
  const timingBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const randomTrackBgRef = useRef(null);

  const location = useLocation();
  const isAlbumPage = location.pathname.startsWith(`/albumPage`);
  const isPlayListPage = location.pathname.startsWith(`/playListPage`);
  const isPodcastPage = location.pathname.startsWith(`/podcastPage`);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const linkToTrack = routesConfig.track
    .replace(`:stageName`, trackPerformer)
    .replace(`:trackTitle`, trackTitle);

  const linkToPodcast = routesConfig.podcastAudioPage
    .replace(`:publisher`, trackPerformer)
    .replace(`:title`, trackTitle);

  // console.log(trackPerformer, trackTitle, trackType);

  const chooseLink = !trackType
    ? null
    : trackType === "Podcast"
    ? linkToPodcast
    : trackType === "Album" || trackType === "Single"
    ? linkToTrack
    : linkToTrack;

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
  }, [playerRefs]);

  useEffect(() => {
    // console.log(trackTitle, trackPerformer, trackType);
  }, [trackTitle, trackPerformer, trackType, chooseLink]);

  useEffect(() => {
    const resetStyles = () => {
      if (randomTrackBgRef.current) {
        randomTrackBgRef.current.style.background = "transparent";
        randomTrackBgRef.current.style.border = "1px solid transparent";
      }
    };

    const applyStyles = () => {
      if (randomTrackBgRef.current) {
        if (activeRandomClick) {
          randomTrackBgRef.current.style.background =
            "rgba(255, 255, 255, 0.2)";
          randomTrackBgRef.current.style.border =
            "1px solid rgba(255, 255, 255, 0.2)";
        } else {
          resetStyles();
        }
      }
    };

    const isInValidPage = isAlbumPage || isPlayListPage || isPodcastPage;

    if (isInValidPage) {
      applyStyles();
    } else {
      resetStyles();
    }
  }, [location, activeRandomClick]);

  const handlePlayClick = (id) => {
    if (id) {
      setCurrentTrackId(id);
      setCurrentTrack(trackList[trackIndex]);
    }
    onPlay();
    setTimeout(() => {
      setIsTrackEnded(false);
      setShow(true);
    }, 100);
    // console.log("The track is playing!");
  };

  const handlePauseClick = () => {
    onPause();
    setTimeout(() => {
      setIsTrackEnded(true);
      setShow(false);
    }, 100);
    // console.log("The track has paused!");
  };

  const handleStopClick = () => {
    handleStop();
    setActiveClick("stopClick-bg");
    setTimeout(() => {
      setIsTrackEnded(true);
      setShow(false);
    }, 100);
    setTimeout(() => {
      setActiveClick(null);
    }, 250);
    // console.log("The track has stopped and reset!");
  };

  const handleRandomClick = () => {
    if (isAlbumPage || isPlayListPage || isPodcastPage) {
      const newActiveClick = !activeRandomClick;
      setActiveRandomClick(newActiveClick);
      onRandom(newActiveClick);
    } else {
      if (activeRandomClick) {
        setActiveRandomClick(false);
        onRandom(false);
      }
    }
  };

  const handleLoopClick = () => {
    const newActiveState = !activeLoopClick;
    setActiveLoopClick(newActiveState);
    onLoop(newActiveState);
  };

  const handleNextClick = () => {
    const nextIndex = (trackIndex + 1) % trackList.length;
    const nextTrack = trackList[nextIndex];

    if (isAlbumPage && trackList.length > 0) {
      handlePlayClick(nextTrack.id);
      onNext();
      setActiveClick("nextTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Next Track!");
    }

    if (isPlayListPage && trackList.length > 0) {
      handlePlayClick(nextTrack.id);
      onNext();
      setIsTrackEnded(false);
      setActiveClick("nextTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Next Track!");
    }

    if (isPodcastPage && trackList.length > 0) {
      handlePlayClick(nextTrack.id);
      onNext();
      setIsTrackEnded(false);
      setActiveClick("nextTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Next Track!");
    }
  };

  const handlePrevClick = () => {
    const prevIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    const prevTrack = trackList[prevIndex];

    if (isAlbumPage && trackList.length > 0) {
      handlePlayClick(prevTrack.id);
      onPrev();
      setIsTrackEnded(false);
      setActiveClick("prevTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Prev Track!");
    }

    if (isPlayListPage && trackList.length > 0) {
      handlePlayClick(prevTrack.id);
      onPrev();
      setIsTrackEnded(false);
      setActiveClick("prevTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Prev Track!");
    }

    if (isPodcastPage && trackList.length > 0) {
      handlePlayClick(prevTrack.id);
      onPrev();
      setIsTrackEnded(false);
      setActiveClick("prevTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Prev Track!");
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
        { frameTrackInfoResize },
        { frameSingleTracks },
        { frameAlbumInfo },
        { framePodcastResize }
      )}
    >
      {/* AudioPlayer Footer */}
      <div className={cx("info", { footerInfo })}>
        <div className={cx("library")}>
          <FontAwesomeIcon className={cx("playlist")} icon={faCompactDisc} />
        </div>

        <div className={cx("sign")}>
          {trackTitle && trackPerformer && (
            <h6 className={cx("title")}>
              <Link to={chooseLink}>{`${trackTitle} - ${trackPerformer}`}</Link>
            </h6>
          )}
        </div>

        <div className={cx("add")}>
          <FontAwesomeIcon className={cx("plus")} icon={faListCheck} />
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
          { playerTrackInfoResize },
          { playerSingleTracks },
          { playerAlbumInfoResize },
          { playerPodcastList }
        )}
      >
        {isStatus && !isTrackEnded && (
          <div
            className={cx(
              "waveform-box",
              { waveformBox },
              { waveformBoxFooter },
              { waveformBoxSingleTracks }
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
            { actionTrackInfoLeft },
            { actionsAlbumList },
            { actionsAlbumInfo }
          )}
        >
          <div
            ref={randomTrackBgRef}
            className={cx(
              "randomTrack-bg",
              { randomTrackInfo },
              { hideAlbumList },
              { spaceAlbumInfo }
            )}
            onClick={handleRandomClick}
          >
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faShuffle}
            />
          </div>

          <div
            className={cx(
              "loopTrack-bg",
              { loopBGTrackInfo },
              { hideAlbumList },
              { spaceAlbumInfo }
            )}
            style={{
              backgroundColor: activeLoopClick
                ? "transparent"
                : " rgba(255, 255, 255, 0.2)",
              border: activeLoopClick
                ? "1px solid transparent"
                : "1px solid rgba(255, 255, 255, 0.2)",
              transition: "transform 0.5s linear",
              transform: activeLoopClick ? "rotate(0deg)" : "rotate(360deg)",
            }}
            onClick={handleLoopClick}
          >
            <FontAwesomeIcon
              className={cx(
                "actions-footer",
                { loopTrackInfo },
                { spaceAlbumInfo }
              )}
              icon={faRotate}
            />
          </div>

          <div
            className={cx(
              "stopClick-bg",
              { pauseBGTrackInfo },
              { hideAlbumList },
              { hideAlbumInfo }
            )}
            onClick={handleStopClick}
            style={{
              backgroundColor:
                activeClick === "stopClick-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeClick === "stopClick-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
            }}
          >
            <FontAwesomeIcon
              className={cx(
                "actions-footer",
                { pauseTrackInfo },
                { hideAlbumInfo }
              )}
              icon={faPause}
            />
          </div>

          <button
            className={cx("prevTrack-bg", { prevTrackInfo }, { hideAlbumInfo })}
            onClick={handlePrevClick}
            style={{
              backgroundColor:
                activeClick === "prevTrack-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeClick === "prevTrack-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
            }}
          >
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faBackwardFast}
            />
          </button>
        </div>
        {/* ---------------- */}
        {(!isStatus || isTrackEnded) && (
          <div
            className={cx(
              "player-btn",
              { playBtn },
              { playerFooterBtn },
              { playerTrackInfo },
              { playerAlbumList },
              { playerAlbumInfo }
            )}
            onClick={() => handlePlayClick(trackId)}
          >
            <div className={cx("play-box")}>
              <FontAwesomeIcon
                className={cx(
                  "play",
                  { playIcon },
                  { playFooterIcon },
                  { playIconTrackInfo }
                )}
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
              { stopperTrackInfo },
              {
                stopperSingleTracks,
              },
              { stopperAlbumList },
              { stopperPodcastList }
            )}
            onClick={handlePauseClick}
          >
            <div className={cx("stop-box")}>
              <FontAwesomeIcon
                className={cx(
                  "stop",
                  { stopIcon },
                  { stopFooterIcon },
                  { stopIconTrackInfo }
                )}
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
            { actionTrackInfoRight },
            { actionsAlbumList },
            { actionsAlbumInfo },
            { hideAlbumInfo }
          )}
        >
          <button
            className={cx("nextTrack-bg", { nextTrackInfo })}
            onClick={handleNextClick}
            style={{
              backgroundColor:
                activeClick === "nextTrack-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeClick === "nextTrack-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
            }}
          >
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faForwardFast}
            />
          </button>

          <div
            className={cx(
              "volume-bg",
              { volumeBGTrackInfo },
              { hideAlbumList }
            )}
          >
            <FontAwesomeIcon
              className={cx("actions-footer", { volumeIconTrackInfo })}
              icon={faVolumeHigh}
            />
          </div>

          <div
            className={cx(
              "volume-bar",
              { volumeBarTrackInfo },
              { hideAlbumList }
            )}
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
              { waveformBoxFooter },
              { waveformBoxSingleTracks }
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
