import { useEffect, useState } from "react";
import { useHttpClint } from "../hooks/http-client-hook";
import Loading from "./Loading";
import Repository from "./Repository";
import { Repository as Repo } from "../models/Repository";

import styles from "../styles/repository-list.module.css";

/**
 * Returns yesterday Date as string
 */
const getYesterdayDate = (): string => {
  const date = new Date(Date.now() - 864e5).toJSON().slice(0, 10);

  return date;
};

interface RepositoprListProps {
  currPage: number;
}

const RepositoryList = ({ currPage }: RepositoprListProps) => {
  const { error, isLoading, sendReuest } = useHttpClint();
  const [repos, setRepos] = useState<Repo[] | null>(null);

  // fetch API on first load then set repos state
  useEffect(() => {
    const getRepos = async () => {
      try {
        const res = await sendReuest({
          method: "get",
          url: `https://api.github.com/search/repositories?q=created:>${getYesterdayDate()}&sort=stars&order=desc&page=${currPage}`,
        });
        if (res)
          setRepos(
            res.map((item: any) => ({
              name: item.name,
              avatar: item.owner.avatar_url,
              username: item.owner.login,
              description: item.description,
              issues: item.open_issues,
              stars: item.stargazers_count,
              url: item.html_url,
              createdAt: item.created_at,
            }))
          );
      } catch (err) {
        console.error(err);
      }
    };

    getRepos();

    // cleanup fn that removes repos from state
    return () => {
      setRepos(null);
    };
  }, [sendReuest, currPage]);

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {repos &&
        repos.map((repo, i) => (
          <Repository
            key={i}
            avatar={repo.avatar}
            description={repo.description}
            name={repo.name}
            issues={repo.issues}
            stars={repo.stars}
            username={repo.username}
            createdAt={repo.createdAt}
            url={repo.url}
          />
        ))}
      {!repos && !error && !isLoading && (
        <p>no repositories found. please reload the page</p>
      )}
    </div>
  );
};

export default RepositoryList;
