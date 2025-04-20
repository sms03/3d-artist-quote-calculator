import Navbar from "./Navbar";
import Footer from "./Footer";
import InteractiveSphere from "../ui/InteractiveSphere";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="gradient-bg fixed inset-0 opacity-10 z-0" />
      <InteractiveSphere className="opacity-40" />
      
      <Navbar />
      
      <main className="flex-grow z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
