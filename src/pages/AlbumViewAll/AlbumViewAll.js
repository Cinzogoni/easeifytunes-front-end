import classNames from "classnames/bind";
import styles from "./AlbumViewAll.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useTrackInfo } from "~/components/TrackInfoProvider";

import Tippy from "@tippyjs/react/headless";
import GridSystem from "~/components/GridSystem";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import AlbumBox from "~/components/AlbumBox";
import AlbumItem from "~/components/AlbumItem";
import Navigation from "~/components/Navigation";

import apiMusicMaker from "~/Api/API";

const cx = classNames.bind(styles);
function AlbumViewAll() {
  const { musicMaker } = useTrackInfo();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const apiResults = [...apiMusicMaker.getMusicMaker()];

    const filteredResults = apiResults.filter((item) => {
      if (item.albums && item.albums.length > 0) {
        return item.albums.some((track) =>
          track.trackType.toLowerCase().includes(searchValue.toLowerCase())
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
      <div className={cx("search-bar")}>
        <div className={cx("search-frame")}>
          <Tippy
            placement="bottom"
            interactive
            appendTo={document.body}
            visible={showResult && searchResult.length > 0}
            onClickOutside={handleHideResult}
            render={(attrs) => (
              <div className={cx("search-result")} tabIndex={-1} {...attrs}>
                <WrapperPopper>
                  {searchResult
                    .filter((item) => item.albums && item.albums.length > 0)
                    .map((albumItem) =>
                      albumItem.albums.map((track) => (
                        <AlbumItem
                          key={track.id}
                          albumAvatar={track.trackAvatar}
                          albumName={track.trackType}
                          albumPerformer={track.trackPerformer}
                        />
                      ))
                    )}
                </WrapperPopper>
              </div>
            )}
          >
            <div className={cx("input")}>
              <input
                ref={inputRef}
                className={cx("search-input")}
                placeholder="albums..."
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

      <div className={cx("container")}>
        <Navigation>
          <div className={cx("back-home")}>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </div>
        </Navigation>

        <div className={cx("album-box")}>
          <GridSystem rowClass={cx("row-1")}>
            {musicMaker
              .filter(
                (album) =>
                  Array.isArray(album.albums) && album.albums.length > 0
              )
              .map((album, index) => (
                <GridSystem
                  key={index}
                  colClass={cx("col")}
                  colL={cx("l-3")}
                  colML={cx("ml-4")}
                  colM={cx("m-6")}
                  colSM={cx("sm-12")}
                  colS={cx("s-12")}
                  colMo={cx("mo-12")}
                >
                  <div className={cx("frame")}>
                    <div className={cx("boxes")}>
                      {album.albums.map((track) => (
                        <AlbumBox
                          key={track.id}
                          albumId={`album_${track.id}`}
                          albumAvatar={track.trackAvatar}
                          albumName={track.trackType}
                          albumPerformer={track.trackPerformer}
                        />
                      ))}
                    </div>
                  </div>
                </GridSystem>
              ))}
          </GridSystem>
        </div>
      </div>
    </div>
  );
}

export default AlbumViewAll;
