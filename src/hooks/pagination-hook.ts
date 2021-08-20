import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const usePagination = () => {
  const [currPage, setCurrPage] = useState(1);

  const history = useHistory();
  const page = history.location.pathname.split("").pop();

  useEffect(() => {
    if (page && +page > 1) {
      setCurrPage(+page);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toNextPage = () => {
    setCurrPage((curr) => curr + 1);
  };

  const toPrevPage = () => {
    setCurrPage((curr) => (curr === 1 ? 1 : curr - 1));
  };

  const toFirstPage = () => {
    if (currPage === 1) return;
    setCurrPage(1);
  };

  return { currPage, toFirstPage, toNextPage, toPrevPage };
};

export default usePagination;
