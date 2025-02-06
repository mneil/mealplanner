"use client"

import React, { useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';

const Autocomplete = ({ suggestions }: { suggestions: string[] }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestionIndex(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    setFilteredSuggestions([]);
    setUserInput(e.currentTarget.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") { // Enter key
      setUserInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    } else if (e.key === "ArrowUp") { // Up arrow
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === "ArrowDown") { // Down arrow
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions available.</em>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {showSuggestions && userInput && <SuggestionsListComponent />}
    </div>
  );
};

export default Autocomplete;
