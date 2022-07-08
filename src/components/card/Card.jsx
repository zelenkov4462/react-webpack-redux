import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { getCotributors, getCurrentRepo } from "../actions/repos";

import "./card.less";
import { useDispatch, useSelector } from "react-redux";
import Repo from "../main/repo/Repo";

const Card = (props) => {
  const { username, reponame } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState({ owner: {} });
  const [contributors, setContributors] = useState([]);
  const [isFetch, setIsFetch] = useState(false);

  async function fetchingRepo() {
    setIsFetch(true);
    await getCurrentRepo(username, reponame, setRepo);
    setIsFetch(false);
  }

  useEffect(() => {
    fetchingRepo();
    // getCurrentRepo(username, reponame, setRepo);
    getCotributors(username, reponame, setContributors);
  }, []);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      {isFetch === false ? (
        <div className="card">
          <img src={repo.owner.avatar_url} alt="" />
          <div className="name">{repo.name}</div>
          <div className="stars">{repo.stargazers_count}</div>
        </div>
      ) : (
        <div className="fetching1"></div>
      )}

      {/*<div className="card">*/}
      {/*  <img src={repo.owner.avatar_url} alt="" />*/}
      {/*  <div className="name">{repo.name}</div>*/}
      {/*  <div className="stars">{repo.stargazers_count}</div>*/}
      {/*</div>*/}
      {contributors.map((c, index) => (
        <div>
          {index + 1}. {c.login}
        </div>
      ))}
    </div>
  );
};

export default Card;
