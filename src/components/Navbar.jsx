import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb, downarrow } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address, dark, avatar,setCurrentOption,currentOption } = useStateContext();
  const [toggle, setToggle] = useState(false);

  const options = [
    "All",
    "Environment",
    "Research & Development",
    "Real Estate",
    "Medical Issues",
    "Hazards",
    "Startup Capital",
    "Others",
  ];

  const handleClick = (opt) => {
     setCurrentOption(opt);
     setToggle(false);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="flex flex-col relative">
        <div className="lg:flex-1 flex ${dark ? 'bg-[#13131a]' : 'bg-[whitesmoke]'} flex-row w-[400px] pl-4 rounded-[80px] border-2 border-${dark? black : whitesmoke} border-solid shadow-lg shadow-blue-500/50">
          <input
            type="text"
            placeholder="All"
            value={currentOption}
            className="flex w-full font-epilogue font-normal text-[16px] placeholder:text-${dark ? 'bg-[#08080a] text-white' : 'bg-[#f8f8fc] text-black'} bg-transparent outline-none"
          />

          <div
            className="w-[100px] h-full rounded-[30px] bg-[#198cff] flex justify-center items-center cursor-pointer shadow-lg shadow-blue-500/50"
            onClick={() => setToggle((prev) => !prev)}
          >
            <img
              src={downarrow}
              alt="search"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </div>

        {toggle && (
          <div
            className={`absolute ${
              dark ? "bg-[#1c1c24] text-white" : "bg-[#dfe6e7f7] text-black"
            } w-full rounded-xl top-[60px]`}
          >
            {options.map((option) => (
              <div
                className={`flex py-3 justify-center rounded-xl ${
                  dark
                    ? "hover:bg-[#32323c] active:bg-[#32323c] text-white"
                    : "hover:bg-[#fff] active:bg-[#fff] text-black"
                }`}

                onClick={()=>handleClick(option)}
              >
                <p>{option}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Secure Funds" : "Connect"}
          styles={address ? "bg-[#198cff]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={avatar}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div
          className={`w-[40px] h-[40px] rounded-[10px] ${
            dark ? "bg-[#2c2f32]" : "bg-[#ffffff]"
          } flex justify-center items-center cursor-pointer`}
        >
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#198cff]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Secure Funds" : "Connect"}
              styles={address ? "bg-[#198cff]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
