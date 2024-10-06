import classNames from "classnames/bind";
import styles from "./MusicMakerList.module.scss";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";
import GridSystem from "../GridSystem";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);

function MusicMakerList({ musicAlbums }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [activeMove, setActiveMove] = useState(null);

  const calculateBoxesPerSlide = () => {
    if (width >= 1600) {
      return 4;
    }
    if (width >= 1220 && width < 1599) {
      return 3;
    }
    if (width >= 900 && width < 1220) {
      return 2;
    }
    return 1;
  };

  const handleScroll = (move) => {
    const totalBoxes = musicAlbums.length;

    const scrollIndex = () => {
      if (width >= 1600) {
        return totalBoxes - 4;
      }
      if (width >= 1220 && width < 1599) {
        return totalBoxes - 3;
      }
      if (width >= 900 && width < 1220) {
        return totalBoxes - 2;
      }
      if (width >= 307 && width < 900) {
        return totalBoxes - 1;
      }
    };

    setScrollIndex((prevIndex) => {
      if (move === "prev") {
        return Math.max(prevIndex - 1, 0);
      } else if (move === "next") {
        return Math.min(prevIndex + 1, scrollIndex());
      }
      return prevIndex;
    });

    setActiveMove(move);
    setTimeout(() => {
      setActiveMove(null);
    }, 100);
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformValue = () => {
    const boxesPerSlide = calculateBoxesPerSlide();
    const slideWidth = 100 / boxesPerSlide;
    return `translateX(-${scrollIndex * slideWidth}%)`;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("album-list")}>
          <div className={cx("actions")}>
            <h2 className={cx("title")}>Albums</h2>

            <div className={cx("actions-btn")}>
              <FontAwesomeIcon
                className={cx("move")}
                icon={faCircleChevronLeft}
                onClick={() => handleScroll("prev")}
                style={{
                  transition: "transition: transform 0.1s ease-in-out",
                  transform: activeMove === "prev" ? "scale(1.1)" : "scale(1)",
                }}
              />
              <FontAwesomeIcon
                className={cx("move")}
                icon={faCircleChevronRight}
                onClick={() => handleScroll("next")}
                style={{
                  transition: "transition: transform 0.1s ease-in-out",
                  transform: activeMove === "next" ? "scale(1.1)" : "scale(1)",
                }}
              />
            </div>
          </div>
          <GridSystem rowClass={cx("row")}>
            <div
              className={cx("frame")}
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: transformValue(),
              }}
            >
              {musicAlbums.map((album) => (
                <GridSystem
                  key={album.id}
                  colClass={cx("col")}
                  colL={cx("l-2-5")}
                  colML={cx("ml-3")}
                  colM={cx("m-6")}
                  colSM={cx("sm-4")}
                  colS={cx("s-6")}
                  colMo={cx("mo-12")}
                >
                  <div className={cx("boxes")}>
                    <div className={cx("album-box")}>
                      <div className={cx("album-frame")}>
                        <Link
                          className={cx("link")}
                          to={routesConfig.albumPage.replace(
                            `:albumName`,
                            album.albumName
                          )}
                        />

                        <div className={cx("avatar-frame")}>
                          <img
                            className={cx("avatar")}
                            src={album.albumAvatar}
                            alt={album.albumName}
                          />
                        </div>

                        <div className={cx("desc")}>
                          <h5 className={cx("album-name")}>
                            {album.albumName}
                          </h5>
                          <h6 className={cx("album-performer")}>
                            {album.albumPerformer}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </GridSystem>
              ))}
            </div>
          </GridSystem>
        </div>

        <div className={cx("single-list")}></div>
      </div>
    </div>
  );
}

export default MusicMakerList;
