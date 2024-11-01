import Newwizardhome from "@/components/Newwizardhome";
import Wizardfooter from "@/components/Wizardfooter";
import Wizardheader from "@/components/Wizardheader";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-[#010026]">
      <Wizardheader />
      <Newwizardhome />
      <Wizardfooter />
    </div>
  );
};

export default page;
