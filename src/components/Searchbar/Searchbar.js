import classNames from "classnames/bind";
import styles from "./Searchbar.module.scss";

import Tippy from "@tippyjs/react/headless";

import { useEffect, useState, useRef } from "react";
import { useDebounce } from "~/hooks";

import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import MusicTrackItem from "../MusicTrackItem";
import MusicMakerItems from "../MusicMakerItems";
import AlbumItem from "../AlbumItem";
import PodcastItem from "../PodcastItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import apiTest from "~/Api/FakeApi";
import apiTest01 from "~/Api/FakeApi01";
import apiMusicMaker from "~/Api/API";
import apiPodcast from "~/Api/API_01";

const cx = classNames.bind(styles);
function Searchbar() {
  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [activeTitle, setActiveTitle] = useState("Tracks");

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const apiResults = [
      ...apiTest.getNewReleases(),
      ...apiTest01.getTrendingSongs(),
      ...apiMusicMaker.getMusicMaker(),
      ...apiPodcast.getPodcast(),
    ];

    const filteredResults = apiResults.filter((item) => {
      if (item.trackTitle && item.trackPerformer) {
        return (
          item.trackTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.trackPerformer.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (item.stageName && item.role) {
        return (
          item.stageName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.role.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (item.tracks && item.tracks.length > 0) {
        return item.tracks.some((track) =>
          track.trackType.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (item.audios && item.topic && item.audios.length > 0) {
        return item.audios.some(
          (audio) =>
            audio.performer.toLowerCase().includes(searchValue.toLowerCase()) ||
            audio.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      return false;
    });

    setSearchResult(filteredResults);
  }, [debounced]);

  const handleClear = () => {
    setSearchValue(``);
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-frame")}>
        <Tippy
          placement="bottom"
          interactive
          appendTo={document.body}
          visible={showResult && searchResult.length > 0}
          onClickOutside={handleHideResult}
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex={-1} {...attrs}>
              <div className={cx("title-box")}>
                <h5
                  className={cx("title-1", {
                    active: activeTitle === `Tracks`,
                  })}
                  onClick={() => setActiveTitle(`Tracks`)}
                >
                  Tracks
                </h5>
                <h5
                  className={cx("title-2", {
                    active: activeTitle === `Music Makers`,
                  })}
                  onClick={() => setActiveTitle(`Music Makers`)}
                >
                  Music Makers
                </h5>
                <h5
                  className={cx("title-3", {
                    active: activeTitle === `Albums`,
                  })}
                  onClick={() => setActiveTitle(`Albums`)}
                >
                  Albums
                </h5>
                <h5
                  className={cx("title-4", {
                    active: activeTitle === `Podcast`,
                  })}
                  onClick={() => setActiveTitle(`Podcast`)}
                >
                  Podcast
                </h5>
              </div>
              <WrapperPopper>
                {/* Tracks */}
                {activeTitle === `Tracks` && (
                  <div className={cx("music-track")}>
                    {searchResult
                      .filter((item) => item.trackTitle && item.trackPerformer)
                      .map((item) => (
                        <MusicTrackItem
                          key={item.id}
                          trackAvatar={item.trackAvatar}
                          trackPerformer={item.trackPerformer}
                          trackTitle={item.trackTitle}
                        />
                      ))}
                  </div>
                )}
                {/* Music Maker  */}
                {activeTitle === `Music Makers` && (
                  <div className={cx("music-maker")}>
                    {searchResult
                      .filter((item) => item.stageName && item.role)
                      .map((item) => (
                        <MusicMakerItems
                          key={item.id}
                          musicMakerAvatar={item.avatar}
                          musicMakerStageName={item.stageName}
                          musicMakerRole={item.role}
                        />
                      ))}
                  </div>
                )}
                {/* Album */}
                {activeTitle === `Albums` && (
                  <div className={cx("album")}>
                    {searchResult
                      .filter((item) => item.tracks && item.tracks.length > 0)
                      .map((albumItem) =>
                        albumItem.tracks.map((track) => (
                          <AlbumItem
                            key={track.id}
                            albumAvatar={track.trackAvatar}
                            albumName={track.trackType}
                            albumPerformer={track.trackPerformer}
                          />
                        ))
                      )}
                  </div>
                )}
                {/* Podcast */}
                {activeTitle === `Podcast` && (
                  <div className={cx("podcast")}>
                    {searchResult
                      .filter(
                        (item) =>
                          item.audios && item.topic && item.audios.length > 0
                      )
                      .map((podcastItem) =>
                        podcastItem.audios.map((audio) => (
                          <PodcastItem
                            key={audio.id}
                            podcastAvatar={audio.avatar}
                            podcastPerformer={audio.performer}
                            podcastTitle={audio.title}
                            podcastTopic={podcastItem.topic}
                          />
                        ))
                      )}
                  </div>
                )}
              </WrapperPopper>
            </div>
          )}
        >
          <div className={cx("input")}>
            <input
              ref={inputRef}
              className={cx("search-input")}
              placeholder="track title, music makers, albums , podcast..."
              spellCheck={false}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setShowResult(true)}
            />
            {!!searchValue && (
              <FontAwesomeIcon
                className={cx("icon")}
                icon={faXmark}
                onClick={handleClear}
              />
            )}
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Searchbar;
