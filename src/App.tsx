import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import StillFramePage from "./pages/StillFrame";
import AnimationsPage from "./pages/Animations";
import CGIPage from "./pages/CGI";
import VFXPage from "./pages/VFX";
import VideoEditingPage from "./pages/VideoEditing";
import TermsPage from "./pages/Terms";
import PricingPolicyPage from "./pages/PricingPolicy";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PixelTransition = ({ children, trigger }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.animate(
        [
          { filter: "contrast(0.5) blur(8px) saturate(0.2)" },
          { filter: "none" },
        ],
        {
          duration: 500,
          easing: "cubic-bezier(0.4,0,0.2,1)",
        }
      );
    }
  }, [trigger]);
  return (
    <div ref={ref} style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
};

const App = () => {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <PixelTransition trigger={location.pathname}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -40 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ minHeight: "100vh" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/3d-still-frame" element={<StillFramePage />} />
              <Route path="/3d-animations" element={<AnimationsPage />} />
              <Route path="/3d-cgi" element={<CGIPage />} />
              <Route path="/vfx-projects" element={<VFXPage />} />
              <Route path="/video-editing" element={<VideoEditingPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/pricing-policy" element={<PricingPolicyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </PixelTransition>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
