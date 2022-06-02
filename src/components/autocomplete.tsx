import React, { Component } from "react";
import styles from "../../styles/Autocomplete.module.css";

type Props = {
  suggestions: AutocompleteItem[];
  placeholder: string;
  setValue: Function;
  type: string;
  userInput: string;
  setUserInput: Function;
};

type State = {
  activeSuggestion: number;
  filteredSuggestions: AutocompleteItem[];
  showSuggestions: boolean;
};

export type AutocompleteItem = {
  name: string;
  id: number;
};

export default class Autocomplete extends Component<Props, State> {
  private activeRef: React.RefObject<HTMLLIElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
    };

    this.activeRef = React.createRef();
  }

  onChange = (e: any) => {
    const { suggestions, placeholder } = this.props;
    const userInput = e.currentTarget.value;

    if (userInput) {
      const filteredSuggestions = suggestions.filter(
        (suggestion) =>
          suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      this.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
     });
    this.props.setUserInput(e.currentTarget.value);

    } else {
      this.setState({ showSuggestions: false});
      this.props.setUserInput("");
    }
  };

  onClick = (e: any) => {
    const { suggestions, type, setValue } = this.props;

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
    });
    this.props.setUserInput(e.currentTarget.innerText);

    suggestions.forEach((s) => {
      if (s.name === e.currentTarget.innerText) {
        setValue(type, s.id);
        return;
      }
    });
  };

  onKeyDown = (e: any) => {
    const { activeSuggestion, filteredSuggestions, showSuggestions } = this.state;
    const { setValue, type } = this.props;

    if (e.keyCode === 13 && showSuggestions) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
      });
      this.props.setUserInput(filteredSuggestions[activeSuggestion].name);
      setValue(type, filteredSuggestions[activeSuggestion].id);
    } else if (e.keyCode === 38 && activeSuggestion > 0) {
      this.setState(
        { activeSuggestion: activeSuggestion - 1 },
        () =>
          this.activeRef &&
          this.activeRef.current &&
          this.activeRef.current.scrollIntoView()
      );
    } else if (
      e.keyCode === 40 &&
      activeSuggestion < filteredSuggestions.length - 1
    ) {
      this.setState(
        { activeSuggestion: activeSuggestion + 1 },
        () =>
          this.activeRef &&
          this.activeRef.current &&
          this.activeRef.current.scrollIntoView()
      );
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      props: {
        userInput
      },
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className={styles.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              if (index === activeSuggestion) {
                return (
                  <li
                    ref={this.activeRef}
                    className={styles.suggestion_active}
                    key={suggestion.id}
                    onClick={onClick}
                  >
                    {suggestion.name}
                  </li>
                );
              }
              return (
                <li
                  className={styles.suggestion}
                  key={suggestion.id}
                  onClick={onClick}
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className={styles.no_suggestions}>
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    return (
      <div style={{ position: "relative" }}>
        <input
          className={styles.input}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder={this.props.placeholder}
        />
        {suggestionsListComponent}
      </div>
    );
  }
}
