import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
// hooks
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
// utils
import { taskPriorities } from "@/lib/assets";
import { DialogFormSchema, assigneesMockData } from "@/lib/assets";
// components
import {
  DialogRoot,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  closeDialog,
} from "@/components/molecules/dialog";
import { Button } from "@/components/atoms/button";
import Textarea from "@/components/atoms/textarea";
import DatePicker from "@/components/molecules/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/molecules/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/molecules/form";

const defaultValues = {
  assignee: undefined,
  description: "",
  dueDate: undefined,
  priority: "0",
};

type AddNewTaskDialogProps = {
  name: string;
  title: string;
  description: string;
};
export default function AddNewTaskDialog(props: AddNewTaskDialogProps) {
  const { name, title, description } = props;
  const { addNewTask } = useFirebaseActions();
  const form = useForm<z.infer<typeof DialogFormSchema>>({
    resolver: zodResolver(DialogFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: z.infer<typeof DialogFormSchema>) {
    const { assignee, description, dueDate, priority } = formData;

    await addNewTask({
      assignee,
      description,
      dueDate: dueDate.getTime().toString(),
      priority: +priority,
    });
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      closeDialog();
      form.reset();
    }
  }, [form.formState.isSubmitSuccessful, form.reset]);

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button className="w-full md:w-fit" variant="default">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="dialogForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assigneesMockData.map((val, idx) => (
                        <SelectItem key={idx} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your task description here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <DatePicker field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select task priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {taskPriorities.map((val, idx) => (
                        <SelectItem key={idx} value={idx.toString()}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button form="dialogForm" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
