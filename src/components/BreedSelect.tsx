import { SelectChangeEvent } from '../types/types'

interface BreedSelectProps {
    selectedBreeds: string[], 
    breeds: string[],
    handleBreedChange: (event: SelectChangeEvent) => void; 
}

const BreedSelect = ({selectedBreeds, breeds, handleBreedChange}: BreedSelectProps) => {
    return (
        <>
        {/* <label htmlFor="breedFilter">Filter by Breed:</label> */}
        <select
          className="custom-select mt-5"
          id="breedFilter"
          value={selectedBreeds || ""}
          onChange={handleBreedChange}
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        </>
    )
}

export default BreedSelect; 