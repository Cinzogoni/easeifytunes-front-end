import classNames from "classnames/bind";
import styles from "./PodcastPage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useParams } from "react-router-dom";

import Tippy from "@tippyjs/react/headless";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import PodcastAudioItem from "~/components/PodcastAudioItem";
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

  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 500);
  const apiResults = [...podcast];

  const findAllTopic = apiResults.find((t) => t.topic === podcastTopic);
  const audioList = findAllTopic ? findAllTopic.audios || [] : [];

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    const searchLowerCase = debounced.toLowerCase();

    const filteredResults = audioList.filter(
      (audio) =>
        audio.publisher.toLowerCase().includes(searchLowerCase) ||
        audio.author.toLowerCase().includes(searchLowerCase) ||
        audio.title.toLowerCase().includes(searchLowerCase)
    );

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
                  <div className={cx("podcast-list")}>
                    {searchResult.map((audio) => (
                      <PodcastAudioItem
                        key={audio.id}
                        podcastAvatar={audio.avatar}
                        podcastTitle={audio.title}
                        podcastPublisher={audio.publisher}
                        podcastAuthor={audio.author}
                      />
                    ))}
                  </div>
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
