import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  rows: string;
};

export default function TextAreaInput({
  name,
  labelText,
  defaultValue,
  rows,
}: TextAreaInputProps) {
  const rowNumber: number = Number(rows);
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={rowNumber}
        required
        className="leading-loose"
      />
    </div>
  );
}
