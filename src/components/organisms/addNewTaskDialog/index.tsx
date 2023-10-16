import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// hooks
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
import { toast } from "@/lib/hooks/useToast";
// components
import {
  DialogWrapper,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  closeDialog,
} from "@/components/molecules/dialog";
import { Button } from "@/components/atoms/Button";
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

const FormSchema = z.object({
  assignee: z.string({
    required_error: "Please select an assignee.",
  }),
  description: z
    .string({
      required_error: "Please fill out description.",
    })
    .min(1, "Description can't be empty."),
  dueDate: z.date({
    required_error: "Please select due date.",
  }),
  priority: z.string({
    required_error: "Please select priority.",
  }),
});

const defaultValues = {
  assignee: undefined,
  description: "",
  dueDate: undefined,
  priority: "Low",
};
const assigneesSelectValues = [
  "John Doe",
  "Jane Doe",
  "Patrick Jane",
  "Kimball Cho",
];
const prioritySelectValues = ["Low", "Medium", "High"];

type AddNewTaskDialogProps = {
  name: string;
  title: string;
  description: string;
};
export default function AddNewTaskDialog(props: AddNewTaskDialogProps) {
  const { name, title, description } = props;
  const { addNewTask } = useFirebaseActions();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { assignee, description, dueDate, priority } = data;

    addNewTask({
      assignee,
      description,
      dueDate: dueDate.getTime().toString(),
      priority,
    }).catch((e) =>
      toast({
        title: "Error adding new task",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{e}</code>
          </pre>
        ),
      }),
    );
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      closeDialog();
      form.reset();
    }
  }, [form.formState.isSubmitSuccessful, form.reset]);

  return (
    <DialogWrapper>
      <DialogTrigger asChild>
        <Button variant="default">{name}</Button>
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
                      {assigneesSelectValues.map((val, idx) => (
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
                  <FormLabel>Date of birth</FormLabel>
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
                      {prioritySelectValues.map((val, idx) => (
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
          </form>
        </Form>

        <DialogFooter>
          <Button form="dialogForm" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogWrapper>
  );
}
