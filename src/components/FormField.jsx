import React from "react";
import { useStateContext } from "../context";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  isDropDown,
  value,
  handleChange,
}) => {
  const { dark } = useStateContext();
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#333ba6] mb-[10px]">
          {labelName}
        </span>
      )}
      {
        isTextArea ? (
          <textarea
            required
            value={value}
            onChange={handleChange}
            rows={10}
            placeholder={placeholder}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-2 border-${'dark? black : whitesmoke'} border-solid$ bg-transparent font-epilogue ${
              dark ? "text-white" : "text-black"
            } text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]`}
          />
        ) : isDropDown ? (
          <select
            required
            value={value}
            onChange={handleChange}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-${'dark? black : whitesmoke'} bg-transparent font-epilogue ${
              dark ? "text-white" : "text-black"
            } text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]`}
          >
            <option
              value="Environment"
              className={`${
                dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
              } py-2`}
            >
              Environment
            </option>
            <option
              value="Research & Development"
              className={`${
                dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
              } py-2`}
            >
              Research & Development
            </option>
            <option
              value="Real Estate"
              className={`${
                dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
              } py-2`}
            >
              Real Estate
            </option>
            <option
              value="Medical Issues"
              className={`${
                dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
              } py-2`}
            >
              Medical Issues
            </option>
            <option
              value="Hazards"
              className={`${
                dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
              } py-2`}
            >
              Hazards
            </option>
            <option
              value="Startup Capital"
              className={`${
                dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
              } py-2`}
            >
              Startup Capital
            </option>
            <option
              value="Others"
              className={`${
                dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
              } py-2`}
            >
              Others
            </option>
          </select>
        ) : (
          <input
            required
            value={value}
            onChange={handleChange}
            type={inputType}
            step="0.1"
            placeholder={placeholder}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-${'dark? black >: white'} bg-transparent font-epilogue ${
              dark ? "text-white" : "text-black"
            } text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]`}
          />
        )
      }
    </label>
  );
};

export default FormField;
