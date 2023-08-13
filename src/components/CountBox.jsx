import React from "react";
import { useStateContext } from "../context";

const CountBox = ({ title, value }) => {
  const { dark } = useStateContext();
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4
        className={`font-epilogue font-bold text-[30px] ${
          dark ? "text-white bg-[#1c1c21]" : "text-black bg-[#fff]"
        } p-3 rounded-t-[10px] w-full text-center truncate`}
      >
        {value}
      </h4>
      <p
        className={`font-epilogue font-normal text-[16px] ${ dark ? "text-[#808191] bg-[#28282e]" : "text-[#000000] bg-[#e2e2ff]"} px-3 py-2 w-full rouned-b-[10px] text-center`}
      >
        {title}
      </p>
    </div>
  );
};

export default CountBox;
