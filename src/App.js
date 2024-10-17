import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useState, createContext, useEffect } from "react";
import { Fragment } from "react";

import config from "./config";

import { publicRouter } from "./router";
import MainLayout from "./layouts/MainLayout";

import { AudioPlayerProvider } from "./components/AudioPlayerProvider";
import { TrackInfoProvider } from "./components/TrackInfoProvider";

import styles from "./App.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const componentContext = createContext();

function App() {
  return (
    <Router>
      <AudioPlayerProvider>
        <TrackInfoProvider>
          <AppContent />
        </TrackInfoProvider>
      </AudioPlayerProvider>
    </Router>
  );
}

function AppContent() {
  const [component, setComponent] = useState();
  const [componentPath, setComponentPath] = useState(config.routes.home);
  const location = useLocation();

  useEffect(() => {
    setComponentPath(location.pathname);

    const currentRoute = publicRouter.find(
      (route) => route.path === location.pathname
    );
    setComponent(currentRoute);
  }, [location.pathname]);

  return (
    <componentContext.Provider value={{ componentPath, component }}>
      <div className={cx("app")}>
        <Routes>
          {publicRouter.map((route, index) => {
            const Layout = route.layout === false ? Fragment : MainLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </componentContext.Provider>
  );
}

export default App;
