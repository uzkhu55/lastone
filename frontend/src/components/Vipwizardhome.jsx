"use client";

const Vipwizardhome = () => {
  return (
    <div className="flex z-10 items-center gap-2 justify-center">
      <div className="flex flex-col gap-2">
        <button className="flex w-[529px] items-center text-black justify-between p-4 text-3xl h-[76px] rounded-xl bg-[#ffd704]">
          <p>VIP All Reward List</p>
          <img
            src="downarrowinput.gif"
            className="w-[43px] h-[48px]"
            alt="Down Arrow"
          />
        </button>

        <input
          placeholder="Reward password"
          className="flex w-[529px] items-center justify-between p-4 text-3xl h-[76px] rounded-xl bg-[#1e1e3a]"
          type="text"
        />
      </div>

      <button href="/">
        <img
          className="w-[240px] h-[170px]"
          src="vipmagic.png"
          alt="See Magic"
        />
      </button>
    </div>
  );
};

export default Vipwizardhome;
