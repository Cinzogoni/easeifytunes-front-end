import classNames from "classnames/bind";
import styles from "./SearchNav.module.scss";

import config from "~/config";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function SearchNav({ id }) {
  let linkTo;

  switch (id) {
    case "search-page":
      linkTo = config.routes.search;
      break;
    default:
      linkTo = "/";
      break;
  }
  return (
    <Link to={linkTo}>
      <div className={cx("search-act")}>
        <FontAwesomeIcon
          className={cx("search-fix")}
          icon={faMagnifyingGlass}
        />
        <h3 key={id} className={cx("search-title")}>
          Search
        </h3>
      </div>
    </Link>
  );
}

export default SearchNav;
