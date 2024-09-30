import React, { createContext, useState, useContext, useEffect } from "react";

import apiMusicMaker from "~/Api/API";
import apiPodcast from "~/Api/API_01";
import apiTest from "~/Api/FakeApi";
import apiTest01 from "~/Api/FakeApi01";
import apiMoment from "~/Api/API_02";

const TrackProvider = createContext();

export function TrackInfoProvider({ children }) {
  const [newReleases, setNewReleases] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [musicMaker, setMusicMaker] = useState([]);
  const [podcast, setPodcast] = useState([]);
  const [moment, setMoment] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        const newReleasesData = apiTest.getNewReleases();
        setNewReleases(newReleasesData);
      } catch (error) {
        setError("Failed to fetch new releases.");
      }

      try {
        const trendingSongsData = apiTest01.getTrendingSongs();
        setTrendingSongs(trendingSongsData);
      } catch (error) {
        setError("Failed to fetch trending songs.");
      }

      try {
        const musicMakerData = apiMusicMaker.getMusicMaker();
        setMusicMaker(musicMakerData);
      } catch (error) {
        setError("Failed to fetch music maker.");
      }

      try {
        const podcastData = apiPodcast.getPodcast();
        setPodcast(podcastData);
      } catch (error) {
        setError("Failed to fetch podcast.");
      }

      try {
        const momentData = apiMoment.getMoment();
        setMoment(momentData);
      } catch (error) {
        setError("Failed to fetch moment.");
      }
    };

    fetchData();
  }, []);

  return (
    <TrackProvider.Provider
      value={{ musicMaker, podcast, newReleases, trendingSongs, moment, error }}
    >
      {children}
    </TrackProvider.Provider>
  );
}

export function useTrackInfo() {
  return useContext(TrackProvider);
}
