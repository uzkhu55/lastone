"use client";

import Newwizardhome from "@/components/Newwizardhome";
import Wizardfooter from "@/components/Wizardfooter";
import Wizardheader from "@/components/Wizardheader";
import { useState } from "react";

const page = () => {
  const [heartCount, setHeartCount] = useState(0);

  return (
    <div className="h-[81vh] md:h-screen  w-screen flex flex-col justify-between bg-[#010026]">
      <Wizardheader heartCount={heartCount} setHeartCount={setHeartCount} />
      <Newwizardhome setHeartCount={setHeartCount} heartCount={heartCount} />
      <Wizardfooter />
    </div>
  );
};

export default page;
