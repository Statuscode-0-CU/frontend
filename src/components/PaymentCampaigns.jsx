import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { PayCard } from "../components";
import { useStateContext } from "../context";

const PaymentCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const { dark } = useStateContext();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  console.log(campaigns.length);
  return (
    <div>
      <h1 className={`font-epilogue font-semibold text-[18px] ${ dark ? "text-white" : "text-black"} text-left`}>
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-col mt-[20px] gap-[26px]">
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

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <PayCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default PaymentCampaigns;
