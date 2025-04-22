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
    
    // Add company logo/header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("3D Price Craft", pageWidth/2, 20, { align: "center" });
    
    // Add quote details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Quotation", pageWidth/2, 35, { align: "center" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Add configuration details
    doc.setFont("helvetica", "bold");
    doc.text("Service Configuration:", 20, 60);
    doc.setFont("helvetica", "normal");
    
    let yPos = 70;
    if (currentConfig) {
      Object.entries(currentConfig).forEach(([key, value]) => {
        if (key === "additionalFactors" && Array.isArray(value) && value.length > 0) {
          doc.text("Additional Factors:", 30, yPos);
          yPos += 8;
          value.forEach((factor: string) => {
            let label = "";
            switch (factor) {
              case "characterAnimation": label = "Character Animation (+30%)"; break;
              case "fluidSimulation": label = "Fluid Simulation (+40%)"; break;
              case "photorealistic": label = "Photorealistic (+25%)"; break;
              case "stylized": label = "Stylized (+15%)"; break;
              case "rushJob": label = "Rush Job (+50%)"; break;
              default: label = factor;
            }
            doc.text(`- ${label}`, 36, yPos);
            yPos += 7;
          });
        } else if (key !== "additionalFactors") {
          doc.text(`${key}: ${value}`, 30, yPos);
          yPos += 8;
        }
      });
    }
    
    // Add pricing details
    doc.setFont("helvetica", "bold");
    doc.text("Pricing Details:", 20, yPos + 10);
    doc.setFont("helvetica", "normal");
    doc.text(`Base Price: ${currency} ${basePrice.toLocaleString()}`, 30, yPos + 20);
    if (gstAmount > 0) {
      doc.text(`GST (18%): ${currency} ${gstAmount.toLocaleString()}`, 30, yPos + 28);
    }
    doc.setFont("helvetica", "bold");
    doc.text(`Total Price: ${currency} ${totalPrice.toLocaleString()}`, 30, yPos + 36);
    
    // Add footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for choosing 3D Price Craft", pageWidth/2, doc.internal.pageSize.getHeight() - 20, { align: "center" });
    
    // Save the PDF
    doc.save("3D-Price-Craft-Quotation.pdf");
    
    toast({
      title: "Success",
      description: "Your quotation has been downloaded successfully.",
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
