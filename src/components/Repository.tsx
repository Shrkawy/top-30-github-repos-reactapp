import { Repository as RepositoryProps } from "../models/Repository";
import { Star } from "../icons";

import styles from "../styles/repository.module.css";

const countSubmitDays = (submitDate: string): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(submitDate);
  const secondDate = new Date(); // 2st of March at noon

  const diffDays = Math.round(
    Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
  );

  return diffDays;
};

const Repository = ({
  name,
  description,
  issues,
  avatar,
  username,
  stars,
  createdAt,
  url,
}: RepositoryProps) => {
  const onRepoClick = (): void => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.container} onClick={onRepoClick}>
      <div>
        <img src={avatar} alt={username} />
      </div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <div>
          <span>
            <Star /> {stars}
          </span>
          <span>Issues: {issues}</span>
          <p>
            submitted {countSubmitDays(createdAt)} days ago by{" "}
            <strong>{username}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Repository;
