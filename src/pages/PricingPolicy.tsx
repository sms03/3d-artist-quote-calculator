
import Layout from "@/components/layout/Layout";

const PricingPolicyPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pricing Policy</h1>
        
        <div className="prose prose-lg">
          <p>
            Our pricing is transparent and based on industry standards for 3D design, animation, and VFX services.
            This document outlines our pricing policy and how costs are calculated.
          </p>
          
          <h2>Pricing Factors</h2>
          <p>
            Our pricing is calculated based on the following factors:
          </p>
          
          <ul>
            <li>Service type (3D Still Frame, 3D Animation, 3D CGI, VFX, Video Editing)</li>
            <li>Resolution (720p, 1080p, 2K, 4K, 8K)</li>
            <li>Aspect ratio (16:9, 4:3, 1:1, 9:16, 21:9, Custom)</li>
            <li>Frame rates (for video content)</li>
            <li>DPI settings (for still images)</li>
            <li>Duration (for time-based content)</li>
            <li>Output format</li>
            <li>Project complexity</li>
          </ul>
          
          <h2>GST Taxation</h2>
          <p>
            All prices are subject to 18% GST as per Indian Government regulations.
            International clients may be exempt from GST depending on their country's tax treaties with India.
          </p>
          
          <h2>Payment Terms</h2>
          <p>
            Standard payment terms are:
          </p>
          
          <ul>
            <li>50% deposit before project commencement</li>
            <li>50% upon project completion and before delivery of final files</li>
            <li>For projects exceeding ₹200,000, a different payment schedule may be arranged</li>
          </ul>
          
          <h2>Currency and Exchange Rates</h2>
          <p>
            Our base pricing is in Indian Rupees (INR). For payments in other currencies,
            the exchange rate will be calculated based on the rate at the time of invoice generation.
          </p>
          
          <h2>Pricing Updates</h2>
          <p>
            Pricing may be updated periodically to reflect changes in costs, market conditions,
            or technological advancements. Any quotes provided before a pricing update will be honored
            for 30 days from the date of quotation.
          </p>
          
          <h2>Custom Projects</h2>
          <p>
            For projects with unique requirements not covered by our standard pricing calculator,
            please contact us for a custom quote. We're happy to accommodate special requests
            and complex projects.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPolicyPage;
