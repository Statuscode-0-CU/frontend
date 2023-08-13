import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Profile, CampaignDetails, CreateCampaign, Payment } from "./pages";
import { Navbar, Sidebar } from "./components";
import { useStateContext } from "./context";


const App = () => {
  const { dark } = useStateContext();

  return (
    <div className={`relative sm:-8 p-4 ${dark ? 'bg-[#13131a]' : 'bg-[whitesmoke]'} min-h-screen flex flex-row`}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
