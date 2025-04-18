
import { useState, useEffect } from "react";
import { 
  calculatePrice,
  calculateGST,
  calculateTotalWithGST,
  convertCurrency,
  formatCurrency,
  savePreset,
  getPresets,
  loadPreset,
  deletePreset,
  Currency,
  ServiceType,
  ResolutionOption,
  AspectRatioOption,
  FrameRateOption,
  DpiOption,
  OutputFormatOption
} from "@/utils/pricingUtils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Save, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [duration, setDuration] = useState<number>(30); // In seconds
  const [outputFormat, setOutputFormat] = useState<OutputFormatOption>("PNG");
  
  // Currency and pricing state
  const [currency, setCurrency] = useState<Currency>("INR");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  // Preset state
  const [presetName, setPresetName] = useState<string>("");
  const [presets, setPresets] = useState<Record<string, any>>({});
  const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
  
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
    setGstAmount(calculateGST(price));
    setTotalPrice(calculateTotalWithGST(price));
  }, [serviceType, resolution, aspectRatio, duration, frameRate, dpi, outputFormat]);
  
  // Handle preset saving
  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your preset",
        variant: "destructive"
      });
      return;
    }
    
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
    
    savePreset(presetName, presetData);
    setPresets(getPresets());
    setPresetName("");
    setSaveDialogOpen(false);
    
    toast({
      title: "Preset Saved",
      description: `Your preset "${presetName}" has been saved.`
    });
  };
  
  // Handle preset loading
  const handleLoadPreset = (presetName: string) => {
    const preset = loadPreset(presetName);
    
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
  
  // Handle preset deletion
  const handleDeletePreset = (presetName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deletePreset(presetName);
    setPresets(getPresets());
    
    toast({
      title: "Preset Deleted",
      description: `Preset "${presetName}" has been deleted.`
    });
  };
  
  // Generate PDF quote
  const generatePDF = () => {
    // In a real implementation, this would generate a PDF
    toast({
      title: "Generating PDF Quote",
      description: "Your PDF quote is being prepared for download."
    });
    
    // Simulating PDF generation delay
    setTimeout(() => {
      toast({
        title: "PDF Quote Ready",
        description: "Your quote has been generated successfully."
      });
    }, 1500);
  };
  
  // Format duration for display
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  return (
    <Card className="p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{serviceType} Pricing Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Configuration options */}
        <div className="space-y-6">
          {/* Resolution Selection */}
          <div>
            <Label htmlFor="resolution">Resolution</Label>
            <Select 
              value={resolution} 
              onValueChange={(value) => setResolution(value as ResolutionOption)}
            >
              <SelectTrigger id="resolution">
                <SelectValue placeholder="Select Resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="720p">720p (HD)</SelectItem>
                <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                <SelectItem value="2K">2K (1440p)</SelectItem>
                <SelectItem value="4K">4K (Ultra HD)</SelectItem>
                <SelectItem value="8K">8K</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Aspect Ratio Selection */}
          <div>
            <Label htmlFor="aspectRatio">Aspect Ratio</Label>
            <Select 
              value={aspectRatio} 
              onValueChange={(value) => setAspectRatio(value as AspectRatioOption)}
            >
              <SelectTrigger id="aspectRatio">
                <SelectValue placeholder="Select Aspect Ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                <SelectItem value="1:1">1:1 (Square)</SelectItem>
                <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
                <SelectItem value="21:9">21:9 (Ultrawide)</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Frame Rate Selection - Only for video services */}
          {showFrameRateSelector && (
            <div>
              <Label htmlFor="frameRate">Frame Rate</Label>
              <Select 
                value={frameRate} 
                onValueChange={(value) => setFrameRate(value as FrameRateOption)}
              >
                <SelectTrigger id="frameRate">
                  <SelectValue placeholder="Select Frame Rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24fps (Film)">24fps (Film)</SelectItem>
                  <SelectItem value="25fps (PAL)">25fps (PAL)</SelectItem>
                  <SelectItem value="30fps (NTSC)">30fps (NTSC)</SelectItem>
                  <SelectItem value="60fps">60fps (High Frame Rate)</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* DPI Selection - Only for still frames */}
          {showDpiSelector && (
            <div>
              <Label htmlFor="dpi">DPI (Resolution)</Label>
              <Select 
                value={dpi} 
                onValueChange={(value) => setDpi(value as DpiOption)}
              >
                <SelectTrigger id="dpi">
                  <SelectValue placeholder="Select DPI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="72 (Web)">72 DPI (Web)</SelectItem>
                  <SelectItem value="150 (Standard)">150 DPI (Standard)</SelectItem>
                  <SelectItem value="300 (Print)">300 DPI (Print)</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Duration Slider - Only for time-based services */}
          {showDurationSelector && (
            <div>
              <div className="flex justify-between">
                <Label htmlFor="duration">Duration</Label>
                <span className="text-sm text-gray-500">{formatDuration(duration)}</span>
              </div>
              <Slider 
                id="duration"
                min={5}
                max={600}
                step={5}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>5s</span>
                <span>1m</span>
                <span>5m</span>
                <span>10m</span>
              </div>
            </div>
          )}
          
          {/* Output Format Selection */}
          <div>
            <Label htmlFor="outputFormat">Output Format</Label>
            <Select 
              value={outputFormat} 
              onValueChange={(value) => setOutputFormat(value as OutputFormatOption)}
            >
              <SelectTrigger id="outputFormat">
                <SelectValue placeholder="Select Output Format" />
              </SelectTrigger>
              <SelectContent>
                {/* Show relevant formats based on service type */}
                {(serviceType === "3D Still Frame") && (
                  <>
                    <SelectItem value="JPEG">JPEG</SelectItem>
                    <SelectItem value="PNG">PNG</SelectItem>
                    <SelectItem value="TIFF">TIFF</SelectItem>
                    <SelectItem value="PSD">PSD (Photoshop)</SelectItem>
                  </>
                )}
                {(serviceType === "3D Animation" || serviceType === "VFX Project" || serviceType === "Video Editing") && (
                  <>
                    <SelectItem value="MP4 (H.264)">MP4 (H.264)</SelectItem>
                    <SelectItem value="ProRes">ProRes</SelectItem>
                    <SelectItem value="DPX">DPX</SelectItem>
                    <SelectItem value="EXR">EXR</SelectItem>
                  </>
                )}
                {(serviceType === "3D CGI") && (
                  <>
                    <SelectItem value="FBX">FBX</SelectItem>
                    <SelectItem value="OBJ">OBJ</SelectItem>
                    <SelectItem value="BLEND">BLEND</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Right column - Pricing and actions */}
        <div className="space-y-6">
          {/* Currency Selection */}
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={currency} 
              onValueChange={(value) => setCurrency(value as Currency)}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="GBP">British Pound (£)</SelectItem>
                <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                <SelectItem value="SGD">Singapore Dollar (S$)</SelectItem>
                <SelectItem value="AED">UAE Dirham (د.إ)</SelectItem>
                <SelectItem value="CNY">Chinese Yuan (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Price Breakdown</h3>
            
            <div className="flex justify-between mb-2">
              <span>Base Price:</span>
              <span className="font-medium">{formatCurrency(convertCurrency(basePrice, "INR", currency), currency)}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span>GST (18%):</span>
              <span className="font-medium">{formatCurrency(convertCurrency(gstAmount, "INR", currency), currency)}</span>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{formatCurrency(convertCurrency(totalPrice, "INR", currency), currency)}</span>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">
              *GST @ 18% will be applicable as per Indian Government regulations
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="default" onClick={generatePDF}>
              <Download className="mr-2 h-4 w-4" />
              Export Quotation (PDF)
            </Button>
            
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save as Preset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Current Configuration</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <Label htmlFor="presetName">Preset Name</Label>
                  <Input
                    id="presetName"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="Enter a name for this preset"
                  />
                  <Button onClick={handleSavePreset}>Save Preset</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Saved Presets */}
            {Object.keys(presets).length > 0 && (
              <div className="mt-4">
                <Label>Saved Presets</Label>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {Object.keys(presets).map((name) => (
                    <div
                      key={name}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleLoadPreset(name)}
                    >
                      <span className="font-medium">{name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDeletePreset(name, e)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PricingCalculator;
