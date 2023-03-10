import React, { useEffect, useState } from 'react';
import './Autocomplete.css';
import AutocompleteItem from './AutocompleteItem';

interface AutocompleteProps {
  value?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  loadData: (value: string) => Promise<string[]>;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ value, onChange, loadData, className, placeholder }) => {
  // input state
  const [inputValue, setInputValue] = useState<string>(typeof value === 'string' ? value : '');

  // last search value state
  const [lastSearchValue, setLastSearchValue] = useState<string>('');

  // selected index state
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  // list open state
  const [listOpen, setListOpen] = useState<boolean>(false);

  // filtered options state
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  // effect to fetch filtered options
  useEffect(() => {
    const timer = setTimeout(() => {
      if (listOpen) {
        if (inputValue && lastSearchValue !== inputValue) {
          setLoading(true);
          loadData(inputValue)
            .then((filteredOptions) => setFilteredOptions(filteredOptions))
            .catch(console.error)
            .finally(() => {
              setLastSearchValue(inputValue);
              setLoading(false);
              setSelectedIndex(-1);
            });
        } else if (!inputValue) {
          setFilteredOptions([]);
          setSelectedIndex(-1);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, lastSearchValue, listOpen, loadData]);

  // effect to call onChange callback when input value changes
  useEffect(() => {
    if (onChange) onChange(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  // handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setLastSearchValue('');
    showAutocompleteList();
  };

  // handle key up event
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp') {
      setSelectedIndex((index) => Math.max(-1, index - 1));
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex((index) =>
        Math.min(filteredOptions.length - 1, index + 1),
      );
    } else if (
      event.key === 'Enter' &&
      selectedIndex > -1 &&
      selectedIndex < filteredOptions.length
    ) {
      selectItem(filteredOptions[selectedIndex]);
    } else if (event.key === 'Escape') {
      hideAutocompleteList();
    }
  }

  // select item from autocomplete list
  const selectItem = (value: string) => {
    setInputValue(value);
    setSelectedIndex(-1);
    setFilteredOptions([]);
    hideAutocompleteList();
  };

  // show autocomplete list
  const showAutocompleteList = () => setListOpen(true);

  // hide autocomplete list
  const hideAutocompleteList = () => setTimeout(() => setListOpen(false), 200);

  return (
    <div className="autocomplete">
      <input
        type="text"
        className={className}
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        onFocus={showAutocompleteList}
        onBlur={hideAutocompleteList}
        placeholder={placeholder}
      />
      {listOpen && (filteredOptions.length || loading) ? (
        <div className='autocomplete-list'>
          {loading ? <div className="autocomplete-loading">Loading ...</div> : null}
          {filteredOptions.map((option, i) => (
            <AutocompleteItem
              key={`${i}-${option}`}
              selected={selectedIndex === i}
              value={option}
              query={inputValue}
              onClick={selectItem}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Autocomplete;
