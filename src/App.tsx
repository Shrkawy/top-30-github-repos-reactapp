import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";

import usePagination from "./hooks/pagination-hook";

import styles from "./styles/App.module.css";

const RepositoryList = lazy(() => import("./components/RepositoryList"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const { currPage, toFirstPage, toNextPage, toPrevPage } = usePagination();

  return (
    <main className={styles.container}>
      <Switch>
        {/* Dynamic pagination search */}
        <Route path="/page=:page">
          <Suspense fallback={<Loading />}>
            <RepositoryList currPage={currPage} />
          </Suspense>
        </Route>
        {/* Home */}
        <Route path="/" exact>
          <Suspense fallback={<Loading />}>
            <RepositoryList currPage={currPage} />
          </Suspense>
        </Route>
      </Switch>
      <Suspense fallback={null}>
        <Footer
          currPage={currPage}
          toFirstPage={toFirstPage}
          toNextPage={toNextPage}
          toPrevPage={toPrevPage}
        />
      </Suspense>
    </main>
  );
}

export default App;
