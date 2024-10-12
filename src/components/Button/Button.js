import styles from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Button({ to, href, children, onClick, primary }) {
  const props = {
    onClick,
  };

  let Comp = `button`;

  if (to) {
    props.to = to;
  } else if (href) {
    props.href = href;
    Comp = `a`;
  }

  const classes = cx("button-wrapper", { primary });

  return (
    <Comp className={classes}>
      <span>{children}</span>
    </Comp>
  );
}

export default Button;
