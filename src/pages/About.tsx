import Layout from "../components/layout/Layout";

const About = () => (
  <Layout>
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-design-soft-red dark:text-fuchsia-300">About Me</h1>
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2 dark:text-fuchsia-300">Shivam M. Salunkhe <span className="text-gray-500">aka SMS</span> ✨</h2>
        <p className="mb-4 text-lg text-gray-700">
          🎬 CG & VFX Artist<br/>
          💻 Software, Prompt, and AI Developer
        </p>
        <p className="text-gray-600 text-base mb-4">
          I am passionate about blending creativity and technology to deliver stunning visual experiences and innovative software solutions. With expertise in computer graphics, visual effects, and AI-driven workflows, I help bring ideas to life for clients and collaborators worldwide.
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <a href="https://github.com/sms03" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
            <span role="img" aria-label="GitHub">🐙</span> GitHub
          </a>
          <a href="https://www.behance.net/SMSXART" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
            <span role="img" aria-label="Behance">🎨</span> Behance
          </a>
          <a href="https://www.linkedin.com/in/sms03" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
            <span role="img" aria-label="LinkedIn">💼</span> LinkedIn
          </a>
          <a href="/ResumeV5.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
            <span role="img" aria-label="Resume">📃</span> Resume
          </a>
        </div>
      </div>
      <div className="text-gray-600 text-sm">
        <p>Feel free to reach out for collaborations, freelance work, or just to connect! 🤝</p>
      </div>
    </div>
  </Layout>
);

export default About;
