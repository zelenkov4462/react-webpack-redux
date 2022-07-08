import React, { useEffect, useState } from "react";
import "./main.less";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../actions/repos";
import Repo from "./repo/Repo";

const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos.items);
  const isFetching = useSelector((state) => state.repos.isFetching);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getRepos());
  }, []);

  const searchHandler = () => {
    dispatch(getRepos(searchValue));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(getRepos(searchValue));
    }
  };
  return (
    <div>
      <div className="search">
        <input
          onKeyPress={onKeyDown}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="search-input"
          placeholder="Input repo name"
        />
        <button onClick={() => searchHandler()} className="search-btn">
          Search
        </button>
      </div>

      {isFetching === false ? (
        repos.map((repo) => (
          <div key={repo.id}>
            <Repo repo={repo} />
          </div>
        ))
      ) : (
        <div className="fetching"></div>
      )}
    </div>
  );
};

export default Main;
