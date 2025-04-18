import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{
    name: "Home",
    path: "/"
  }, {
    name: "3D Still Frame",
    path: "/3d-still-frame"
  }, {
    name: "3D Animations",
    path: "/3d-animations"
  }, {
    name: "3D CGI",
    path: "/3d-cgi"
  }, {
    name: "VFX Projects",
    path: "/vfx-projects"
  }, {
    name: "Video Editing",
    path: "/video-editing"
  }];
  return <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 font-geist-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-design-soft-pink to-design-soft-purple rounded-md"></div>
              <span className="ml-2 font-bold bg-clip-text bg-gradient-primary text-[#fed7d0] text-lg">
                3D Price Craft
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map(item => <Link key={item.name} to={item.path} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-black hover:bg-design-soft-purple/20 transition-colors">
                  {item.name}
                </Link>)}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-design-purple hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => <Link key={item.name} to={item.path} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-design-purple hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>)}
          </div>
        </div>}
    </nav>;
};
export default Navbar;