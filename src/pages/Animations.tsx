import Layout from "@/components/layout/Layout";
import PricingCalculator from "@/components/pricing/PricingCalculator";

const AnimationsPage = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 text-center font-geist-mono">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">3D Animations Pricing</h1>
        <p className="text-gray-600 mb-8">
          Get accurate pricing for professional 3D animations. Adjust parameters below to see real-time price calculations.
        </p>
        
        <PricingCalculator 
          serviceType="3D Animation"
          showDpiSelector={false}
          showFrameRateSelector={true}
          showDurationSelector={true}
        />
      </div>
      </section>
    </Layout>
  );
};

export default AnimationsPage;
