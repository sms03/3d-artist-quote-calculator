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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary">
            3D Design Pricing Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Transparent pricing for all your 3D design, animation, and visual effects needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 bg-design-soft-purple hover:bg-design-soft-blue">
              <Link to="/3d-still-frame">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 font-geist-mono">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a service to calculate pricing based on your specific requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card overflow-hidden bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <div className="h-12 w-12 rounded-full bg-design-soft-purple/20 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button asChild variant="ghost" className="group">
                  <Link to={service.path}>
                    Price Calculator
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-design-soft-gray/30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 font-geist-mono">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-xl text-gray-600">
            Our pricing calculator offers everything you need for accurate quotes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Technical Parameters</h3>
            <p className="text-gray-600">
              Choose from various resolution presets, aspect ratios, frame rates, and output formats
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Real-time Calculation</h3>
            <p className="text-gray-600">
              See pricing updates instantly as you adjust project specifications
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Currency Converter</h3>
            <p className="text-gray-600">
              View prices in multiple international currencies with automatic conversion
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">GST Calculator</h3>
            <p className="text-gray-600">
              Automatically calculates 18% GST as per Indian Government regulations
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Custom Presets</h3>
            <p className="text-gray-600">
              Save and load your frequently used configurations
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">PDF Export</h3>
            <p className="text-gray-600">
              Generate and download professional quotations in PDF format
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center font-geist-mono">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose a service and get an instant price quote for your project
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/3d-still-frame">Start Calculating</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
