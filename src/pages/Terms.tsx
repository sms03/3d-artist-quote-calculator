import Layout from "../components/layout/Layout";

const Terms = () => (
  <Layout>
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: April 20, 2025</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">By accessing or using 3D Price Craft, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use our services.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. Services</h2>
      <p className="mb-4">3D Price Craft provides pricing estimates and professional 3D design, animation, CGI, VFX, and video editing services. All estimates are non-binding and subject to change based on project specifics.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. User Responsibilities</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Provide accurate project details for estimates.</li>
        <li>Respect intellectual property rights and do not submit infringing content.</li>
        <li>Comply with all applicable laws and regulations.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Payment & Invoicing</h2>
      <p className="mb-4">All payments must be made as per the agreed terms. GST @ 18% is applicable as per Indian Government regulations. Final pricing may vary from estimates after project review.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Intellectual Property</h2>
      <p className="mb-4">All original 3D assets, animations, and deliverables remain the property of 3D Price Craft until full payment is received. Upon payment, ownership is transferred as per the agreement.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Limitation of Liability</h2>
      <p className="mb-4">3D Price Craft is not liable for any indirect, incidental, or consequential damages arising from the use of our services or pricing calculator.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">7. Changes to Terms</h2>
      <p className="mb-4">We reserve the right to update these Terms at any time. Continued use of the service constitutes acceptance of the revised terms.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact</h2>
      <p>For questions, contact us at <a href="mailto:contact@3dpricecraft.com" className="text-blue-600 underline">contact@3dpricecraft.com</a>.</p>
    </div>
  </Layout>
);

export default Terms;
