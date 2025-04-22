import Layout from "../components/layout/Layout";

const Contact = () => (
  <Layout>
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-design-soft-red">Contact Us</h1>
      <p className="mb-6 text-lg text-gray-700">
        We'd love to hear from you! Please reach out with any questions, project inquiries, or feedback.
      </p>
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Email</h2>
        <a href="mailto:contact@3dpricecraft.com" className="text-blue-600 underline">smsxart@gmail.com</a>
        <h2 className="text-xl font-semibold mt-6 mb-2">Phone</h2>
        <a href="tel:+911234567890" className="text-blue-600 underline">+91 7709478331</a>
        <h2 className="text-xl font-semibold mt-6 mb-2">Business Hours</h2>
        <p>Monday - Friday: 10:00 AM – 7:00 PM IST</p>
      </div>
      <div className="text-gray-600 text-sm">
        <p>Or use the email above to request a callback or schedule a meeting.</p>
      </div>
    </div>
  </Layout>
);

export default Contact;
