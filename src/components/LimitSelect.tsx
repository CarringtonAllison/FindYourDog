import { SelectChangeEvent } from "../types/types";

interface LimitProps {
  size: number;
  handleLimitChange: (event: SelectChangeEvent) => void;
}

const LimitSelect = ({ size, handleLimitChange }: LimitProps) => {
  return (
    <>
      <label className="ml-5" htmlFor="limitSelect">Items per page</label>   
        <select  className="custom-select ml-1" id="limitSelect" value={size} onChange={handleLimitChange}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </>
  );
};

export default LimitSelect;
