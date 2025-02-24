import { SelectChangeEvent } from "../types/types";

interface SortSelectProps {
  sorts: string[];
  sortField: string;
  handleSortChange: (event: SelectChangeEvent) => void;
}

const SortSelect = ({
  sorts,
  sortField,
  handleSortChange,
}: SortSelectProps) => {
  const firstLetter = sortField.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = sortField.slice(1);

  const capitalizedWord = firstLetterCap + remainingLetters;

  return (
    <>
      <label htmlFor="sortSelect">Sort by</label>
      <select
        className="custom-select ml-1"
        id="sortSelect"
        value={capitalizedWord}
        onChange={handleSortChange}
      >
        {sorts.map((sort) => (
          <option key={sort} value={sort}>
            {sort}
          </option>
        ))}
      </select>
    </>
  );
};

export default SortSelect;
