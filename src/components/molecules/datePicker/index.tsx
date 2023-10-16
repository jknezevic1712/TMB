import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import Calendar from "@/components/atoms/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/popover";

export default function DatePicker({ field }: { field: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start bg-zinc-50 text-left font-normal",
            !field.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? (
            format(field.value, "dd/MM/yyyy")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-zinc-50"
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
