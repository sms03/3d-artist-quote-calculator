
import { Currency, ServiceType, ResolutionOption, AspectRatioOption, FrameRateOption, DpiOption, OutputFormatOption } from "@/utils/pricingUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ConfigurationPanelProps {
  serviceType: ServiceType;
  resolution: ResolutionOption;
  setResolution: (value: ResolutionOption) => void;
  aspectRatio: AspectRatioOption;
  setAspectRatio: (value: AspectRatioOption) => void;
  frameRate: FrameRateOption;
  setFrameRate: (value: FrameRateOption) => void;
  dpi: DpiOption;
  setDpi: (value: DpiOption) => void;
  duration: number;
  setDuration: (value: number) => void;
  outputFormat: OutputFormatOption;
  setOutputFormat: (value: OutputFormatOption) => void;
  showDpiSelector: boolean;
  showFrameRateSelector: boolean;
  showDurationSelector: boolean;
}

const ConfigurationPanel = ({
  serviceType,
  resolution,
  setResolution,
  aspectRatio,
  setAspectRatio,
  frameRate,
  setFrameRate,
  dpi,
  setDpi,
  duration,
  setDuration,
  outputFormat,
  setOutputFormat,
  showDpiSelector,
  showFrameRateSelector,
  showDurationSelector,
}: ConfigurationPanelProps) => {
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="resolution">Resolution</Label>
        <Select value={resolution} onValueChange={(value) => setResolution(value as ResolutionOption)}>
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

      <div>
        <Label htmlFor="aspectRatio">Aspect Ratio</Label>
        <Select value={aspectRatio} onValueChange={(value) => setAspectRatio(value as AspectRatioOption)}>
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

      {showFrameRateSelector && (
        <div>
          <Label htmlFor="frameRate">Frame Rate</Label>
          <Select value={frameRate} onValueChange={(value) => setFrameRate(value as FrameRateOption)}>
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

      {showDpiSelector && (
        <div>
          <Label htmlFor="dpi">DPI (Resolution)</Label>
          <Select value={dpi} onValueChange={(value) => setDpi(value as DpiOption)}>
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

      {showDurationSelector && (
        <div>
          <div className="flex justify-between">
            <Label htmlFor="duration">Duration</Label>
            <span className="text-sm text-gray-500 font-geist-mono">{formatDuration(duration)}</span>
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
          <div className="flex justify-between text-xs text-gray-500 font-geist-mono">
            <span>5s</span>
            <span>1m</span>
            <span>5m</span>
            <span>10m</span>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="outputFormat">Output Format</Label>
        <Select value={outputFormat} onValueChange={(value) => setOutputFormat(value as OutputFormatOption)}>
          <SelectTrigger id="outputFormat">
            <SelectValue placeholder="Select Output Format" />
          </SelectTrigger>
          <SelectContent>
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
  );
};

export default ConfigurationPanel;
