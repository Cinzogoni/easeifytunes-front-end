import classNames from "classnames/bind";
import styles from "./NewReleasesViewAll.module.scss";

const cx = classNames.bind(styles);
function NewReleasesViewAll() {
  return (
    <div className={cx("wrapper")}>
      <h1>New Releases View All</h1>
    </div>
  );
}

export default NewReleasesViewAll;
