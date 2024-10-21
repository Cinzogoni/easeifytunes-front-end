import classNames from "classnames/bind";
import styles from "./MusicMakerViewAll.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useTrackInfo } from "~/components/TrackInfoProvider";

import Tippy from "@tippyjs/react/headless";
import GridSystem from "~/components/GridSystem";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import MusicMakerBox from "~/components/MusicMakerBox";
import MusicMakerItems from "~/components/MusicMakerItems";
import Navigation from "~/components/Navigation";

import apiMusicMaker from "~/Api/API";

const cx = classNames.bind(styles);
function MusicMakerViewAll() {
  const { musicMaker } = useTrackInfo();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  const sortedMusicMakers = musicMaker.slice().sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority ? -1 : 1;
    }

    return a.stageName.localeCompare(b.stageName);
  });

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const apiResults = [...apiMusicMaker.getMusicMaker()];

    const filteredResults = apiResults.filter((item) => {
      const searchLowerCase = debounced.toLowerCase();
      return (
        (item.stageName &&
          item.stageName.toLowerCase().includes(searchLowerCase)) ||
        (item.role && item.role.toLowerCase().includes(searchLowerCase))
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
                    .filter((item) => item.stageName && item.role)
                    .map((item) => (
                      <MusicMakerItems
                        key={item.id}
                        musicMakerAvatar={item.avatar}
                        musicMakerStageName={item.stageName}
                        musicMakerRole={item.role}
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
                placeholder="music makers..."
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
        <div className={cx("back-home")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <div className={cx("musicMaker-box")}>
          <GridSystem rowClass={cx("row-1")}>
            {sortedMusicMakers.map((artist, index) => (
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
                    <MusicMakerBox
                      Id={artist.id}
                      avatar={artist.avatar}
                      stageName={artist.stageName}
                      role={artist.role}
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

export default MusicMakerViewAll;
