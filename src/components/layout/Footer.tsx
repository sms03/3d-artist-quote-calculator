import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-design-soft-gray text-gray-800 py-8 mt-20 font-geist-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">3D Price Craft</h3>
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
              <li>
                <Link to="/StillFrame" className="text-sm text-gray-700 hover:text-black dark:hover:text-white transition-colors">
                  3D Still Frame Artwork
                </Link>
              </li>
              <li>
                <Link to="/Animations" className="text-sm text-gray-700 hover:text-black dark:hover:text-white transition-colors">
                  3D Animations
                </Link>
              </li>
              <li>
                <Link to="/CGI" className="text-sm text-gray-700 hover:text-black dark:hover:text-white transition-colors">
                  3D CGI
                </Link>
              </li>
              <li>
                <Link to="/VFX" className="text-sm text-gray-700 hover:text-black dark:hover:text-white transition-colors">
                  VFX Projects
                </Link>
              </li>
              <li>
                <Link to="/VideoEditing" className="text-sm text-gray-700 hover:text-black dark:hover:text-white transition-colors">
                  Video Editing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact & Legal</h3>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-gray-700">
                Email: contact@3dpricecraft.com
              </li>
              <li className="text-sm text-gray-700">
                Phone: +91 1234567890
              </li>
            </ul>
            <div className="flex space-x-4">
              <Link to="/Terms" className="text-sm text-gray-700 hover:text-black dark:hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/PricingPolicy" className="text-sm text-gray-700 hover:text-black dark:hover:text-white transition-colors">
                Pricing Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 text-center text-sm text-gray-700 space-y-2">
          <p className="font-semibold">Disclaimer: Prices are estimates and may vary based on project specifics.          </p>
          <p>Note: This calculator provides estimates based on standard industry rates. Actual prices may vary depending on specific project requirements, revisions, and additional services.          </p>
        </div>
        
        <div className="border-t border-gray-400 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© {currentYear} 3D Price Craft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
