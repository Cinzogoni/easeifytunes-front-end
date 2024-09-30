import classNames from "classnames/bind";
import styles from "./MomentViewAll.module.scss";

import { useState } from "react";

import GridSystem from "~/components/GridSystem";
import MomentBox from "~/components/MomentBox";

import { useTrackInfo } from "~/components/TrackInfoProvider";
const cx = classNames.bind(styles);
function MomentViewAll() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  const { moment } = useTrackInfo();

  const handleVideoPlay = (id) => {
    setActiveVideoId(id);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <GridSystem rowClass={cx("row-1")}>
          {moment.map((video, index) => (
            <GridSystem
              key={index}
              colClass={cx("col")}
              colL={cx("l-4")}
              colML={cx("ml-6")}
              colM={cx("m-12")}
              colSM={cx("sm-12")}
              colS={cx("s-12")}
              colMo={cx("mo-12")}
            >
              <div className={cx("boxes")}>
                <div className={cx("song-box")}>
                  <MomentBox
                    id={video.id}
                    link={video.link}
                    date={video.date}
                    name={video.name}
                    isPlaying={activeVideoId === video.id}
                    onPlay={() => handleVideoPlay(video.id)}
                  />
                </div>
              </div>
            </GridSystem>
          ))}
        </GridSystem>
      </div>
    </div>
  );
}

export default MomentViewAll;
