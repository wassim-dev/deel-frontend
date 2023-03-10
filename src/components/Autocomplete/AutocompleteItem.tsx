import { highlightMatching } from "./helpers";

interface AutocompleteItemProps {
  value: string;
  selected: boolean;
  query: string;
  onClick: (value: string) => void;
}

const AutocompleteItem: React.FC<AutocompleteItemProps> = ({
  value,
  selected,
  query,
  onClick,
}) => {
  return (
    <button
      className={`autocomplete-item ${selected && 'active'}`}
      onClick={() => onClick(value)}
      dangerouslySetInnerHTML={{ __html: highlightMatching(value, query) }}
    />
  );
};

export default AutocompleteItem;
