import { Label } from "../ui/label";
// import { Select } from '../ui/select';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectInputProps = {
  name: string;
  // type: string;
  label?: string;
  defaultValue?: string;
  item1: string;
  item2: string;
  item3?: string;
  item4?: string;
  item5?: string;
  item6?: string;
};

function SelectInput({
  label,
  name,
  // type,
  defaultValue,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
}: SelectInputProps) {
 // console.log(`defaultValue: ${defaultValue}`);

  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Select
        // id={name}

        // name={name}
        // type={type}
        // defaultValue={defaultValue}
        // placeholder={placeholder}
        
      />
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectGroup>
            <SelectLabel>{label}</SelectLabel> */}
            <SelectItem value={item1}>{item1}</SelectItem>
            <SelectItem value={item2}>{item2}</SelectItem>
            {item3 && <SelectItem value={item3}>{item3}</SelectItem>}
            {item4 && <SelectItem value={item4}>{item4}</SelectItem>}
            {item5 && <SelectItem value={item5}>{item5}</SelectItem>}
            {item6 && <SelectItem value={item6}>{item6}</SelectItem>}
          {/* </SelectGroup> */}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectInput;
