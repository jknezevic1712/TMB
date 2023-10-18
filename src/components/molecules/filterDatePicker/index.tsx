import * as React from "react";
import { format } from "date-fns";
// components
import Calendar from "@/components/atoms/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/popover";
import { CalendarIcon } from "lucide-react";

type FilterDatePickerProps = {
  value: any;
  onChange: (data: any) => void;
};
export default function FilterDatePicker({
  value,
  onChange,
}: FilterDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className="flex items-center justify-between gap-2">
          {value ? (
            format(value, "dd/MM/yyyy")
          ) : (
            <span>Pick a starting date</span>
          )}
          <CalendarIcon className="absolute right-2 top-0 mt-2 h-4 w-4 text-zinc-700" />
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-zinc-50"
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => date < new Date("1900-01-01")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
