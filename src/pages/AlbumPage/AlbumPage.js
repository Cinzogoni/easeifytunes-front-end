import classNames from "classnames/bind";
import styles from "./AlbumPage.module.scss";
import Track from "~/components/Track";
import AlbumInfo from "~/components/AlbumInfo";
import AlbumList from "~/components/AlbumList";

const cx = classNames.bind(styles);
function AlbumPage() {
  return <Track info={<AlbumInfo />} list={<AlbumList />} />;
}

export default AlbumPage;
