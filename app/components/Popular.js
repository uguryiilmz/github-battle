import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import ProjectGrid from "./ProjectGrid";
import Loading from "./Loading";
import { ThemeConsumer } from "../contexts/theme";

function LanguageNav(props) {
  const selected = props.selected;
  const onUpdateLanguage = props.onUpdateLanguage;

  const languages = [
    "All",
    "Python",
    "Javascript",
    "Java",
    "Ruby",
    "C#",
    "C++"
  ];

  return (
    <ul className="flex-center">
      {languages.map(language => {
        return (
          <li key={language}>
            <button
              style={selected === language ? { color: "green" } : null}
              className="btn-clean nav-item"
              onClick={() => onUpdateLanguage(language)}
            >
              {language}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

LanguageNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null
    };

    this.changeLanguage = this.changeLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.changeLanguage(this.state.selectedLanguage);
  }
  //   changeLanguage = language => {
  //     console.log(language);
  //   };

  //   changeLanguage(e) {
  //     e.preventDefault();
  //     this.setState({
  //       language: e.target.value
  //     });
  //   }

  changeLanguage(language) {
    console.log(language);
    this.setState({
      selectedLanguage: language,
      error: null
    });

    if (!this.state.repos[language]) {
      fetchPopularRepos(language)
        .then(data => {
          this.setState(prevState => ({
            repos: {
              ...this.state.repos,
              [language]: data
            }
          }));
        })
        .catch(() => {
          console.log("Error from the server", error);
          this.setState({
            error: `There was an error fetching the repositories.`
          });
        });
    }
  }

  isLoading() {
    return (
      !this.state.repos[this.state.selectedLanguage] &&
      this.state.error === null
    );
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <LanguageNav
              selected={this.state.selectedLanguage}
              onUpdateLanguage={this.changeLanguage}
            />

            {this.isLoading() && <Loading text="Fetching Repos" />}

            {this.state.error && <p className="error">{this.state.error}</p>}

            {this.state.repos[this.state.selectedLanguage] && (
              <ProjectGrid
                data={this.state.repos[this.state.selectedLanguage]}
              />
            )}
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}
