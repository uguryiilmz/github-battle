import React from "react";
import { battle } from "../../utils/api";
import Loading from "../Loading";
import Tooltip from "../Tooltip";
import { ThemeConsumer } from "../../contexts/theme";
import queryString from "query-string";
import { Link } from "react-router-dom";

import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from "react-icons/fa";

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );

    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return <p className="text-center error">{error}</p>;
    }

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <div className="res-style">
              <div className="card bg-light">
                <h4 className="header-lg-result">
                  {winner.score === loser.score ? "Tie" : "Winner"}
                </h4>
                <img
                  className="avatar"
                  src={winner.profile.avatar_url}
                  alt={`Avatar for ${winner.profile.login}`}
                />
                <h4 className="link-center">
                  Score:{winner.score.toLocaleString()}
                </h4>
                <div className="link-center">
                  <a className="res-link" href={winner.profile.html_url}>
                    {winner.profile.login}
                  </a>
                </div>
                <ul className="card-list">
                  <li>
                    <FaUser color="rgb(239,115,115)" size={22} />
                    {winner.profile.name}
                  </li>
                  {winner.profile.location && (
                    <li>
                      <Tooltip text="User's location">
                        <FaCompass color="rgb(144,115,255)" size={22} />
                        {winner.profile.location}
                      </Tooltip>
                    </li>
                  )}
                  {winner.profile.company && (
                    <li>
                      <Tooltip text="User's company">
                        <FaBriefcase color="#795548" size={22} />
                        {winner.profile.company}
                      </Tooltip>
                    </li>
                  )}
                  <li>
                    <FaUser color="rgb(129,195,245)" size={22} />
                    {winner.profile.followers.toLocaleString()} followers
                  </li>
                  <li>
                    <FaUserFriends color="rgb(64,1183,95)" size={22} />
                    {winner.profile.following.toLocaleString()} following
                  </li>
                </ul>
              </div>
              <div className="card bg-light">
                <h4 className="header-lg-result ">
                  {winner.score === loser.score ? "Tie" : "Loser"}
                </h4>
                <img
                  className="avatar"
                  src={loser.profile.avatar_url}
                  alt={`Avatar for ${loser.profile.login}`}
                />
                <h4 className="link-center">
                  Score:{loser.score.toLocaleString()}
                </h4>
                <div className="link-center">
                  <a className="res-link" href={loser.profile.html_url}>
                    {winner.profile.login}
                  </a>
                </div>
                <ul className="card-list">
                  <li>
                    <FaUser color="rgb(239,115,115)" size={22} />
                    {loser.profile.name}
                  </li>
                  {loser.profile.location && (
                    <li>
                      <FaCompass color="rgb(144,115,255)" size={22} />
                      {loser.profile.location}
                    </li>
                  )}
                  {loser.profile.company && (
                    <li>
                      <FaBriefcase color="#795548" size={22} />
                      {loser.profile.company}
                    </li>
                  )}
                  <li>
                    <FaUser color="rgb(129,195,245)" size={22} />
                    {loser.profile.followers.toLocaleString()} followers
                  </li>
                  <li>
                    <FaUserFriends color="rgb(64,1183,95)" size={22} />
                    {loser.profile.following.toLocaleString()} following
                  </li>
                </ul>
              </div>
            </div>
            <div className="center-button">
              <Link className="link-space" to="/battle">
                {console.log("player one", this.props.playerOne)}
                {console.log("player one", this.props.playerTwo)}
                Reset Players
              </Link>
            </div>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}
