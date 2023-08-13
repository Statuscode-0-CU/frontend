import React from "react";
import { useState } from "react";
import { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { identicon, lorelei } from "@dicebear/collection";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [currentOption, setCurrentOption] = useState("All");
  const { contract } = useContract(
    "0x5485923Fb45Cb374D4715140942f807794B1443a"
  );
  const ethtoUsdConvertor = useContract(
    "0x86dA2866a7Ad9257d04D398109783F7654348954"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const { mutateAsync: getConversionRate } = useContractWrite(
    ethtoUsdConvertor.contract,
    "getConversionRate"
  );
  const address = useAddress();
  const connect = useMetamask();
  const avatar = useMemo(() => {
    return createAvatar(identicon, {
      size: 128,
    }).toDataUriSync();
  }, [address]);
  const convert = async (value) => {
    try {
      const data = await getConversionRate({ args: [value*1e9] });
      const decimalValue = parseInt(data._hex, 16);
      return decimalValue;
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        convert,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
        form.category
      ]);
      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, id) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.ammountCollected.toString()
      ),
      image: campaign.image,
      donaters: campaign.donaters,
      category: campaign.category,
      pId: id,
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const getPaymentCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) =>
      campaign.donaters.includes(address)
    );
    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaigns", pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonation = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        dark,
        setDark,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getPaymentCampaigns,
        currentOption,
        setCurrentOption,
        avatar,
        donate,
        getDonation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
