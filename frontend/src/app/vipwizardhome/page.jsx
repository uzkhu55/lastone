import Vipfooter from "@/components/Vipfooter";
import Vipdheader from "@/components/Vipheader";
import Vipwizardhome from "@/components/Vipwizardhome";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-[#010026]">
      <video
        src="video.mp4"
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover" // Ensures the video covers the entire viewport
      ></video>
      <Vipdheader />
      <Vipwizardhome />
      <Vipfooter />
    </div>
  );
};

export default page;
