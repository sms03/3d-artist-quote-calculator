import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Save, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
interface PresetManagerProps {
  presets: Record<string, any>;
  onSavePreset: (name: string) => void;
  onLoadPreset: (name: string) => void;
  onDeletePreset: (name: string, event: React.MouseEvent) => void;
  onGeneratePDF: () => void;
}
const PresetManager = ({
  presets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  onGeneratePDF
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
  return <div className="flex flex-col gap-3 mt-4">
      <Button variant="default" onClick={onGeneratePDF}>
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

      {Object.keys(presets).length > 0 && <div className="mt-4">
          <Label>Saved Presets</Label>
          <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
            {Object.keys(presets).map(name => <div key={name} className="flex items-center justify-between bg-gray-100 p-2 rounded-md hover:bg-gray-200 cursor-pointer" onClick={() => onLoadPreset(name)}>
                <span className="font-medium font-geist-mono">{name}</span>
                <Button variant="ghost" size="sm" onClick={e => onDeletePreset(name, e)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>)}
          </div>
        </div>}
    </div>;
};
export default PresetManager;