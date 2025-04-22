import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Still Frame", path: "/3d-still-frame" },
  { name: "Animations", path: "/3d-animations" },
  { name: "CGI", path: "/3d-cgi" },
  { name: "VFX", path: "/vfx-projects" },
  { name: "Video Editing", path: "/video-editing" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`transition-all duration-500 z-50 font-geist-mono shadow-lg
        ${scrolled
          ? "top-0 left-1/2 w-[98vw] max-w-5xl rounded-full bg-white/80 backdrop-blur-xl h-20 px-12 border border-white/30 -translate-x-1/2"
          : "top-6 left-1/2 w-[98vw] max-w-5xl rounded-full bg-white/50 backdrop-blur-2xl h-16 px-12 border border-white/30 -translate-x-1/2"
        }`}
      style={{
        position: "fixed",
        transform: "translateX(-50%)",
        margin: "0 auto"
      }}
    >
      <div className="flex justify-between items-center h-full min-h-[3.5rem] px-2 md:px-6">
        <Link to="/" className="flex items-center gap-2 min-w-fit">
          <img src="/logo.png" alt="Ren3Der Logo" className="h-8 w-8 object-contain rounded-md" />
          <span className="font-bold bg-clip-text bg-gradient-primary text-[#fed7d0] text-lg whitespace-nowrap">
            Ren3Der
          </span>
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-4">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-black hover:bg-design-soft-purple/30 transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-design-purple hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 mt-2">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="block px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:text-design-purple hover:bg-gray-100 whitespace-nowrap mb-1"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;