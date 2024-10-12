import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import GlobalStyles from "./components/GlobalStyles";
import GridSystem from "./components/GridSystem";
import styles from "~/components/GridSystem/GridSystem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyles>
    <GridSystem gridClass={cx("grid")} wideClass={cx("wide")}>
      <App />
    </GridSystem>
  </GlobalStyles>
);

reportWebVitals();
