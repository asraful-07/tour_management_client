import Image from "next/image";

const logos = [
  "https://dreamstour.dreamstechnologies.com/html/assets/img/clients/client-07.svg",
  "https://dreamstour.dreamstechnologies.com/html/assets/img/clients/client-05.svg",
  "https://dreamstour.dreamstechnologies.com/html/assets/img/clients/client-03.svg",
  "https://dreamstour.dreamstechnologies.com/html/assets/img/clients/client-06.svg",
  "https://dreamstour.dreamstechnologies.com/html/assets/img/clients/client-07.svg",
];

export default function Logo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="transition duration-300 hover:scale-110"
            >
              <Image
                src={logo}
                alt={`Client Logo ${index + 1}`}
                width={140}
                height={60}
                className="h-12 w-auto object-contain opacity-70 transition hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}