import Layout from "../components/layout/Layout";

const PricingPolicy = () => (
  <Layout>
    <div className="max-w-3xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6 dark:text-fuchsia-300">Pricing Policy</h1>
      <p className="mb-4">Last updated: April 20, 2025</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Estimates & Quotes</h2>
      <p className="mb-4">All prices provided by the calculator are estimates based on standard industry rates. Actual prices may vary depending on project requirements, complexity, revisions, and additional services.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. GST & Taxes</h2>
      <p className="mb-4">All prices are exclusive of GST. GST @ 18% will be added to the final invoice as per Indian Government regulations.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Payment Terms</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>50% advance payment is required to start the project.</li>
        <li>Remaining 50% is due upon project completion and before final delivery.</li>
        <li>Payments can be made via bank transfer, UPI, or other agreed methods.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Revisions & Additional Work</h2>
      <p className="mb-4">The estimate includes a limited number of revisions as specified in the project scope. Additional revisions or services may incur extra charges, which will be communicated in advance.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Refund Policy</h2>
      <p className="mb-4">Advance payments are non-refundable once work has commenced. Refunds, if any, are at the sole discretion of 3D Price Craft based on project status and circumstances.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact</h2>
      <p>For pricing questions, contact us at <a href="mailto:smsxart@gmail.com" className="text-blue-600 underline">smsxart@gmail.com</a>.</p>
    </div>
  </Layout>
);

export default PricingPolicy;
