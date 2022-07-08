import React, { useEffect, useState } from "react";
import "./main.less";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../actions/repos";
import Repo from "./repo/Repo";
import { setCurrentPage } from "../../reducers/reposReducer";
import { createPages } from "../../utils/pagesCreator";
import { Navigate } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos.items);
  const isFetching = useSelector((state) => state.repos.isFetching);
  const currentPage = useSelector((state) => state.repos.currentPage);
  const totalCount = useSelector((state) => state.repos.totalCount);
  const isFetchError = useSelector((state) => state.repos.isFetchError);
  const perPage = useSelector((state) => state.repos.perPage);
  const [searchValue, setSearchValue] = useState("");
  const pagesCount = Math.ceil(totalCount / perPage);

  const pages = [];
  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage));
  }, [currentPage]);

  const searchHandler = () => {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue, currentPage, perPage));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(getRepos(searchValue, currentPage, perPage));
    }
  };

  // if (isFetchError) {
  //   return <Navigate to="/error" replace={true} />;
  // }
  return (
    <div>
      {isFetchError && (
        <div className="alert alert-danger" role="alert">
          Error - произошла ошибка
        </div>
      )}
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
      <div className="pages">
        {pages.map((page, index) => (
          <span
            onClick={() => dispatch(setCurrentPage(page))}
            key={index}
            className={currentPage === page ? "currentPage" : "page"}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Main;
