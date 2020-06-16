import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from "react-icons/fa";
import "./Instructions.css";
import PlayerInput from "./PlayerInput";
import { ThemeConsumer } from "../../contexts/theme";

export default function Instructions(props) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <React.Fragment>
          <h2 className="center-text">Instructions</h2>
          <ol className="instruction-grid">
            <li>
              <h2>Enter two Github Users</h2>
              <FaUserFriends
                className={`bg-${theme}`}
                color="rgb(255,178,102)"
                size={200}
              />
            </li>
            <li>
              <h2>FIIIIGHT</h2>
              <FaFighterJet
                className={`bg-${theme}`}
                color="rgb(224, 224, 224)"
                size={200}
              />
            </li>
            <li>
              <h2>See the Winner</h2>
              <FaTrophy
                className={`bg-${theme}`}
                color="rgb(255, 191, 116)"
                size={200}
              />
            </li>
          </ol>
        </React.Fragment>
      )}
    </ThemeConsumer>
  );
}
