import Layout from "../components/layout/Layout";

const Contact = () => (
  <Layout>
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-design-soft-red dark:text-fuchsia-300">Contact Us</h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-200">
        We'd love to hear from you! Please reach out with any questions, project inquiries, or feedback.
      </p>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2 dark:text-fuchsia-200">Email</h2>
        <a href="mailto:smsxart@gmail.com" className="text-blue-600 dark:text-blue-400 underline">smsxart@gmail.com</a>
        <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-fuchsia-200">Phone</h2>
        <a href="tel:+917709478331" className="text-blue-600 dark:text-blue-400 underline">+91 7709478331</a>
        <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-fuchsia-200">Business Hours</h2>
        <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 10:00 AM – 7:00 PM IST</p>
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">
        <p>Or use the email above to request a callback or schedule a meeting.</p>
      </div>
    </div>
  </Layout>
);

export default Contact;
