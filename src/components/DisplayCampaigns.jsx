import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { Fundcard } from "../components";
import { daysLeft } from "../utils";
import { useStateContext } from "../context";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const { dark,currentOption } = useStateContext();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };


  return (
    <div>
      <h1 className={`font-epilogue font-semibold text-[18px] ${dark ? "text-white" : "text-black"} text-left`}>
        {title} ({campaigns.filter((campaign) => daysLeft(campaign.deadline) > 0).length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {currentOption==="All" &&  !isLoading &&
          campaigns.length > 0 &&
          campaigns.map(
            (campaign) =>
              daysLeft(campaign.deadline) > 0 && (
                <Fundcard
                  key={campaign.id}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              )
          )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map(
            (campaign) =>
              daysLeft(campaign.deadline) > 0 && currentOption === (campaign.category) && (
                <Fundcard
                  key={campaign.id}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              )
          )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
