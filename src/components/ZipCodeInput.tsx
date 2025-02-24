import { InputChangeEvent } from "../types/types";

interface ZipCodesProps {
  handleZipCodeChange: (event: InputChangeEvent) => void;
}

const ZipCodeInput = ({ handleZipCodeChange }: ZipCodesProps) => {
  return (
    <>
      <input
        className="custom-select mt-5 w-full pl-1"
        id="zipCodeInput"
        type="text"
        placeholder="Zip Code"
        onChange={handleZipCodeChange}
        maxLength={5}
      />
    </>
  );
};

export default ZipCodeInput;
