import Marquee from "react-fast-marquee";

const BannerText = () => {
  const services = [
    "Explore Bangladesh",
    "Sajek Valley Tours",
    "Sundarbans Adventure",
    "Cox's Bazar Beach",
    "Saint Martin Island",
    "Bandarban Expedition",
    "Sylhet Tea Gardens",
    "Srimangal Nature Tour",
    "Affordable Tour Packages",
    "Trusted Travel Partner",
  ];

  return (
    <div className="relative">
      {/* Orange background - bottom layer */}
      <div className="absolute inset-0 h-14 bg-orange-500 skew-y-[1deg]" />

      {/* Black marquee - top layer */}
      <div className="relative z-10 -skew-y-[1deg]">
        <div className="flex h-14 items-center bg-black">
          <Marquee speed={50} gradient={false}>
            {services.concat(services).map((service, index) => (
              <span
                key={index}
                className="flex items-center whitespace-nowrap font-poppins text-2xl font-bold text-white"
              >
                {service}
                <span className="mx-12 text-orange-500">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default BannerText;
