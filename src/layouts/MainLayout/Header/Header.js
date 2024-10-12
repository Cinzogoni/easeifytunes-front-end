import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import AuthService from "~/services/authService.js";

import HeaderActions from "../HeaderActions";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("logo")} src="" alt="EaseifyTunes Logo" />
      {AuthService() ? (
        // Khi đã đăng nhập
        <HeaderActions />
      ) : (
        // Khi chưa đăng nhập
        <div className={cx("actions")}>
          <Button primary>Sign up</Button>
          <Button>Log in</Button>
          <FontAwesomeIcon className={cx("menu")} icon={faBars} />
        </div>
      )}
    </div>
  );
}

export default Header;
