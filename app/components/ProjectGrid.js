import React from "react";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";
import ToolTip from "./Tooltip";

export default function ProjectGrid(props) {
  return (
    <ul className="main-grid space-around">
      {props.data.map((info, index) => {
        const {
          forks,
          open_issues_count,
          html_url,
          owner,
          stargazers_count
        } = info;

        const { avatar_url, login } = owner;

        return (
          <li className="list-item bg-light" key={index}>
            <h2 className="center-text">{index + 1}</h2>
            <img className="images" src={avatar_url}></img>
            <h2 className="login">{login}</h2>
            <ul className="inner-list">
              <ToolTip text="Github username">
                <li>
                  <FaUser color="rgb(255, 191, 116)" size={22} />
                  <a href={html_url}>{login}</a>
                </li>
              </ToolTip>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count} stars
              </li>

              <li>
                <FaCodeBranch color="rgb(129, 195, 245" size={22} />
                {forks} forks
              </li>

              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues_count} open issues
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
