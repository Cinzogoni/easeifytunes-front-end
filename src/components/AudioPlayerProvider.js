import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  // useCallback,
} from "react";

import { useLocation } from "react-router-dom";

const AudioPlayer = createContext();

export function AudioPlayerProvider({ children }) {
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({});
  const [trackLink, setTrackLink] = useState(``);
  const [trackType, setTrackType] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isTrackEnded, setIsTrackEnded] = useState(false);
  const [listeningTime, setListeningTime] = useState(1);
  const [checkListeningTime, setCheckListeningTime] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [activeLoopClick, setActiveLoopClick] = useState(true);
  const [shuffledTrackList, setShuffledTrackList] = useState([]);
  const [activeRandomClick, setActiveRandomClick] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  const location = useLocation();
  const isAlbumPage = location.pathname.startsWith(`/albumPage`);
  const isPlayListPage = location.pathname.startsWith(`/playListPage`);
  const isPodcastPage = location.pathname.startsWith(`/podcastPage`);

  const playerRefs = useRef(null);

  useEffect(() => {
    if (playerRefs.current) {
      playerRefs.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const player = playerRefs.current;
    if (player) {
      const updateTime = () => {
        if (isPlaying) {
          setListeningTime(player.currentTime);
          setCheckListeningTime((prevTime) => prevTime + 1);
        } else {
          setListeningTime(player.currentTime);
        }
      };
      player.addEventListener("timeupdate", updateTime);
      return () => player.removeEventListener("timeupdate", updateTime);
    }
  }, [isPlaying]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setIsPlaying(false);
  };

  const handlePlay = async (trackId, track, link) => {
    try {
      const player = playerRefs.current;
      const audioLink = link || trackLink;

      if (!player) return;

      if (audioLink !== trackLink) {
        player.src = audioLink;
        await player.load();
      }

      setTrackLink(audioLink);
      setCurrentTrack(track);
      setCurrentTrackId(trackId);
      setTrackType(track.type || "Unknown Type");
      setIsTrackEnded(false);

      setIsPlaying(true);
      setIsVideoPlaying(false);
      await player.play();

      if (checkListeningTime >= player.duration) {
        setListeningTime(player.currentTime);
        setCheckListeningTime(player.currentTime - 1);
      } else {
        setListeningTime(0);
        setCheckListeningTime(0);
      }
    } catch (stt) {
      console.log();
    }
  };

  const handlePause = async () => {
    try {
      const player = playerRefs.current;
      if (player) {
        const currentTime = player.currentTime;
        await player.pause();
        setCurrentTime(currentTime);
      }
    } catch (stt) {
      console.log();
    }
  };

  const handleStop = async () => {
    try {
      const player = playerRefs.current;
      if (player) {
        player.currentTime = 0;
        await player.pause();
      }
      setIsPlaying(false);
    } catch (stt) {
      console.log();
    }
  };

  const updateStreamed = (trackId) => {
    setTrackList((prevTracks) => {
      const currentCount = prevTracks[trackId] || 0;
      return {
        ...prevTracks,
        [trackId]: currentCount + 1,
      };
    });
  };

  const handleTrackEnd = async () => {
    const player = playerRefs.current;
    const totalDuration = player ? player.duration : 0;

    try {
      if (player) {
        if (isLooping) {
          if (!isRandom) {
            handleNextTrack();
            setIsPlaying(true);
            setIsTrackEnded(false);
            await player.play();
            // console.log("Playlist loop is active!");
          } else if (isRandom) {
            handleNextTrack();
            setIsPlaying(true);
            setIsTrackEnded(false);
            await player.play();
            // console.log("Shuffled track list loop is active!");
          } else {
            player.currentTime = 0;
            setIsPlaying(true);
            setIsTrackEnded(false);
            setListeningTime(0);
            setCheckListeningTime(0);
            await player.play();
            // console.log("Single track loop is active!");
          }
        } else {
          setIsPlaying(false);
          player.currentTime = 0;
          await player.pause();

          const listToUse = isRandom ? shuffledTrackList : trackList;
          if (isAlbumPage || isPlayListPage || isPodcastPage) {
            if (trackIndex < listToUse.length - 1) {
              handleNextTrack();
              setIsTrackEnded(false);
              // console.log("The track has ended in the playlist!");
            } else {
              setIsTrackEnded(true);
            }
          } else {
            setIsTrackEnded(true);
          }
        }
      }
    } catch (stt) {
      console.log();
    }

    const percentDuration = totalDuration * 0.97;

    if (
      listeningTime >= percentDuration &&
      checkListeningTime >= percentDuration
    ) {
      updateStreamed(currentTrackId);
    } else {
      console.log(
        "The stream isn't recorded because the song wasn't played fully!"
      );
    }
    // console.log("Duration time:", percentDuration);
    // console.log("Listen time:", listeningTime);
    // console.log("Check time:", checkListeningTime);
  };

  const handleLoop = () => {
    setIsLooping((prevIsLooping) => {
      const newIsLooping = !prevIsLooping;
      // console.log(`Looping is now ${newIsLooping ? "enabled" : "disabled"}.`);
      return newIsLooping;
    });
  };

  const handleNextTrack = () => {
    const listToUse = isRandom ? shuffledTrackList : trackList;

    if (
      (isAlbumPage && listToUse.length > 0) ||
      (isPlayListPage && listToUse.length > 0)
    ) {
      const nextIndex = (trackIndex + 1) % listToUse.length;
      const nextTrack = listToUse[nextIndex];

      setTrackIndex(nextIndex);
      setCurrentTrackId(nextTrack.id);
      setCurrentTrack({
        trackTitle: nextTrack.title,
        trackPerformer: nextTrack.stageName || nextTrack.publisher,
        trackType: nextTrack.type,
      });
      setIsPlaying(true);
      handlePlay(
        nextTrack.id,
        {
          trackTitle: nextTrack.title,
          trackPerformer: nextTrack.stageName || nextTrack.publisher,
          trackType: nextTrack.type,
        },
        nextTrack.link
      );
      // console.log("Next Track!", nextTrack);
    }
  };

  const handlePrevTrack = () => {
    const listToUse = isRandom ? shuffledTrackList : trackList;

    if (
      (isAlbumPage && listToUse.length > 0) ||
      (isPlayListPage && listToUse.length > 0)
    ) {
      const prevIndex = (trackIndex - 1 + listToUse.length) % listToUse.length;
      const prevTrack = listToUse[prevIndex];

      setTrackIndex(prevIndex);
      setCurrentTrackId(prevTrack.id);
      setCurrentTrack({
        trackTitle: prevTrack.title,
        trackPerformer: prevTrack.stageName || prevTrack.publisher,
        trackType: prevTrack.type,
      });
      setIsPlaying(true);
      handlePlay(
        prevTrack.id,
        {
          trackTitle: prevTrack.title,
          trackPerformer: prevTrack.stageName || prevTrack.publisher,
          trackType: prevTrack.type,
        },
        prevTrack.link
      );
      // console.log("Prev Track!", prevTrack);
    }
  };

  const handleRandomTrack = () => {
    const newRandomState = !isRandom;
    setIsRandom(newRandomState);
  };

  return (
    <AudioPlayer.Provider
      value={{
        trackLink,
        setTrackLink,
        currentTrackId,
        setCurrentTrackId,
        currentTrack,
        setCurrentTrack,
        handlePlay,
        handlePause,
        handleStop,
        handleLoop,
        handleNextTrack,
        handlePrevTrack,
        handleRandomTrack,
        handleVideoPlay,
        setShuffledTrackList,
        isRandom,
        trackIndex,
        setTrackIndex,
        setTrackList,
        trackList,
        shuffledTrackList,
        playerRefs,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        setVolume,
        isPlaying,
        isVideoPlaying,
        setIsPlaying,
        isTrackEnded,
        setIsTrackEnded,
        listeningTime,
        activeLoopClick,
        setActiveLoopClick,
        activeRandomClick,
        setActiveRandomClick,
        trackType,
        setTrackType,
        updateStreamed,
      }}
    >
      {children}
      <audio ref={playerRefs} onEnded={() => handleTrackEnd(currentTrackId)}>
        <source src={trackLink} type="audio/wav" />
      </audio>
    </AudioPlayer.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayer);
}
