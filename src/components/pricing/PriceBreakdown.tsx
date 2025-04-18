
import { Currency } from "@/utils/pricingUtils";
import { formatCurrency, convertCurrency } from "@/utils/pricingUtils";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface PriceBreakdownProps {
  currency: Currency;
  setCurrency: (value: Currency) => void;
  basePrice: number;
  gstAmount: number;
  totalPrice: number;
}

const PriceBreakdown = ({
  currency,
  setCurrency,
  basePrice,
  gstAmount,
  totalPrice,
}: PriceBreakdownProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
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

      <div className="bg-soft-gray p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 font-geist-mono text-black">Price Breakdown</h3>

        <div className="flex justify-between mb-2 font-geist-mono">
          <span>Base Price:</span>
          <span className="font-medium">{formatCurrency(convertCurrency(basePrice, "INR", currency), currency)}</span>
        </div>

        {currency === "INR" && (
          <div className="flex justify-between mb-2 font-geist-mono">
            <span>GST (18%):</span>
            <span className="font-medium">{formatCurrency(gstAmount, currency)}</span>
          </div>
        )}

        <Separator className="my-3" />

        <div className="flex justify-between text-lg font-bold font-geist-mono">
          <span>Total:</span>
          <span>{formatCurrency(convertCurrency(totalPrice, "INR", currency), currency)}</span>
        </div>

        {currency === "INR" && (
          <p className="text-xs text-gray-500 mt-3 font-geist-mono">
            *GST @ 18% will be applicable as per Indian Government regulations
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceBreakdown;
