import InputRange from "react-input-range";

interface AgeRangeSliderProps {
  ageRange: { min: number; max: number};
  handleAgeRangeChange: (value: number | { min: number; max: number; }) => void;
  handleFilterClick: () => void; 
}

const AgeRangeSlider = ({
  ageRange,
  handleAgeRangeChange,
  handleFilterClick
}: AgeRangeSliderProps) => {
  return (
    <>
      <label className="mt-3 italic text-black">Age Range</label>
      <div className="flex mt-1 pl-1 items-center">
        <InputRange
          maxValue={30}
          minValue={0}
          value={ageRange}
          onChange={handleAgeRangeChange}
          />
        <button className="ml-5" onClick={handleFilterClick}>Go</button>
      </div>
    </>
  );
};

export default AgeRangeSlider;
