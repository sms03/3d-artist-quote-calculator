import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StillFramePage from "./pages/StillFrame";
import AnimationsPage from "./pages/Animations";
import CGIPage from "./pages/CGI";
import VFXPage from "./pages/VFX";
import VideoEditingPage from "./pages/VideoEditing";
import TermsPage from "./pages/Terms";
import PricingPolicyPage from "./pages/PricingPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/3d-still-frame" element={<StillFramePage />} />
          <Route path="/3d-animations" element={<AnimationsPage />} />
          <Route path="/3d-cgi" element={<CGIPage />} />
          <Route path="/vfx-projects" element={<VFXPage />} />
          <Route path="/video-editing" element={<VideoEditingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/pricing-policy" element={<PricingPolicyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
