import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface InteractiveSphereProps {
  className?: string;
}

const InteractiveSphere = ({ className }: InteractiveSphereProps) => {
  // component logic
  return (
    <div className={className}>
      {/* sphere rendering */}
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/80 transition-colors"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

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
      <BackToTopButton />
    </div>
  );
};

export default Layout;
