import { Link } from "react-router-dom";
import { First, Next, Prev } from "../icons";

import styles from "../styles/footer.module.css";

interface FooterProps {
  currPage: number;
  toNextPage: () => void;
  toPrevPage: () => void;
  toFirstPage: () => void;
}

const Footer = ({
  currPage,
  toFirstPage,
  toNextPage,
  toPrevPage,
}: FooterProps) => {
  const handleToPrevPage = (): string => {
    let path = "/";
    if (currPage === 2 || currPage === 1) {
      return path;
    } else {
      path = `/page=${currPage - 1}`;
    }
    return path;
  };
  return (
    <footer className={styles.footer}>
      <Link to="/" onClick={toFirstPage}>
        <First size={24} />
      </Link>
      <Link to={handleToPrevPage} onClick={toPrevPage}>
        <Prev size={24} />
      </Link>
      <p>Page: {currPage}</p>
      <Link to={`/page=${currPage + 1}`} onClick={toNextPage}>
        <Next size={24} />
      </Link>
    </footer>
  );
};

export default Footer;
