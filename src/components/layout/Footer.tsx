import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer
      className="relative bg-white/80 soft:bg-gray-900/80 text-gray-800 soft:text-gray-200 py-8 mt-20 font-geist-mono rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-xl backdrop-blur-xl border border-white/30 dark:border-gray-800"
      style={{ marginBottom: '2.5rem' }}
    >
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-200 dark:text-red-300">Ren3Der</h3>
            <p className="text-sm text-gray-700 mb-4">
              Professional 3D design services with transparent pricing.
            </p>
            <p className="text-sm text-yellow-700 font-medium">
              *GST @ 18% will be applicable as per Indian Government regulations
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li className="block">
                <Link to="/3d-still-frame" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  3D Still Frame Artwork
                </Link>
              </li>
              <li className="block">
                <Link to="/3d-animations" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  3D Animations
                </Link>
              </li>
              <li className="block">
                <Link to="/3d-cgi" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  3D CGI
                </Link>
              </li>
              <li className="block">
                <Link to="/vfx-projects" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  VFX Projects
                </Link>
              </li>
              <li className="block">
                <Link to="/video-editing" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  Video Editing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact & Legal</h3>
            <ul className="space-y-2 mb-4">
              <li className="block">
                <Link to="/terms" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  Terms of Service
                </Link>
              </li>
              <li className="block">
                <Link to="/pricing-policy" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  Pricing Policy
                </Link>
              </li>
              <li className="block">
                <Link to="/contact" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  Contact Us
                </Link>
              </li>
              <li className="block">
                <Link to="/about" className="block w-full text-sm text-gray-700 hover:text-black transition-colors cursor-pointer">
                  About Me
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 text-center text-sm text-gray-700 space-y-2">
          <p className="font-semibold">Disclaimer: Prices are estimates and may vary based on project specifics.</p>
          <p>Note: This calculator provides estimates based on standard industry rates. Actual prices may vary depending on specific project requirements, revisions, and additional services.</p>
        </div>
        
        <div className="border-t border-gray-400 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© {currentYear} Ren3Der. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
