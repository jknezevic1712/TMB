import * as z from "zod";

export const DialogFormSchema = z.object({
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

export const assigneesMockData = [
  "John Doe",
  "Jane Doe",
  "Patrick Jane",
  "Kimball Cho",
];

export const taskPriorities = ["Low", "Medium", "High"];
