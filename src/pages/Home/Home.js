import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import AudioInfo from "~/components/AudioInfo";

const cx = classNames.bind(styles);
function Home() {
  return <div className={cx("wrapper")}>{<AudioInfo />}</div>;
}

export default Home;
