import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Image as ImageIcon, 
  Video, 
  Box, 
  Wand2, 
  Film 
} from "lucide-react";

const Index = () => {
  // Service cards data for homepage
  const services = [
    {
      title: "3D Still Frame Artwork",
      description: "High-quality still 3D renders for products, architecture, and more",
      icon: ImageIcon,
      path: "/3d-still-frame"
    },
    {
      title: "3D Animations",
      description: "Captivating animated 3D content for various applications",
      icon: Video,
      path: "/3d-animations"
    },
    {
      title: "3D CGI",
      description: "Computer-generated imagery for complex 3D projects",
      icon: Box,
      path: "/3d-cgi"
    },
    {
      title: "VFX Projects",
      description: "Visual effects services for films, commercials, and digital content",
      icon: Wand2,
      path: "/vfx-projects"
    },
    {
      title: "Video Editing",
      description: "Professional video editing and post-production services",
      icon: Film,
      path: "/video-editing"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center font-geist-mono">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent dark:text-white dark:bg-none dark:from-fuchsia-400 dark:to-pink-700 dark:bg-gradient-to-r" style={{ backgroundImage: "linear-gradient(90deg,rgb(188, 47, 106) 0%,rgb(65, 7, 17) 100%)" }}>
            3D Design Pricing Calculator
            </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Transparent pricing for all your 3D design, animation, and visual effects needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 bg-design-soft-purple hover:bg-design-soft-blue dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              <Link to="/3d-still-frame">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400">
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 font-geist-mono">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select a service to calculate pricing based on your specific requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-gray-900 dark:border-gray-800 dark:shadow-lg">
              <div className="p-6">
                <div className="h-12 w-12 rounded-full bg-design-soft-purple/20 flex items-center justify-center mb-4 dark:bg-gray-800">
                  <service.icon className="h-6 w-6 text-black dark:text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <Button asChild variant="ghost" className="group dark:text-fuchsia-300 dark:hover:bg-gray-800">
                  <Link to={service.path}>
                    Price Calculator
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 dark:text-fuchsia-400" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-design-soft-gray/30 dark:bg-gray-900/80 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 font-geist-mono">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our pricing calculator offers everything you need for accurate quotes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Technical Parameters</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from various resolution presets, aspect ratios, frame rates, and output formats
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Real-time Calculation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              See pricing updates instantly as you adjust project specifications
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Currency Converter</h3>
            <p className="text-gray-600 dark:text-gray-300">
              View prices in multiple international currencies with automatic conversion
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">GST Calculator</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automatically calculates 18% GST as per Indian Government regulations
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Custom Presets</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Save and load your frequently used configurations
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">PDF Export</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate and download professional quotations in PDF format
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center font-geist-mono">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose a service and get an instant price quote for your project
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="dark:bg-fuchsia-700 dark:text-white dark:hover:bg-fuchsia-800">
              <Link to="/3d-still-frame">Start Calculating</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
