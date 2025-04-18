
import { useState, useEffect } from "react";
import { 
  calculatePrice,
  calculateGST,
  calculateTotalWithGST,
  getPresets,
  savePreset as savePresetUtil,
  loadPreset as loadPresetUtil,
  deletePreset as deletePresetUtil,
  Currency,
  ServiceType,
  ResolutionOption,
  AspectRatioOption,
  FrameRateOption,
  DpiOption,
  OutputFormatOption
} from "@/utils/pricingUtils";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import ConfigurationPanel from "./ConfigurationPanel";
import PriceBreakdown from "./PriceBreakdown";
import PresetManager from "./PresetManager";

interface PricingCalculatorProps {
  serviceType: ServiceType;
  showDpiSelector?: boolean;
  showFrameRateSelector?: boolean;
  showDurationSelector?: boolean;
}

const PricingCalculator = ({ 
  serviceType,
  showDpiSelector = false,
  showFrameRateSelector = false,
  showDurationSelector = false
}: PricingCalculatorProps) => {
  // Configuration state
  const [resolution, setResolution] = useState<ResolutionOption>("1080p");
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>("16:9");
  const [frameRate, setFrameRate] = useState<FrameRateOption>("25fps (PAL)");
  const [dpi, setDpi] = useState<DpiOption>("150 (Standard)");
  const [duration, setDuration] = useState<number>(30);
  const [outputFormat, setOutputFormat] = useState<OutputFormatOption>("PNG");
  
  // Currency and pricing state
  const [currency, setCurrency] = useState<Currency>("INR");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  // Preset state
  const [presets, setPresets] = useState<Record<string, any>>({});
  
  // Set default output format based on service type
  useEffect(() => {
    switch (serviceType) {
      case "3D Still Frame":
        setOutputFormat("PNG");
        break;
      case "3D Animation":
      case "VFX Project":
      case "Video Editing":
        setOutputFormat("MP4 (H.264)");
        break;
      case "3D CGI":
        setOutputFormat("FBX");
        break;
    }
  }, [serviceType]);
  
  // Load presets from localStorage on component mount
  useEffect(() => {
    setPresets(getPresets());
  }, []);
  
  // Calculate price whenever configuration changes
  useEffect(() => {
    const price = calculatePrice(
      serviceType,
      resolution,
      aspectRatio,
      duration,
      frameRate,
      dpi,
      outputFormat
    );
    
    setBasePrice(price);
    setGstAmount(calculateGST(price, currency));
    setTotalPrice(calculateTotalWithGST(price, currency));
  }, [serviceType, resolution, aspectRatio, duration, frameRate, dpi, outputFormat, currency]);

  // Preset management functions
  const handleSavePreset = (presetName: string) => {
    const presetData = {
      serviceType,
      resolution,
      aspectRatio,
      frameRate,
      dpi,
      duration,
      outputFormat,
      currency
    };
    
    savePresetUtil(presetName, presetData);
    setPresets(getPresets());
    
    toast({
      title: "Preset Saved",
      description: `Your preset "${presetName}" has been saved.`
    });
  };
  
  const handleLoadPreset = (presetName: string) => {
    const preset = loadPresetUtil(presetName);
    
    if (preset) {
      setResolution(preset.resolution);
      setAspectRatio(preset.aspectRatio);
      setFrameRate(preset.frameRate);
      setDpi(preset.dpi);
      setDuration(preset.duration);
      setOutputFormat(preset.outputFormat);
      setCurrency(preset.currency);
      
      toast({
        title: "Preset Loaded",
        description: `Preset "${presetName}" has been loaded.`
      });
    }
  };
  
  const handleDeletePreset = (presetName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deletePresetUtil(presetName);
    setPresets(getPresets());
    
    toast({
      title: "Preset Deleted",
      description: `Preset "${presetName}" has been deleted.`
    });
  };
  
  const generatePDF = () => {
    toast({
      title: "Generating PDF Quote",
      description: "Your PDF quote is being prepared for download."
    });
    
    setTimeout(() => {
      toast({
        title: "PDF Quote Ready",
        description: "Your quote has been generated successfully."
      });
    }, 1500);
  };

  return (
    <Card className="p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 font-geist-mono text-black">{serviceType} Pricing Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConfigurationPanel
          serviceType={serviceType}
          resolution={resolution}
          setResolution={setResolution}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          frameRate={frameRate}
          setFrameRate={setFrameRate}
          dpi={dpi}
          setDpi={setDpi}
          duration={duration}
          setDuration={setDuration}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          showDpiSelector={showDpiSelector}
          showFrameRateSelector={showFrameRateSelector}
          showDurationSelector={showDurationSelector}
        />
        
        <div>
          <PriceBreakdown
            currency={currency}
            setCurrency={setCurrency}
            basePrice={basePrice}
            gstAmount={gstAmount}
            totalPrice={totalPrice}
          />
          
          <PresetManager
            presets={presets}
            onSavePreset={handleSavePreset}
            onLoadPreset={handleLoadPreset}
            onDeletePreset={handleDeletePreset}
            onGeneratePDF={generatePDF}
          />
        </div>
      </div>
    </Card>
  );
};

export default PricingCalculator;
