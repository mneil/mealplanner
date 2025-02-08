'use client'

import React, { useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react'

export interface Suggestion {
  key: string | number
  value: string
}

interface AutoCompleteProps {
  suggestions: Suggestion[]
  onChange?: (s: Suggestion) => void
}

const Autocomplete = ({ suggestions, onChange }: AutoCompleteProps) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState<Suggestion>({ key: 0, value: '' })

  const setSelection = (s: Suggestion) => {
    onChange && onChange(s)
    setUserInput(s)
  }

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const userInput = e.currentTarget.value
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.value.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1,
    )

    setActiveSuggestionIndex(0)
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
    setSelection({ key: e.currentTarget.dataset.key!, value: e.currentTarget.value })
  }

  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    setFilteredSuggestions([])
    setSelection({
      key: e.currentTarget.dataset.key!,
      value: e.currentTarget.innerText,
    })
    setActiveSuggestionIndex(0)
    setShowSuggestions(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Enter key
      setSelection(filteredSuggestions.find((v) => v.key === activeSuggestionIndex)!)
      setActiveSuggestionIndex(0)
      setShowSuggestions(false)
    } else if (e.key === 'ArrowUp') {
      // Up arrow
      if (activeSuggestionIndex === 0) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1)
    } else if (e.key === 'ArrowDown') {
      // Down arrow
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1)
    }
  }

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className
          if (index === activeSuggestionIndex) {
            className = 'suggestion-active'
          }
          return (
            <li
              className={className}
              data-key={suggestion.key}
              key={suggestion.key}
              onClick={onClick}
            >
              {suggestion.value}
            </li>
          )
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions available.</em>
      </div>
    )
  }

  return (
    <div>
      <input
        type="text"
        onChange={_onChange}
        onKeyDown={onKeyDown}
        value={userInput?.value}
        data-key={userInput?.key}
      />
      {showSuggestions && userInput && <SuggestionsListComponent />}
    </div>
  )
}

export default Autocomplete
