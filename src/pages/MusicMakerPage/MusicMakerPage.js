import classNames from "classnames/bind";
import styles from "./MusicMakerPage.module.scss";

import Track from "~/components/Track";
import AudioList from "~/components/AudioList";
import AudioListInfo from "~/components/AudioListInfo";

const cx = classNames.bind(styles);

function MusicMakerPage() {
  return <Track info={<AudioListInfo />} list={<AudioList />} />;
}

export default MusicMakerPage;
