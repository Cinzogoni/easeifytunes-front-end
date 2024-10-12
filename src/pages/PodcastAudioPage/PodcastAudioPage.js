import classNames from "classnames/bind";
import styles from "./PodcastAudioPage.module.scss";

import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";
import Track from "~/components/Track";
import PodcastAudioInfo from "~/components/PodcastAudioInfo";

const cx = classNames.bind(styles);

function PodcastAudioPage() {
  const { podcast } = useTrackInfo();
  const { performer } = useParams();

  const allAudio = podcast.flatMap((a) => a.audios || []);
  const audio = allAudio.find((t) => t.performer === performer);

  const audioId = audio && audio.id ? audio.id : "";
  const link = audio && audio.link ? audio.link : "";
  const podcastTopic = audio && audio.topic ? audio.topic : "";
  const avatar = audio && audio.avatar ? audio.avatar : "";
  const podcastTitle = audio && audio.title ? audio.title : "";
  const podcastPerformer = audio && audio.performer ? audio.performer : "";
  const type = audio && audio.type ? audio.type : "";
  const releaseDay = audio && audio.releaseDay ? audio.releaseDay : "";
  const streamed = audio && audio.streamed ? audio.streamed : "";

  const desc = audio && audio.description ? audio.description : "";

  return (
    <Track
      info={
        <PodcastAudioInfo
          id={audioId}
          link={link}
          topic={podcastTopic}
          avatar={avatar}
          title={podcastTitle}
          performer={podcastPerformer}
          type={type}
          releaseDay={releaseDay}
          streamed={streamed}
        />
      }
      list={
        <div className={cx("desc-box")}>
          {desc.length > 0 ? (
            desc.map((index) => <h4 key={index} className={cx("desc")}></h4>)
          ) : (
            <h4 className={cx("desc")}>
              The description of this podcast audio is being updated
            </h4>
          )}
        </div>
      }
    />
  );
}

export default PodcastAudioPage;
