import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-240px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
