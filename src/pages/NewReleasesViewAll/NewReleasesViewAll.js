import classNames from "classnames/bind";
import styles from "./NewReleasesViewAll.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";

import Tippy from "@tippyjs/react/headless";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import GridSystem from "~/components/GridSystem";
import NewReleasesBox from "~/components/NewReleasesBox";
import MusicTrackItem from "~/components/MusicTrackItem";

import { useTrackInfo } from "~/components/TrackInfoProvider";

import apiTest from "~/Api/FakeApi";

const cx = classNames.bind(styles);
function NewReleasesViewAll() {
  const { newReleases } = useTrackInfo();

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

    const apiResults = [...apiTest.getNewReleases()];

    const filteredResults = apiResults.filter((item) => {
      if (item.trackTitle && item.trackPerformer) {
        return (
          item.trackTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.trackPerformer.toLowerCase().includes(searchValue.toLowerCase())
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
      <div className={cx("container")}>
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
                      .filter((item) => item.trackTitle && item.trackPerformer)
                      .map((item) => (
                        <MusicTrackItem
                          key={item.id}
                          trackAvatar={item.trackAvatar}
                          trackPerformer={item.trackPerformer}
                          trackTitle={item.trackTitle}
                        />
                      ))}
                  </WrapperPopper>
                </div>
              )}
            >
              <div className={cx("input")}>
                <input
                  ref={inputRef}
                  className={cx("search-input")}
                  placeholder="track title..."
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
        <div className={cx("music-box")}>
          <GridSystem rowClass={cx("row-1")}>
            {newReleases.map((track, index) => (
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
                    <NewReleasesBox
                      trackId={`new_${track.id}`}
                      trackLink={track.trackLink}
                      trackAvatar={track.trackAvatar}
                      trackTitle={track.trackTitle}
                      trackPerformer={track.trackPerformer}
                      trackType={track.trackType}
                    />
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

export default NewReleasesViewAll;
