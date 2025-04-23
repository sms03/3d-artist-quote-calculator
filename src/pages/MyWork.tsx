import { useState } from "react";
import Layout from "../components/layout/Layout";

// Example gallery images (replace with your own or dynamically load from a source)
const galleryImages = [
  { src: "renders/render1.jpg", alt: "Fiddler" },
  { src: "renders/render2.png", alt: "Dragon Ball" },
  { src: "renders/render3.png", alt: "Red Rose" },
  { src: "renders/render4.jpg", alt: "Tulip" },
  { src: "renders/render5.jpg", alt: "Eelf" },
  { src: "renders/render6.jpg", alt: "Edo" },
  { src: "renders/render7.jpg", alt: "Bitcoin" },
  { src: "renders/render8.png", alt: "Skull" },
  { src: "renders/render9.png", alt: "McLaren" },
  { src: "renders/render10.png", alt: "Mushtang '69" },
  { src: "renders/render11.png", alt: "Ferrari" },
  { src: "renders/render12.png", alt: "Rover" },
  { src: "renders/render13.png", alt: "Blood Dipped" },
  { src: "renders/render14.png", alt: "Away" },
  { src: "renders/render15.png", alt: "Blood Dipped" },
  { src: "renders/render16.png", alt: "Stranded" },
];

const MyWork = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const openModal = (img) => {
    setSelectedImg(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImg(null);
  };

  const getSameStyleImages = (selectedImg) => {
    // Example function to get similar styled images (replace with your own logic)
    return galleryImages.filter((img) => img.alt === selectedImg.alt);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-design-soft-red dark:text-fuchsia-300">My Work</h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
          A gallery of renders and images created for previous clients. Click any image to view it larger!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => openModal(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <span className="text-white text-lg font-semibold drop-shadow-lg">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Modal for full image view */}
        {modalOpen && selectedImg && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={closeModal}>
            <div className="relative max-w-4xl w-full mx-4 mt-32 mb-8" onClick={e => e.stopPropagation()}>
              {/* mt-32 increases the gap between the navbar and modal content */}
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/60 rounded-full px-3 py-1 hover:bg-black/80 transition z-10"
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                {getSameStyleImages(selectedImg).map((img, idx) => (
                  <div key={idx} className="flex flex-col items-center w-full">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-900 mb-2"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                    <div className="text-center text-white text-base">{img.alt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyWork;
