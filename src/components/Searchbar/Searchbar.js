import classNames from "classnames/bind";
import styles from "./Searchbar.module.scss";

import Tippy from "@tippyjs/react/headless";

import { useEffect, useState, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useTrackInfo } from "../TrackInfoProvider";

import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import MusicTrackItem from "../MusicTrackItem";
import MusicMakerItems from "../MusicMakerItems";
import AlbumItem from "../AlbumItem";
import PodcastItem from "../PodcastItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import apiMusicMaker from "~/Api/API";
import apiPodcast from "~/Api/API_01";

const cx = classNames.bind(styles);
function Searchbar() {
  const { musicMaker, podcast } = useTrackInfo();

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

    const apiResults = [...podcast, ...musicMaker];

    const filteredResults = apiResults.filter((item) => {
      const searchLowerCase = searchValue.toLowerCase();

      return (
        (item.title && item.title.toLowerCase().includes(searchLowerCase)) ||
        (item.stageName &&
          item.stageName.toLowerCase().includes(searchLowerCase)) ||
        (item.role && item.role.toLowerCase().includes(searchLowerCase)) ||
        (item.audios &&
          item.audios.some(
            (audio) =>
              audio.performer.toLowerCase().includes(searchLowerCase) ||
              audio.title.toLowerCase().includes(searchLowerCase)
          )) ||
        (item.albums &&
          item.albums.some(
            (album) =>
              album.albumName.toLowerCase().includes(searchLowerCase) ||
              album.albumPerformer.toLowerCase().includes(searchLowerCase)
          )) ||
        (item.topic && item.topic.toLowerCase().includes(searchLowerCase))
      );
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
                      .flatMap((maker) => [
                        ...(maker.albums
                          ? maker.albums.flatMap((album) =>
                              album.tracks.map((track) => ({
                                id: track.id,
                                avatar: album.albumAvatar || maker.avatar,
                                stageName: maker.stageName,
                                title: track.title,
                              }))
                            )
                          : []),
                        ...(maker.singles
                          ? maker.singles.map((single) => ({
                              id: single.id,
                              avatar: maker.avatar,
                              stageName: maker.stageName,
                              title: single.title,
                            }))
                          : []),
                      ])
                      .filter((item) => item.title && item.stageName)
                      .map((item) => (
                        <MusicTrackItem
                          key={`track_${item.id}`}
                          trackAvatar={item.avatar}
                          trackPerformer={item.stageName}
                          trackTitle={item.title}
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
                          key={`music-maker_${item.id}`}
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
                      .filter((item) => item.albums && item.albums.length > 0)
                      .map((albumItem) =>
                        albumItem.albums.map((track) => (
                          <AlbumItem
                            key={`album_${track.id}`}
                            albumAvatar={track.albumAvatar}
                            albumName={track.albumName}
                            albumPerformer={track.albumPerformer}
                          />
                        ))
                      )}
                  </div>
                )}
                {/* Podcast */}
                {activeTitle === `Podcast` && (
                  <div className={cx("podcast")}>
                    {searchResult
                      .filter((item) => item.topic && item.description)
                      .map((item) => (
                        <PodcastItem
                          key={`podcast_${item.id}`}
                          podcastAvatar={item.avatar}
                          podcastTopic={item.topic}
                          podcastDescription={item.description}
                        />
                      ))}
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
