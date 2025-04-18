
import Layout from "@/components/layout/Layout";
import PricingCalculator from "@/components/pricing/PricingCalculator";

const CGIPage = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">3D CGI Pricing</h1>
        <p className="text-gray-600 mb-8">
          Get accurate pricing for 3D CGI projects. Adjust parameters below to see real-time price calculations.
        </p>
        
        <PricingCalculator 
          serviceType="3D CGI"
          showDpiSelector={true}
          showFrameRateSelector={false}
          showDurationSelector={false}
        />
      </div>
    </Layout>
  );
};

export default CGIPage;
