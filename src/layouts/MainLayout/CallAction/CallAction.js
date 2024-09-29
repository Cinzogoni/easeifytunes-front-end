import styles from "./CallAction.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function CallActions() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("desc")}>
        <h4> Call to actions</h4>
        <p>Description</p>
      </div>
      <div className={cx("actions")}>
        <h5>Try it free</h5>
      </div>
    </div>
  );
}

export default CallActions;
