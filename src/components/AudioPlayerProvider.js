import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";

const AudioPlayer = createContext();

export function AudioPlayerProvider({ children }) {
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackLink, setTrackLink] = useState(``);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isTrackEnded, setIsTrackEnded] = useState(false);
  const [listeners, setListeners] = useState({});
  const [listeningTime, setListeningTime] = useState(1);
  const [checkListeningTime, setCheckListeningTime] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);

  const playerRefs = useRef(null);

  useEffect(() => {
    const player = playerRefs.current;

    if (!player) return;

    player.src = trackLink;
    player.load();
    if (isPlaying && player) {
      setIsPlaying(true);
      setIsTrackEnded(false);
      player.play();
    } else {
      setIsPlaying(false);
      setIsTrackEnded(true);
      player.pause();
    }
  }, [trackLink]);

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

  useEffect(() => {
    if (trackList.length > 0) {
      const track = trackList[trackIndex];
      setTrackLink(track.link);
      setCurrentTrack(trackList[trackIndex]);
    }
  }, [trackIndex, trackList]);

  const handlePlay = async (trackId, track, link) => {
    try {
      const player = playerRefs.current;
      const replayCurrentTrackId = trackId || currentTrackId;

      if (checkListeningTime >= player.duration) {
        setListeningTime(player.currentTime);
        setCheckListeningTime(player.currentTime - 1);
      } else {
        setListeningTime(0);
        setCheckListeningTime(0);
      }

      if (trackLink) {
        await player.play();
        setIsPlaying(true);
        setTrackLink(link);
        setCurrentTrack(track);
        setCurrentTrackId(replayCurrentTrackId);
        // console.log("Track link is updated!");
      } else {
        // console.log("Track link awaiting update!");
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
      setCurrentTrackId(null);
    } catch (stt) {
      console.log();
    }
  };

  const handleTrackEnd = async (trackId) => {
    const player = playerRefs.current;
    // const totalDuration = player ? player.duration : 0;

    try {
      if (isLooping && player) {
        player.currentTime = 0;
        await player.play();
        setIsPlaying(true);
        setIsTrackEnded(false);
        setListeningTime(0);
        setCheckListeningTime(0);
        console.log("Looping is active!");
      } else {
        setIsPlaying(false);
        player.currentTime = 0;
        await player.pause();
        setIsTrackEnded(true);
        console.log("Track has ended!");

        if (trackIndex < trackList.length - 1) {
          handleNextTrack();
        }
      }
    } catch (stt) {
      console.log();
    }

    // const percentDuration = totalDuration * 0.97;

    // if (
    //   listeningTime >= percentDuration &&
    //   checkListeningTime >= percentDuration
    // ) {
    //   setListeners((prevListeners) => {
    //     const newListeners = (prevListeners[trackId] || 0) + 1;
    //     return { ...prevListeners, [trackId]: newListeners };
    //   });
    // } else {
    //   console.log(
    //     "The stream isn't recorded because the song wasn't played fully!"
    //   );
    // }
    // console.log("Duration time:", percentDuration);
    // console.log("Listen time:", listeningTime);
    // console.log("Check time:", checkListeningTime);
  };

  const handleLoop = () => {
    setIsLooping((prevIsLooping) => !prevIsLooping);
    console.log(`Looping is now ${!isLooping ? "enabled" : "disabled"}.`);
  };

  const handleNextTrack = () => {
    if (trackList.length > 0) {
      const nextIndex = (trackIndex + 1) % trackList.length;
      const nextTrack = trackList[nextIndex];

      setTrackIndex(nextIndex);
      setCurrentTrackId(nextTrack.id);
      setIsPlaying(true);
      handlePlay(
        nextTrack.id,
        {
          trackTitle: nextTrack.title,
          trackPerformer: nextTrack.stageName || nextIndex.performer,
        },
        nextTrack.link
      );

      // console.log("Next Track!", nextTrack);
    }
  };

  const handlePrevTrack = () => {
    if (trackList.length > 0) {
      const prevIndex = (trackIndex - 1 + trackList.length) % trackList.length;
      const prevTrack = trackList[prevIndex];

      setTrackIndex(prevIndex);
      setCurrentTrackId(prevTrack.id);
      setIsPlaying(true);
      handlePlay(
        prevTrack.id,
        {
          trackTitle: prevTrack.title,
          trackPerformer: prevTrack.stageName || prevTrack.performer,
        },
        prevTrack.link
      );

      // console.log("Prev Track!", prevTrack);
    }
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
        trackIndex,
        setTrackIndex,
        setTrackList,
        playerRefs,

        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        setVolume,
        isPlaying,
        setIsPlaying,
        isTrackEnded,
        setIsTrackEnded,
        listeners,
        setListeners,
        listeningTime,
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
