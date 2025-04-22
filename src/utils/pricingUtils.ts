// Exchange rates for currency conversion (last updated placeholder - would use API in production)
export const exchangeRates = {
  INR: 1, // Base currency
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  JPY: 1.78,
  AED: 0.044,
  CNY: 0.086
};

export type Currency = keyof typeof exchangeRates;

// Resolution pricing factors (multiplier relative to 1080p)
export const resolutionFactors = {
  "720p": 0.7,
  "1080p": 1,
  "2K": 1.5,
  "4K": 2.5,
  "8K": 5
};

export type ResolutionOption = keyof typeof resolutionFactors;

// Aspect ratio factors (minimal impact on price)
export const aspectRatioFactors = {
  "16:9": 1,
  "4:3": 0.95,
  "1:1": 0.9,
  "9:16": 0.95,
  "21:9": 1.1,
  "Custom": 1.2
};

export type AspectRatioOption = keyof typeof aspectRatioFactors;

// Frame rate factors
export const frameRateFactors = {
  "24fps (Film)": 0.95,
  "25fps (PAL)": 1,
  "30fps (NTSC)": 1.1,
  "60fps": 1.5,
  "120fps": 2.2, // High Frame Rate, Slow Motion
  "240fps": 3.5, // Ultra High Frame Rate, Slow Motion
  "Custom": 1.7
};

export type FrameRateOption = keyof typeof frameRateFactors;

// DPI factors for still images
export const dpiFactors = {
  "72 (Web)": 0.8,
  "150 (Standard)": 1,
  "300 (Print)": 1.4,
  "Custom": 1.6
};

export type DpiOption = keyof typeof dpiFactors;

// Output format factors
export const outputFormatFactors = {
  // Still frames
  "JPEG": 0.8,
  "PNG": 1,
  "TIFF": 1.2,
  "PSD": 1.3,
  
  // Video formats
  "MP4 (H.264)": 1,
  "ProRes": 1.3,
  "DPX": 1.5,
  "EXR": 1.6,
  
  // 3D formats
  "FBX": 1.2,
  "OBJ": 1,
  "BLEND": 1.1,
  "USD": 1.4
};

export type OutputFormatOption = keyof typeof outputFormatFactors;

// Base prices for different services (in INR)
export const basePrices = {
  "3D Still Frame": 10000,
  "3D Animation": 18000,
  "3D CGI": 15000,
  "VFX Project": 20000,
  "Video Editing": 8000
};

export type ServiceType = keyof typeof basePrices;

// GST rate in India (as a decimal)
export const GST_RATE = 0.18;

// Duration factors (time in seconds)
export const calculateDurationFactor = (duration: number): number => {
  if (duration <= 15) return 1;
  if (duration <= 30) return 1.5;
  if (duration <= 60) return 2.5;
  if (duration <= 120) return 4;
  if (duration <= 300) return 8;
  return 10 + (duration - 300) / 60; // Additional per minute after 5 minutes
};

// Calculate the price based on all factors
export const calculatePrice = (
  serviceType: ServiceType,
  resolution: ResolutionOption,
  aspectRatio: AspectRatioOption,
  duration: number = 0, // For videos/animations only
  frameRate: FrameRateOption = "25fps (PAL)", // For videos/animations only
  dpi: DpiOption = "150 (Standard)", // For still frames only
  outputFormat: OutputFormatOption,
  textureQuality?: string // For 3D CGI only
): number => {
  // Get base price for the service
  const basePrice = basePrices[serviceType];
  
  // Apply resolution factor
  const resolutionMultiplier = resolutionFactors[resolution];
  
  // Apply aspect ratio factor
  const aspectRatioMultiplier = aspectRatioFactors[aspectRatio];
  
  // Apply output format factor
  const formatMultiplier = outputFormatFactors[outputFormat];
  
  // Initialize price calculation
  let price = basePrice * resolutionMultiplier * aspectRatioMultiplier * formatMultiplier;
  
  // Apply duration factor for time-based services
  if (serviceType === "3D Animation" || serviceType === "VFX Project" || serviceType === "Video Editing") {
    const durationFactor = calculateDurationFactor(duration);
    price *= durationFactor;
    
    // Apply frame rate factor for video services
    const frameRateFactor = frameRateFactors[frameRate];
    price *= frameRateFactor;
  }
  
  // Apply DPI factor for still frames
  if (serviceType === "3D Still Frame") {
    const dpiFactor = dpiFactors[dpi];
    price *= dpiFactor;
  }

  // Apply texture quality factor for 3D CGI
  if (serviceType === "3D CGI" && textureQuality) {
    const textureMultipliers: Record<string, number> = {
      "2K": 1,
      "4K": 1.3,
      "8K": 1.6,
      "16K": 2,
    };
    price *= textureMultipliers[textureQuality] || 1;
  }
  
  // Round to nearest hundred
  return Math.round(price / 100) * 100;
};

// Calculate GST amount - only for Indian currency
export const calculateGST = (price: number, currency: Currency): number => {
  return currency === "INR" ? price * GST_RATE : 0;
};

// Calculate total price with GST (if applicable)
export const calculateTotalWithGST = (price: number, currency: Currency): number => {
  return price + calculateGST(price, currency);
};

// Convert price to another currency
export const convertCurrency = (price: number, fromCurrency: Currency, toCurrency: Currency): number => {
  // Convert to base currency first (INR in this case)
  const priceInBaseCurrency = price / exchangeRates[fromCurrency];
  
  // Convert from base currency to target currency
  return priceInBaseCurrency * exchangeRates[toCurrency];
};

// Format currency with proper symbol and thousands separators
export const formatCurrency = (amount: number, currency: Currency): string => {
  const currencySymbols: Record<Currency, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AED: "د.إ",
    CNY: "¥"
  };
  
  // Format number with appropriate decimal places
  // JPY typically doesn't use decimals
  const formattedAmount = currency === "JPY" 
    ? Math.round(amount).toLocaleString()
    : amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
  return `${currencySymbols[currency]}${formattedAmount}`;
};

// Save pricing preset to local storage
export const savePreset = (name: string, config: Record<string, any>): void => {
  // Get existing presets
  const existingPresets = localStorage.getItem('pricingPresets');
  const presets = existingPresets ? JSON.parse(existingPresets) : {};
  
  // Add/update the preset
  presets[name] = {
    ...config,
    savedAt: new Date().toISOString()
  };
  
  // Save back to local storage
  localStorage.setItem('pricingPresets', JSON.stringify(presets));
};

// Get all saved presets
export const getPresets = (): Record<string, any> => {
  const presets = localStorage.getItem('pricingPresets');
  return presets ? JSON.parse(presets) : {};
};

// Load a specific preset
export const loadPreset = (name: string): Record<string, any> | null => {
  const presets = getPresets();
  return presets[name] || null;
};

// Delete a preset
export const deletePreset = (name: string): void => {
  const presets = getPresets();
  
  if (presets[name]) {
    delete presets[name];
    localStorage.setItem('pricingPresets', JSON.stringify(presets));
  }
};
