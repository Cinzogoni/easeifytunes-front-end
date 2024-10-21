import classNames from "classnames/bind";
import styles from "./PodcastPage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useParams } from "react-router-dom";

import Tippy from "@tippyjs/react/headless";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import PodcastItem from "~/components/PodcastItem";
import PodcastInfo from "~/components/PodcastInfo";
import PodcastAudioList from "~/components/PodcastAudioList";

import { useTrackInfo } from "~/components/TrackInfoProvider";

import Track from "~/components/Track";

const cx = classNames.bind(styles);

function PodcastPage() {
  const { podcast } = useTrackInfo();
  const { podcastTopic } = useParams();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [activeTitle, setActiveTitle] = useState("Publisher");

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const apiResults = [...podcast];

    const filteredResults = apiResults.filter((item) => {
      const searchLowerCase = debounced.toLowerCase();
      return item.audios.some(
        (audio) =>
          audio.performer.toLowerCase().includes(searchLowerCase) ||
          audio.title.toLowerCase().includes(searchLowerCase)
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

  const allTopic = [...podcast];
  const findAllTopic = allTopic.find((t) => t.topic === podcastTopic);
  const audioList = findAllTopic ? findAllTopic.audios || [] : [];

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
                <div className={cx("title-box")}>
                  <h5
                    className={cx("title-1", {
                      active: activeTitle === `Publisher`,
                    })}
                    onClick={() => setActiveTitle(`Publisher`)}
                  >
                    Publisher
                  </h5>
                  <h5
                    className={cx("title-2", {
                      active: activeTitle === `Author`,
                    })}
                    onClick={() => setActiveTitle(`Author`)}
                  >
                    Author
                  </h5>
                  <h5
                    className={cx("title-3", {
                      active: activeTitle === `Audio Title`,
                    })}
                    onClick={() => setActiveTitle(`Audio Title`)}
                  >
                    Audio Title
                  </h5>
                </div>
                <WrapperPopper>
                  {/* Author  */}
                  {activeTitle === `Publisher` && (
                    <div className={cx("publisher")}>
                      {searchResult
                        .filter((item) => item.performer && item.title)
                        .map((item) => (
                          <PodcastItem
                            key={item.id}
                            podcastAvatar={item.avatar}
                            podcastTopic={item.title}
                            podcastDescription={item.performer}
                          />
                        ))}
                    </div>
                  )}
                  {/* Author  */}
                  {activeTitle === `Author` && (
                    <div className={cx("author")}>
                      {searchResult
                        .filter((item) => item.performer && item.title)
                        .map((item) => (
                          <PodcastItem
                            key={item.id}
                            podcastAvatar={item.avatar}
                            podcastTopic={item.title}
                            podcastDescription={item.performer}
                          />
                        ))}
                    </div>
                  )}
                  {/* Audio Title  */}
                  {activeTitle === `Audio Title` && (
                    <div className={cx("audio-title")}>
                      {searchResult
                        .filter((item) => item.performer && item.title)
                        .map((item) => (
                          <PodcastItem
                            key={item.id}
                            podcastAvatar={item.avatar}
                            podcastTopic={item.title}
                            podcastDescription={item.performer}
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
                placeholder="publisher, author, audio title"
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

      <Track
        info={<PodcastInfo podcastInfo={findAllTopic} />}
        list={<PodcastAudioList audioList={audioList} />}
        containerPodcast
      />
    </div>
  );
}

export default PodcastPage;
