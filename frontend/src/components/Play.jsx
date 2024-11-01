import Link from "next/link";

const Play = () => {
  return (
    <div className="relative">
      <img className="h-[779px]" src="playpage.png" alt="" />
      <Link
        href="/newwizardhome"
        className="absolute top-[415px] font-semibold text-2xl left-[400px]"
      >
        Wizard Word
      </Link>
      <Link
        href="/comingsoon"
        className="absolute font-semibold text-2xl top-[415px] left-[715px]"
      >
        Wizard x Magic
      </Link>
      <Link
        href="/comingsoon"
        className="absolute top-[415px]  font-semibold text-2xl left-[1060px]"
      >
        Magic Word
      </Link>
    </div>
  );
};

export default Play;
