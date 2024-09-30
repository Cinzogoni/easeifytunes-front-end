import classNames from "classnames/bind";
import styles from "./MomentViewAll.module.scss";

const cx = classNames.bind(styles);
function MomentViewAll() {
  return (
    <div className={cx("wrapper")}>
      <h1>Moment View all</h1>
    </div>
  );
}

export default MomentViewAll;
