import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun,moon } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const { dark,setDark } = useStateContext();

  const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && dark && "bg-[#2c2f32]"
      } ${
        isActive && isActive === name && !dark && "bg-[#99979771]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles} `}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund-logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund-logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>  
  );

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles={`w-[52px] h-[52px] ${dark ? "bg-[#1c1c24]" : "bg-[#dfe6e7f7]"}`} imgUrl={logo} />
      </Link>
      <div className={`flex-1 flex flex-col justify-between items-center ${ dark ? "bg-[#1c1c24]" : "bg-[#dfe6e7f7]"} rounded-[20px] w-[76px] py-4 mt-12`}>
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((Link) => (
            <Icon
              key={Link.name}
              {...Link}
              isActive={isActive}
              handleClick={() => {
                if (!Link.disabled) {
                  setIsActive(Link.name);
                  navigate(Link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon styles={`${ dark ? 'bg-[#1c1c24]' : 'bg-[#dfe6e7f7]'}`} imgUrl={dark ? sun : moon} handleClick={()=>setDark(prev=>!prev)}/>
      </div>
    </div>
  );
};

export default Sidebar;
