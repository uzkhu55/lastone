"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const Magicheader = () => {
  return (
    <div className="flex items-center w-[1261px] mt-6 justify-between pt-4 bg-[#010026]">
      <img src="learn.png" className="w-[208px] h-[48px]" alt="" />
      <div className="flex h-[60px] text-center items-center justify-between">
        <div className="w-[212px] flex items-center justify-start gap-8 text-2xl  border-2 border-white rounded-3xl text-white h-[40px]">
          <img src="coin.gif" className="w-[35px] h-[37px]" alt="" />
          Points 0
        </div>
        <div className="w-[212px] flex text-2xl gap-4 items-center justify-evenly  border-2 border-white rounded-3xl text-white h-[40px]">
          <FontAwesomeIcon
            icon={faWallet}
            size="1x"
            beat
            fade
            style={{ color: "red" }}
          />
          Wallet 0$
        </div>
        <img src="aes.png" className="w-[220px] pb-[2px] h-[60px]" alt="" />
      </div>
    </div>
  );
};

export default Magicheader;
