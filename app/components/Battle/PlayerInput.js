import React from "react";
import PropTypes from "prop-types";
import "./PlayerInput.css";
import { ThemeConsumer } from "../../contexts/theme";

export default class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label className="player-label" htmlFor="name">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                className={`input-${theme}`}
                type="text"
                name="name"
                className="input-light"
                placeholder="github username"
                id="name"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
              <button
                className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
                type="submit"
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
