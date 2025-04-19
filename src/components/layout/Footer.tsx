import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-design-soft-gray text-gray-700 py-8 mt-20 font-geist-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">3D Price Craft</h3>
            <p className="text-sm text-gray-300 mb-4">
              Professional 3D design services with transparent pricing.
            </p>
            <p className="text-sm text-yellow-300 font-medium">
              *GST @ 18% will be applicable as per Indian Government regulations
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/3d-still-frame" className="text-sm text-gray-300 hover:text-white transition-colors">
                  3D Still Frame Artwork
                </Link>
              </li>
              <li>
                <Link to="/3d-animations" className="text-sm text-gray-300 hover:text-white transition-colors">
                  3D Animations
                </Link>
              </li>
              <li>
                <Link to="/3d-cgi" className="text-sm text-gray-300 hover:text-white transition-colors">
                  3D CGI
                </Link>
              </li>
              <li>
                <Link to="/vfx-projects" className="text-sm text-gray-300 hover:text-white transition-colors">
                  VFX Projects
                </Link>
              </li>
              <li>
                <Link to="/video-editing" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Video Editing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact & Legal</h3>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-gray-300">
                Email: contact@3dpricecraft.com
              </li>
              <li className="text-sm text-gray-300">
                Phone: +91 9876543210
              </li>
            </ul>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/pricing-policy" className="text-sm text-gray-300 hover:text-white transition-colors">
                Pricing Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} 3D Price Craft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
