import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";

import { useLocation } from "react-router-dom";

const AudioPlayer = createContext();

export function AudioPlayerProvider({ children }) {
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({});
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

  const location = useLocation();
  const isAlbumPage = location.pathname.startsWith(`/albumPage`);
  const isPlayListPage = location.pathname.startsWith(`/playListPage`);

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

  const handlePlay = async (trackId, track, link) => {
    try {
      const player = playerRefs.current;
      const id = trackId || currentTrackId;
      const audioLink = link || trackLink;

      if (!player) return;

      if (audioLink !== trackLink) {
        player.src = audioLink;
        await player.load();
      }

      setTrackLink(audioLink);
      setCurrentTrack(track);
      setCurrentTrackId(id);

      setIsPlaying(true);
      await player.play();

      // if (checkListeningTime >= player.duration) {
      //   setListeningTime(player.currentTime);
      //   setCheckListeningTime(player.currentTime - 1);
      // } else {
      //   setListeningTime(0);
      //   setCheckListeningTime(0);
      // }
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
        console.log("Single track loop is active!");
      } else {
        setIsPlaying(false);
        player.currentTime = 0;
        await player.pause();

        if (
          (isAlbumPage && trackIndex < trackList.length - 1) ||
          (isPlayListPage && trackIndex < trackList.length - 1)
        ) {
          handleNextTrack();
          setIsTrackEnded(false);
          // console.log("The track has ended in the playlist!");
        } else {
          setIsTrackEnded(true);
          // console.log("The track has ended!");
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
    if (
      (isAlbumPage && trackList.length > 0) ||
      (isPlayListPage && trackList.length > 0)
    ) {
      const nextIndex = (trackIndex + 1) % trackList.length;
      const nextTrack = trackList[nextIndex];

      setTrackIndex(nextIndex);
      setCurrentTrackId(nextTrack.id);
      setCurrentTrack({
        trackTitle: nextTrack.title,
        trackPerformer: nextTrack.stageName || nextTrack.performer,
      });
      setIsPlaying(true);
      handlePlay(
        nextTrack.id,
        {
          trackTitle: nextTrack.title,
          trackPerformer: nextTrack.stageName || nextTrack.performer,
        },
        nextTrack.link
      );
      // console.log("Next Track!", nextTrack);
    }
  };

  const handlePrevTrack = () => {
    if (
      (isAlbumPage && trackList.length > 0) ||
      (isPlayListPage && trackList.length > 0)
    ) {
      const prevIndex = (trackIndex - 1 + trackList.length) % trackList.length;
      const prevTrack = trackList[prevIndex];

      setTrackIndex(prevIndex);
      setCurrentTrackId(prevTrack.id);
      setCurrentTrack({
        trackTitle: prevTrack.title,
        trackPerformer: prevTrack.stageName || prevTrack.performer,
      });
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
        trackList,
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
