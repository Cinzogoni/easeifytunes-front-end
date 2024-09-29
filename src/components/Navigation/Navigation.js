import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";

import { Link } from "react-router-dom";

import config from "~/config";

const cx = classNames.bind(styles);

function Navigation({ id }) {
  let linkTo;

  switch (id) {
    case "new-releases-viewAll":
      linkTo = config.routes.newReleasesViewAll;
      break;
    case "music-maker-viewAll":
      linkTo = config.routes.musicMakersViewAll;
      break;
    case "album-viewAll":
      linkTo = config.routes.albumViewAll;
      break;
    case "podcast-viewAll":
      linkTo = config.routes.podcastViewAll;
      break;
    default:
      linkTo = "/";
      break;
  }

  return (
    <Link to={linkTo} key={id}>
      <button className={cx("link")}>
        <h3 className={cx("link-route")}>View all</h3>
      </button>
    </Link>
  );
}

export default Navigation;
