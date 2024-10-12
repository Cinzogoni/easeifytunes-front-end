import Home from "~/pages/Home";
import Search from "~/pages/Search";
import Setting from "~/pages/Setting";
import PodcastAudio from "~/pages/PodcastAudioPage";

import TrackPage from "~/pages/TrackPage";
import MusicMakerPage from "~/pages/MusicMakerPage";
import AlbumPage from "~/pages/AlbumPage";
import PodcastPage from "~/pages/PodcastPage";
import PodcastAudioPage from "~/pages/PodcastAudioPage";
import NewReleasesViewAll from "~/pages/NewReleasesViewAll";
import MusicMakerViewAll from "~/pages/MusicMakerViewAll";
import AlbumViewAll from "~/pages/AlbumViewAll";
import PodcastViewAll from "~/pages/PodcastViewAll";
import MomentViewAll from "~/pages/MomentViewAll";

import config from "~/config";

const publicRouter = [
  { path: config.routes.home, component: Home, layout: true },
  { path: config.routes.search, component: Search, layout: true },
  { path: config.routes.setting, component: Setting, layout: true },
  { path: config.routes.track, component: TrackPage, layout: true },
  { path: config.routes.podcast, component: PodcastAudio, layout: true },
  {
    path: config.routes.musicMakerPage,
    component: MusicMakerPage,
    layout: true,
  },
  { path: config.routes.albumPage, component: AlbumPage, layout: true },
  { path: config.routes.podcastPage, component: PodcastPage, layout: true },
  {
    path: config.routes.podcastAudioPage,
    component: PodcastAudioPage,
    layout: true,
  },
  {
    path: config.routes.newReleasesViewAll,
    component: NewReleasesViewAll,
    layout: true,
  },
  {
    path: config.routes.musicMakersViewAll,
    component: MusicMakerViewAll,
    layout: true,
  },
  {
    path: config.routes.albumViewAll,
    component: AlbumViewAll,
    layout: true,
  },
  {
    path: config.routes.podcastViewAll,
    component: PodcastViewAll,
    layout: true,
  },
  {
    path: config.routes.momentViewAll,
    component: MomentViewAll,
    layout: true,
  },
];

const privateRouter = [];

export { publicRouter, privateRouter };
