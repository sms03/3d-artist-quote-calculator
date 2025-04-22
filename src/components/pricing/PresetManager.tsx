import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Save, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";

interface PresetManagerProps {
  presets: Record<string, any>;
  onSavePreset: (name: string) => void;
  onLoadPreset: (name: string) => void;
  onDeletePreset: (name: string, event: React.MouseEvent) => void;
  currentConfig?: any;
  basePrice?: number;
  gstAmount?: number;
  totalPrice?: number;
  currency?: string;
}

const PresetManager = ({
  presets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  currentConfig,
  basePrice = 0,
  gstAmount = 0,
  totalPrice = 0,
  currency = "INR"
}: PresetManagerProps) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleSave = () => {
    if (!presetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your preset",
        variant: "destructive"
      });
      return;
    }
    onSavePreset(presetName);
    setPresetName("");
    setSaveDialogOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Draw only a light border
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.7);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'S');

    // Header: Ren3Der centered
    doc.setFont('courier', 'bold');
    doc.setFontSize(20);
    doc.text('Ren3Der', pageWidth / 2, 20, { align: 'center' });

    // Date in dd/mm/yyyy
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()} (dd/mm/yyyy)`;
    doc.setFontSize(11);
    doc.setFont('courier', 'normal');
    doc.text(`Date: ${dateStr}`, pageWidth / 2, 32, { align: 'center' });

    // Section: Service Configuration
    let yPos = 44;
    doc.setFont('courier', 'bold');
    doc.setFontSize(14);
    doc.text('Service Quote', pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;
    doc.setFont('courier', 'normal');
    doc.setFontSize(11);
    if (currentConfig) {
      Object.entries(currentConfig).forEach(([key, value]) => {
        if (key === 'duration' && typeof value === 'number') {
          const mins = Math.floor(value / 60);
          const secs = value % 60;
          let durationStr = '';
          if (mins > 0) durationStr += `${mins} min`;
          if (secs > 0 || mins === 0) durationStr += `${mins > 0 ? ' ' : ''}${secs} sec`;
          doc.text(`duration: ${durationStr}`, pageWidth / 2, yPos, { align: 'center' });
          yPos += 6;
        } else if (key === 'additionalFactors' && Array.isArray(value) && value.length > 0) {
          doc.text('Additional Factors:', pageWidth / 2, yPos, { align: 'center' });
          yPos += 6;
          value.forEach((factor: string) => {
            let label = '';
            switch (factor) {
              case 'characterAnimation': label = 'Character Animation (+30%)'; break;
              case 'fluidSimulation': label = 'Fluid Simulation (+40%)'; break;
              case 'photorealistic': label = 'Photorealistic (+25%)'; break;
              case 'stylized': label = 'Stylized (+15%)'; break;
              case 'rushJob': label = 'Rush Job (+50%)'; break;
              default: label = factor;
            }
            doc.text(`- ${label}`, pageWidth / 2, yPos, { align: 'center' });
            yPos += 5;
          });
        } else if (key !== 'additionalFactors' && key !== 'duration' && value !== undefined) {
          doc.text(`${key}: ${value}`, pageWidth / 2, yPos, { align: 'center' });
          yPos += 6;
        }
      });
    }

    // Section: Pricing Details
    yPos += 6;
    doc.setFont('courier', 'bold');
    doc.setFontSize(14);
    doc.text('Pricing Details', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    doc.setFont('courier', 'normal');
    doc.setFontSize(11);
    doc.text(`Base Price: ${currency} ${basePrice.toLocaleString()}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;
    if (gstAmount > 0) {
      doc.text(`GST (18%): ${currency} ${gstAmount.toLocaleString()}`, pageWidth / 2, yPos, { align: 'center' });
      yPos += 6;
    }

    // Total price: bold and italic
    yPos += 4;
    doc.setFont('courier', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(255, 0, 0);
    doc.text(`Total Amount: ${currency} ${totalPrice.toLocaleString()}`, pageWidth / 2, yPos + 4, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    yPos += 22;

    // Note: bold and italic
    doc.setFont('courier', 'bolditalic');
    doc.setFontSize(11);
    doc.text('NOTE: 50% payment must be paid in advance to start designing.', pageWidth / 2, yPos + 9, { align: 'center' });
    yPos += 24;

    // Footer: Ren3Der centered
    doc.setFontSize(10);
    doc.setFont('courier', 'bold');
    doc.text('Thank You for choosing Ren3Der', pageWidth / 2, pageHeight - 12, { align: 'center' });

    doc.save('Ren3Der.pdf');
    toast({
      title: 'Success',
      description: 'Your quotation has been downloaded successfully.',
    });
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <Button variant="default" onClick={generatePDF}>
        <Download className="mr-2 h-4 w-4" />
        Export Quotation (PDF)
      </Button>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="my-[7px]">
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
            <Input id="presetName" value={presetName} onChange={e => setPresetName(e.target.value)} placeholder="Enter a name for this preset" />
            <Button onClick={handleSave}>Save Preset</Button>
          </div>
        </DialogContent>
      </Dialog>

      {Object.keys(presets).length > 0 && (
        <div className="mt-4">
          <Label>Saved Presets</Label>
          <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
            {Object.keys(presets).map(name => (
              <div key={name} className="flex items-center justify-between bg-gray-100 p-2 rounded-md hover:bg-gray-200 cursor-pointer" onClick={() => onLoadPreset(name)}>
                <span className="font-medium font-geist-mono">{name}</span>
                <Button variant="ghost" size="sm" onClick={e => onDeletePreset(name, e)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PresetManager;
